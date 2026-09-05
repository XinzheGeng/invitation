import type { Metadata } from 'next';
import './globals.css';
import { WEDDING } from './invitation-data';

export const metadata: Metadata = {
  title: WEDDING.title,
  description: '互动婚礼请柬视觉原型',
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
    apple: '/icon-large.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
