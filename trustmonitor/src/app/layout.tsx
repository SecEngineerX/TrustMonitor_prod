import type { Metadata } from 'next';
import { SEO } from '@/utils/constants';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: 'https://trustmonitor.dev',
    siteName: 'TrustMonitor',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
