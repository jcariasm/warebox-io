import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Warebox.io — Herramientas para viajeros mexicanos | FIFA 2026',
  description:
    'Conversor de tallas MX-USA y calculadora de propinas. Todo lo que necesitas para tu viaje al Mundial FIFA 2026 en Estados Unidos.',
  alternates: { canonical: 'https://warebox.io' },
};

const tools = [
  {
    href: '/tallas',
    emoji: '👟',
    title: 'Conversor de Tallas MX ↔ USA',
    desc: 'Zapatos, ropa y jerseys FIFA 2026. Encuentra tu talla exacta en segundos.',
  },
  {
    href: '/propinas',
    emoji: '💵',
    title: 'Calculadora de Propinas USA',
    desc: 'Restaurantes, bares, taxis, hoteles. Calcula exactamente cuanto dejar.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-wbx-black to-neutral-800 text-white py-16 px-5 text-center">
        <h1 className="text-[clamp(30px,6vw,52px)] font-extrabold tracking-tighter leading-none mb-4">
          Viaja a USA <span className="text-wbx-accent">preparado</span>
        </h1>
        <p className="text-lg text-neutral-400 max-w-xl mx-auto">
          Herramientas simples y gratuitas para viajeros mexicanos que van al Mundial FIFA 2026 en Estados Unidos.
        </p>
      </section>

      {/* Tool Cards */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-wbx-accent transition-all"
            >
              <div className="text-5xl mb-4">{t.emoji}</div>
              <h2 className="text-xl font-extrabold text-wbx-black mb-2 group-hover:text-wbx-accent transition-colors">
                {t.title}
              </h2>
              <p className="text-neutral-500 text-sm leading-relaxed">{t.desc}</p>
              <span className="inline-block mt-4 text-wbx-accent font-bold text-sm">
                Usar herramienta &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Extra context */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-extrabold text-wbx-black mb-3">FIFA World Cup 2026</h2>
          <p className="text-neutral-500 max-w-lg mx-auto text-sm leading-relaxed">
            El Mundial 2026 se juega en Estados Unidos, Mexico y Canada. Si viajas desde Mexico a las sedes en USA, estas herramientas te ayudan con las diferencias de tallas y la cultura de propinas estadounidense.
          </p>
        </div>
      </section>
    </>
  );
}
