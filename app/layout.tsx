import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Warebox.io - Travel tools para mexicanos en USA | FIFA 2026',
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
        <meta name="theme-color" content="#0b0e11" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Warebox.io" />
        {/* AdSense placeholder - replace ca-pub-XXXXXXXXXX with your real ID */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body className="flex min-h-screen flex-col bg-wbx-black text-wbx-body leading-relaxed">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
