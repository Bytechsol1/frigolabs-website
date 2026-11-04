import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Frigo Flow — Connected testing workflows', description: 'A review prototype for clinic and laboratory workflow coordination.', robots: { index: false, follow: false }, openGraph: { title: 'Frigo Flow', description: 'Connecting clinics and laboratories, simplifying testing.', type: 'website' } };
export default function Layout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
