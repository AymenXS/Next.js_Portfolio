'use client';

import { useEffect, useState } from 'react';
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from 'react-icon-cloud';

export const cloudProps = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: 'default',
    tooltip: 'native',
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: '#0000',
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

export const renderCustomIcon = (icon) => {
  const bgHex = '#f3f2ef';
  const fallbackHex = '#6e6e73';
  const minContrastRatio = 1.2;
  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault(),
    },
  });
};

export default function IconCloud({ iconSlugs }) {
  const [renderedIcons, setRenderedIcons] = useState(null);

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then((data) => {
      if (data && data.simpleIcons) {
        const icons = Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon));
        setRenderedIcons(icons);
      }
    });
  }, [iconSlugs]);

  return <Cloud {...cloudProps}>{renderedIcons}</Cloud>;
}
