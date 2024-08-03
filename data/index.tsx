import { IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from '@tabler/icons-react';

const Skeleton = () => (
  <img
    src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt=""
    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
  />
);

export const navItems = [
  { name: 'About', link: '#about' },
  { name: 'Projects', link: '#projects' },
  { name: 'Testimonials', link: '#testimonials' },
  { name: 'Contact', link: '#contact' },
];

export const gridItems = [
  {
    id: 1,
    title: 'Services',
    description:
      'Web Development | Responsive Design | User Experience (UX) | Cross-Browser Compatibility | Performance Optimization | Front-End Frameworks | Integration with Back End | Testing and Debugging',
    className: 'col-span-2 row-span-2',
    img: '/b1.svg',
    imgClassName: 'w-full h-full',
    titleClassName: 'justify-end',
    spareImg: '',
  },
  {
    id: 2,
    title: '3+ years of experience',
    description: 'Extensive experience in web development and related technologies.',
    className: 'col-span-1 row-span-1',
    img: '',
    imgClassName: '',
    titleClassName: 'justify-start',
    spareImg: '',
  },
  {
    id: 3,
    title: `I'm very flexible with time zone communications`,
    description: 'Available for collaboration across different time zones.',
    className: 'col-span-1 row-span-1',
    img: '',
    imgClassName: '',
    titleClassName: 'justify-center',
    spareImg: '',
  },
  {
    id: 4,
    title: 'Specializations',
    description: 'E-commerce | SaaS | Web Applications',
    className: 'col-span-1 row-span-1',
    img: '/grid.svg',
    imgClassName: '',
    titleClassName: 'justify-start',
    spareImg: '/b4.svg',
  },
  {
    id: 5,
    title: 'The Inside Scoop',
    description: 'Currently building a JS Animation library.',
    className: 'col-span-2 row-span-2',
    img: '/b5.svg',
    imgClassName: 'absolute right-0 bottom-0 md:w-96 w-60',
    titleClassName: 'justify-center md:justify-start lg:justify-center',
    spareImg: '/grid.svg',
  },
  {
    id: 6,
    title: 'Number of Projects Built',
    description: '70',
    className: 'col-span-1 row-span-1',
    img: '',
    imgClassName: '',
    titleClassName: 'justify-center md:max-w-full max-w-60 text-center',
    spareImg: '',
  },
];

export const technologies = [
  'typescript',
  'javascript',
  'react',
  'html5',
  'css3',
  'nodedotjs',
  'express',
  'nextdotjs',
  'prisma',
  'amazonaws',
  'postgresql',
  'firebase',
  'nginx',
  'vercel',
  'testinglibrary',
  'jest',
  'cypress',
  'docker',
  'git',
  'github',
  'visualstudiocode',
  'figma',
];

export const projects = [
  {
    id: 1,
    title: 'GPTClone',
    des: 'An application utilizing the power of OpenAI API, demonstrating advanced features of Next.js.',
    iconLists: ['/next.svg'],
    link: '#',
  },
  {
    id: 2,
    title: 'JobSeekr',
    des: 'A robust application for tracking and managing job submissions built with the latest technologies.',
    iconLists: ['/next.svg'],
    link: '#',
  },
  {
    id: 3,
    title: 'SwiftSpeak',
    des: 'A messenger application tailored for small businesses, allowing smooth communication and collaboration among users.',
    iconLists: ['/next.svg'],
    link: '#',
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "Adrian's work on our project was exceptional. His attention to detail and innovative solutions greatly improved our web application's performance and user experience.",
    name: 'Sarah Thompson',
    title: 'CTO of TechInnovate',
  },
  {
    id: 2,
    quote:
      'Working with Adrian was a game-changer for our startup. His expertise in React and Next.js helped us launch our product ahead of schedule.',
    name: 'Michael Johnson',
    title: 'Founder of WebSprint',
  },
  {
    id: 3,
    quote:
      "Adrian's ability to translate complex requirements into elegant code is remarkable. He's a valuable asset to any development team.",
    name: 'Emily Chen',
    title: 'Lead Developer at CodeCraft',
  },
  {
    id: 4,
    quote:
      "I was impressed by Adrian's professionalism and technical skills. He delivered a high-quality solution that exceeded our expectations.",
    name: 'David Rodriguez',
    title: 'Project Manager at InnoSystems',
  },
  {
    id: 5,
    quote:
      "Adrian's dedication to clean, efficient code and his collaborative approach made our project a success. I highly recommend his services.",
    name: 'Lisa Nakamura',
    title: 'Director of UX at DesignHub',
  },
];

export const companies = [
  {
    id: 1,
    name: 'cloudinary',
    img: '/cloud.svg',
    nameImg: '/cloudName.svg',
  },
  {
    id: 2,
    name: 'appwrite',
    img: '/app.svg',
    nameImg: '/appName.svg',
  },
  {
    id: 3,
    name: 'HOSTINGER',
    img: '/host.svg',
    nameImg: '/hostName.svg',
  },
  {
    id: 4,
    name: 'stream',
    img: '/s.svg',
    nameImg: '/streamName.svg',
  },
  {
    id: 5,
    name: 'docker.',
    img: '/dock.svg',
    nameImg: '/dockerName.svg',
  },
];

export const workExperience = [
  {
    id: 1,
    title: 'Freelance Web Developer',
    desc: 'Developed various web applications using Next.js, React, TypeScript, and other modern technologies.',
    period: 'Since October 2021',
    location: 'Morocco, Marrakesh/Safi',
  },
  {
    id: 2,
    title: 'Mobile / Web Developer',
    desc: 'Completed a comprehensive web development boot camp, working on various projects.',
    period: 'November 2021 to October 2022',
    location: 'Morocco, Safi',
  },
];

export const socialMedia = [
  { id: 1, img: '/github.svg', link: 'https://github.com/AymenXS' },
  { id: 2, img: '/linkedin.svg', link: 'https://linkedin.com/in/ghaloua-aymen/' },
];
