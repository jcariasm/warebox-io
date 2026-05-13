import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Warebox.io — Herramientas para viajeros mexicanos en USA | FIFA 2026',
    template: '%s | Warebox.io',
  },
  description:
    'Herramientas esenciales para viajeros mexicanos en Estados Unidos durante el Mundial FIFA 2026. Conversor de tallas y calculadora de propinas.',
  metadataBase: new URL('https://warebox.io'),
  openGraph: {
    siteName: 'Warebox.io',
    locale: 'es_MX',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* AdSense placeholder — replace ca-pub-XXXXXXXXXX with your real ID */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body className="bg-neutral-50 text-neutral-700 leading-relaxed min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
