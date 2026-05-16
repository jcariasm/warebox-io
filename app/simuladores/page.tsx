import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Simuladores',
  description: 'Simuladores ejecutivos y herramientas de decision dentro de Warebox.io.',
  alternates: { canonical: 'https://warebox.io/simuladores' },
};

const simulators = [
  {
    href: '/simuladores/sail-away',
    title: 'Sail Away Growth',
    desc: 'Simula potencial de crecimiento rentable, preparacion comercial y ruta sugerida de asesoria.',
    metric: 'ROI',
    label: 'ventas',
  },
];

export default function SimuladoresPage() {
  return (
    <section className="bg-wbx-black py-10 sm:py-14">
      <div className="wbx-container">
        <div className="mb-8">
          <h1 className="text-[clamp(32px,5vw,48px)] font-bold leading-tight text-white">Simuladores</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-wbx-muted">
            Modelos rapidos para convertir supuestos en una conversacion clara antes de decidir el siguiente movimiento.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {simulators.map((simulator) => (
            <Link key={simulator.href} href={simulator.href} className="wbx-card-dark p-5 transition-colors hover:bg-wbx-elevated">
              <div className="wbx-number text-3xl font-bold text-wbx-accent">{simulator.metric}</div>
              <div className="mt-1 text-xs font-semibold uppercase text-wbx-muted">{simulator.label}</div>
              <h2 className="mt-5 text-xl font-semibold text-white">{simulator.title}</h2>
              <p className="mt-2 text-sm leading-6 text-wbx-muted">{simulator.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
