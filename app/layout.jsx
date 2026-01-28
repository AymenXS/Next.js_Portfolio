import { Dosis } from 'next/font/google';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import './globals.css';

const MainFont = Dosis({ subsets: ['latin'] });

export const metadata = {
  title: 'Portfolio',
  description: 'Aymen 👻',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="skeleton" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
