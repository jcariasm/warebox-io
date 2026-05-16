'use client';

import { useMemo, useState } from 'react';

const capacityOptions = [
  { label: 'Equipo en modo reactivo', value: 0.75 },
  { label: 'Proceso comercial estable', value: 1 },
  { label: 'Equipo listo para escalar', value: 1.25 },
];

function money(value: number) {
  return value.toLocaleString('es-MX', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'MXN',
  });
}

export default function SailAwaySimulator() {
  const [monthlySales, setMonthlySales] = useState(1800000);
  const [grossMargin, setGrossMargin] = useState(34);
  const [opportunities, setOpportunities] = useState(6);
  const [capacity, setCapacity] = useState(capacityOptions[1].value);

  const model = useMemo(() => {
    const growthRate = Math.min(0.36, Math.max(0.04, opportunities * 0.018 * capacity));
    const additionalSales = monthlySales * 12 * growthRate;
    const additionalProfit = additionalSales * (grossMargin / 100);
    const readiness = Math.min(100, Math.round(35 + opportunities * 4 + capacity * 15 + grossMargin * 0.25));
    const suggestedPath =
      readiness >= 78
        ? 'Crecimiento Guiado 1 a 1'
        : readiness >= 62
          ? 'Roadmap comercial de 30 dias'
          : 'Diagnostico de oportunidades';

    return {
      additionalProfit,
      additionalSales,
      growthRate,
      readiness,
      suggestedPath,
    };
  }, [capacity, grossMargin, monthlySales, opportunities]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="wbx-card-light p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="wbx-label">Ventas mensuales actuales</span>
            <input
              value={monthlySales}
              onChange={(event) => setMonthlySales(parseInt(event.target.value, 10) || 0)}
              inputMode="numeric"
              className="mt-2 h-14 w-full rounded-md border border-wbx-hairline bg-white px-4 font-num text-2xl font-bold text-wbx-ink outline-none focus:ring-2 focus:ring-wbx-blue/40"
            />
          </label>

          <label>
            <span className="wbx-label">Margen bruto</span>
            <div className="mt-2 flex h-14 items-center rounded-md border border-wbx-hairline bg-white px-4">
              <input
                value={grossMargin}
                onChange={(event) => setGrossMargin(Math.min(90, Math.max(1, parseInt(event.target.value, 10) || 1)))}
                inputMode="numeric"
                className="w-full bg-transparent font-num text-2xl font-bold text-wbx-ink outline-none"
              />
              <span className="font-semibold text-wbx-muted">%</span>
            </div>
          </label>

          <label>
            <span className="wbx-label">Oportunidades activables</span>
            <input
              type="range"
              min="1"
              max="12"
              value={opportunities}
              onChange={(event) => setOpportunities(parseInt(event.target.value, 10))}
              className="mt-4 w-full accent-wbx-accent"
            />
            <span className="mt-2 block font-num text-2xl font-bold text-wbx-ink">{opportunities}</span>
          </label>

          <label>
            <span className="wbx-label">Capacidad comercial</span>
            <select
              value={capacity}
              onChange={(event) => setCapacity(parseFloat(event.target.value))}
              className="mt-2 h-14 w-full rounded-md border border-wbx-hairline bg-white px-4 font-semibold text-wbx-ink outline-none focus:ring-2 focus:ring-wbx-blue/40"
            >
              {capacityOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 rounded-xl border border-wbx-hairline bg-wbx-soft p-5">
          <h2 className="text-xl font-semibold text-wbx-ink">Lectura rapida</h2>
          <p className="mt-2 text-sm leading-6 text-wbx-muted">
            Este simulador estima el potencial comercial anual si Sail Away prioriza segmentos, oferta, pricing y ejecucion sobre una agenda de crecimiento guiado.
          </p>
        </div>
      </div>

      <aside className="wbx-card-dark overflow-hidden">
        <div className="border-b border-wbx-elevated bg-[linear-gradient(135deg,#082f49,#0b0e11)] p-6">
          <p className="text-xs font-semibold uppercase tracking-normal text-wbx-accent">Sail Away Growth</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-white">
            Potencial anual estimado
          </h2>
        </div>

        <div className="grid gap-px bg-wbx-elevated">
          <div className="bg-wbx-card p-5">
            <div className="wbx-number text-3xl font-bold text-wbx-accent">{money(model.additionalProfit)}</div>
            <div className="mt-1 text-sm text-wbx-muted">utilidad bruta incremental</div>
          </div>
          <div className="grid grid-cols-2 gap-px">
            <div className="bg-wbx-card p-5">
              <div className="wbx-number text-2xl font-bold text-white">{money(model.additionalSales)}</div>
              <div className="mt-1 text-xs text-wbx-muted">ventas nuevas</div>
            </div>
            <div className="bg-wbx-card p-5">
              <div className="wbx-number text-2xl font-bold text-white">{Math.round(model.growthRate * 100)}%</div>
              <div className="mt-1 text-xs text-wbx-muted">crecimiento posible</div>
            </div>
          </div>
          <div className="bg-wbx-card p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-white">Preparacion comercial</span>
              <span className="wbx-number text-xl font-bold text-wbx-green">{model.readiness}/100</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-wbx-black">
              <div className="h-full rounded-full bg-wbx-green" style={{ width: `${model.readiness}%` }} />
            </div>
          </div>
          <div className="bg-wbx-card p-5">
            <div className="text-xs font-semibold uppercase text-wbx-muted">Ruta sugerida</div>
            <div className="mt-2 text-xl font-semibold text-white">{model.suggestedPath}</div>
          </div>
        </div>
      </aside>
    </div>
  );
}
