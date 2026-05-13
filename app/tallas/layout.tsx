import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conversor de Tallas Mexico ↔ USA | Zapatos, Ropa y Jerseys FIFA 2026',
  description:
    'Convierte tallas de zapatos, ropa y jerseys entre Mexico y Estados Unidos. Guia esencial para el Mundial FIFA 2026. Tabla completa hombre, mujer y ninos.',
  keywords:
    'tallas mexico usa, conversor tallas zapatos, tallas ropa mexico estados unidos, jersey FIFA 2026 talla, shoe size mexico to us, size chart mx us',
  alternates: { canonical: 'https://warebox.io/tallas' },
  openGraph: {
    title: 'Conversor de Tallas Mexico ↔ USA — Warebox',
    description:
      'Convierte tallas de zapatos, ropa y jerseys entre Mexico y Estados Unidos. Esencial para el Mundial 2026.',
    url: 'https://warebox.io/tallas',
  },
};

export default function TallasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
