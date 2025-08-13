import './globals.css';
import './doh.css';
import { Kulim_Park } from 'next/font/google';

const kulim = Kulim_Park({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={kulim.className}>
      <body>
        {children}
      </body>
    </html>
  );
}