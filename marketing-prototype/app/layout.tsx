import type { Metadata, Viewport } from 'next';
import { Inter, Poppins, Source_Serif_4 } from 'next/font/google';
import { siteConfig } from '../config';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const logo = Poppins({ subsets: ['latin'], weight: ['300', '600'], variable: '--font-logo', display: 'swap' });

const title = 'Frigo Flow | Diagnostic Workflow Platform for Clinics';
const description = 'From patient enrollment to lab results, one connected workflow. Centralized ordering, collection tracking and secure results access in your clinic’s own branded experience.';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  robots: siteConfig.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { title, description, type: 'website', url: '/', siteName: 'Frigo Flow' },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = { themeColor: '#141a33' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${logo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
