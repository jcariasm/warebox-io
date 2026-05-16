import type { Metadata } from 'next';
import Link from 'next/link';
import SailAwaySimulator from '@/components/SailAwaySimulator';

export const metadata: Metadata = {
  title: 'Sail Away Growth Simulator',
  description: 'Simulador de crecimiento rentable en ventas para estimar potencial comercial y ruta de asesoria Sail Away.',
  alternates: { canonical: 'https://warebox.io/simuladores/sail-away' },
};

export default function SailAwaySimulatorPage() {
  return (
    <section className="bg-wbx-black py-10 sm:py-14">
      <div className="wbx-container">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <Link href="/simuladores" className="text-sm font-semibold text-wbx-accent">
              Simuladores
            </Link>
            <h1 className="mt-4 max-w-4xl text-[clamp(34px,6vw,58px)] font-bold leading-tight text-white">
              Sail Away Growth Simulator
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-wbx-muted sm:text-base">
              Una calculadora ejecutiva para estimar cuanto valor comercial podria desbloquearse al ordenar mercado,
              oferta, pricing y capacidades de venta.
            </p>
          </div>

          <div className="wbx-card-dark p-5">
            <div className="text-xs font-semibold uppercase text-wbx-muted">Uso sugerido</div>
            <p className="mt-2 text-sm leading-6 text-white">
              Ajusta los supuestos con datos reales del negocio y usa el resultado como punto de partida para decidir si conviene diagnostico, roadmap o asesoria 1 a 1.
            </p>
          </div>
        </div>

        <SailAwaySimulator />
      </div>
    </section>
  );
}
