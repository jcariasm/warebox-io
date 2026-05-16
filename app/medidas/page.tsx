'use client';

import { useMemo, useState } from 'react';

const conversions = [
  { id: 'km-mi', label: 'Kilometros a millas', from: 'km', to: 'mi', convert: (n: number) => n * 0.621371 },
  { id: 'mi-km', label: 'Millas a kilometros', from: 'mi', to: 'km', convert: (n: number) => n / 0.621371 },
  { id: 'l-gal', label: 'Litros a galones', from: 'L', to: 'gal', convert: (n: number) => n * 0.264172 },
  { id: 'gal-l', label: 'Galones a litros', from: 'gal', to: 'L', convert: (n: number) => n / 0.264172 },
  { id: 'c-f', label: 'Celsius a Fahrenheit', from: 'C', to: 'F', convert: (n: number) => n * 1.8 + 32 },
  { id: 'f-c', label: 'Fahrenheit a Celsius', from: 'F', to: 'C', convert: (n: number) => (n - 32) / 1.8 },
  { id: 'kg-lb', label: 'Kilos a libras', from: 'kg', to: 'lb', convert: (n: number) => n * 2.20462 },
  { id: 'lb-kg', label: 'Libras a kilos', from: 'lb', to: 'kg', convert: (n: number) => n / 2.20462 },
];

export default function MedidasPage() {
  const [mode, setMode] = useState(conversions[0].id);
  const [amount, setAmount] = useState('10');
  const conversion = conversions.find((item) => item.id === mode) ?? conversions[0];
  const result = useMemo(() => conversion.convert(parseFloat(amount) || 0), [amount, conversion]);

  return (
    <section className="bg-wbx-black py-10 sm:py-14">
      <div className="wbx-container">
        <div className="mb-8">
          <h1 className="text-[clamp(32px,5vw,48px)] font-bold leading-tight text-white">Medidas de viaje</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-wbx-muted">
            Millas, kilometros, galones, litros, temperatura y equipaje sin abrir otra app.
          </p>
        </div>
        <div className="wbx-card-light p-6">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
            <label>
              <span className="wbx-label">Conversion</span>
              <select value={mode} onChange={(event) => setMode(event.target.value)} className="mt-2 h-12 w-full rounded-md border border-wbx-hairline px-4 font-semibold outline-none focus:ring-2 focus:ring-wbx-blue/40">
                {conversions.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="wbx-label">Valor</span>
              <input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" className="mt-2 h-12 w-full rounded-md border border-wbx-hairline px-4 font-num text-xl font-bold outline-none focus:ring-2 focus:ring-wbx-blue/40" />
            </label>
          </div>
          <div className="mt-6 rounded-xl bg-wbx-accent p-6 text-wbx-ink">
            <div className="text-sm font-semibold">{amount || 0} {conversion.from}</div>
            <div className="wbx-number mt-2 text-5xl font-bold">{result.toLocaleString('es-MX', { maximumFractionDigits: 2 })} {conversion.to}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
