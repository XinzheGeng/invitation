import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '一根红线，装订两个人生',
  description: '互动婚礼请柬视觉原型',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
