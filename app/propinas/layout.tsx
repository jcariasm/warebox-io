import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora de Propinas USA para Mexicanos | Mundial FIFA 2026',
  description:
    'Calcula cuanto dejar de propina en restaurantes, bares, taxis y hoteles de Estados Unidos. Guia esencial para viajeros mexicanos en el Mundial 2026.',
  keywords:
    'propinas USA, tip calculator, cuanto propina estados unidos, propinas restaurante USA, propina uber USA, propina hotel USA, mundial 2026 propinas',
  alternates: { canonical: 'https://warebox.io/propinas' },
  openGraph: {
    title: 'Calculadora de Propinas USA — Warebox',
    description:
      'Calcula propinas en USA como un local. Restaurantes, bares, taxis, hoteles. Esencial para el Mundial 2026.',
    url: 'https://warebox.io/propinas',
  },
};

export default function PropinasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
