'use client';

import { useMemo, useState } from 'react';

const places = [
  { name: 'Mexico City', country: 'Mexico', tax: 0, note: 'IVA normalmente incluido en precio mostrado' },
  { name: 'Guadalajara', country: 'Mexico', tax: 0, note: 'IVA normalmente incluido en precio mostrado' },
  { name: 'Monterrey', country: 'Mexico', tax: 0, note: 'IVA normalmente incluido en precio mostrado' },
  { name: 'Los Angeles', country: 'USA', tax: 0.095, note: 'Sales tax aproximado' },
  { name: 'Dallas', country: 'USA', tax: 0.0825, note: 'Sales tax aproximado' },
  { name: 'Miami', country: 'USA', tax: 0.07, note: 'Sales tax aproximado' },
  { name: 'New York / New Jersey', country: 'USA', tax: 0.06625, note: 'Sales tax aproximado NJ' },
  { name: 'Toronto', country: 'Canada', tax: 0.13, note: 'HST aproximado Ontario' },
  { name: 'Vancouver', country: 'Canada', tax: 0.12, note: 'GST + PST aproximado BC' },
];

export default function ImpuestosPage() {
  const [amount, setAmount] = useState('120');
  const [place, setPlace] = useState(places[3].name);

  const selected = places.find((item) => item.name === place) ?? places[0];
  const subtotal = parseFloat(amount) || 0;

  const result = useMemo(() => {
    const tax = subtotal * selected.tax;
    return { tax, total: subtotal + tax };
  }, [selected.tax, subtotal]);

  return (
    <section className="bg-wbx-black py-10 sm:py-14">
      <div className="wbx-container">
        <div className="mb-8">
          <h1 className="text-[clamp(32px,5vw,48px)] font-bold leading-tight text-white">Impuestos de compra</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-wbx-muted">
            En USA y Canada el impuesto suele aparecer al pagar. En Mexico normalmente ya viene incluido.
          </p>
        </div>

        <div className="wbx-card-light p-6">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
            <label>
              <span className="wbx-label">Precio mostrado</span>
              <input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                inputMode="decimal"
                className="mt-2 h-14 w-full rounded-md border border-wbx-hairline bg-white px-4 font-num text-3xl font-bold text-wbx-ink outline-none focus:ring-2 focus:ring-wbx-blue/40"
              />
            </label>
            <label>
              <span className="wbx-label">Sede / ciudad</span>
              <select
                value={place}
                onChange={(event) => setPlace(event.target.value)}
                className="mt-2 h-14 w-full rounded-md border border-wbx-hairline bg-white px-4 font-semibold outline-none focus:ring-2 focus:ring-wbx-blue/40"
              >
                {places.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <Result label="Subtotal" value={subtotal} />
            <Result label={`Tax ${Math.round(selected.tax * 10000) / 100}%`} value={result.tax} />
            <Result label="Total estimado" value={result.total} highlight />
          </div>
          <p className="mt-4 text-sm text-wbx-muted">{selected.country}: {selected.note}</p>
        </div>
      </div>
    </section>
  );
}

function Result({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${highlight ? 'border-wbx-accent bg-wbx-accent text-wbx-ink' : 'border-wbx-hairline bg-white'}`}>
      <div className="text-xs font-semibold uppercase text-wbx-muted">{label}</div>
      <div className="wbx-number mt-2 text-3xl font-bold">${value.toFixed(2)}</div>
    </div>
  );
}
