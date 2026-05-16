'use client';

import { useMemo, useState } from 'react';

const DEFAULT_RATES = {
  USD: 18.5,
  CAD: 13.6,
  MXN: 1,
};

const currencies = ['MXN', 'USD', 'CAD'] as const;
type Currency = (typeof currencies)[number];

export default function MonedaPage() {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState<Currency>('USD');
  const [rates, setRates] = useState(DEFAULT_RATES);

  const value = parseFloat(amount) || 0;

  const converted = useMemo(() => {
    const mxn = from === 'MXN' ? value : value * rates[from];
    return currencies.map((currency) => ({
      currency,
      value: currency === 'MXN' ? mxn : mxn / rates[currency],
    }));
  }, [from, rates, value]);

  return (
    <section className="bg-wbx-black py-10 sm:py-14">
      <div className="wbx-container">
        <div className="mb-8">
          <h1 className="text-[clamp(32px,5vw,48px)] font-bold leading-tight text-white">Conversor MXN / USD / CAD</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-wbx-muted">
            Para compras, restaurantes y traslados entre Mexico, Estados Unidos y Canada. Ajusta el tipo de cambio si tu banco usa otro.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="wbx-card-light p-6">
            <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
              <label>
                <span className="wbx-label">Monto</span>
                <input
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  inputMode="decimal"
                  className="mt-2 h-14 w-full rounded-md border border-wbx-hairline bg-white px-4 font-num text-3xl font-bold text-wbx-ink outline-none focus:ring-2 focus:ring-wbx-blue/40"
                />
              </label>
              <label>
                <span className="wbx-label">Moneda</span>
                <select
                  value={from}
                  onChange={(event) => setFrom(event.target.value as Currency)}
                  className="mt-2 h-14 w-full rounded-md border border-wbx-hairline bg-white px-4 font-semibold text-wbx-ink outline-none focus:ring-2 focus:ring-wbx-blue/40"
                >
                  {currencies.map((currency) => (
                    <option key={currency}>{currency}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-wbx-hairline">
              {converted.map((row) => (
                <div key={row.currency} className="grid grid-cols-[1fr_auto] border-b border-wbx-hairline px-5 py-4 last:border-b-0">
                  <span className="font-semibold">{row.currency}</span>
                  <span className="wbx-number text-xl font-bold">{row.value.toLocaleString('es-MX', { maximumFractionDigits: 2 })}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="wbx-card-dark p-6">
            <h2 className="text-xl font-semibold text-white">Tipos de cambio</h2>
            <p className="mt-2 text-sm leading-6 text-wbx-muted">Referencia editable. No sustituye el tipo real de tu tarjeta.</p>
            <div className="mt-5 space-y-4">
              {(['USD', 'CAD'] as const).map((currency) => (
                <label key={currency} className="block">
                  <span className="wbx-label">1 {currency} en MXN</span>
                  <input
                    value={rates[currency]}
                    onChange={(event) =>
                      setRates((current) => ({ ...current, [currency]: parseFloat(event.target.value) || current[currency] }))
                    }
                    inputMode="decimal"
                    className="mt-2 h-11 w-full rounded-md border border-wbx-elevated bg-wbx-black px-4 font-num text-white outline-none focus:ring-2 focus:ring-wbx-blue/40"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
