'use client';

import { useMemo, useState } from 'react';

const groups = [
  {
    title: 'Antes de salir',
    items: ['Pasaporte o ID', 'Visa / eTA si aplica', 'Boleto QR descargado', 'Hotel y transporte confirmados'],
  },
  {
    title: 'Dia de partido',
    items: ['Telefono cargado', 'Power bank', 'Tarjeta bancaria', 'Bolsa permitida', 'Gorra / impermeable segun clima'],
  },
  {
    title: 'Emergencia',
    items: ['Contacto de emergencia', 'Seguro de viaje', 'Direccion del hotel', 'Medicamentos y alergias en ingles'],
  },
];

export default function ChecklistPage() {
  const allItems = groups.flatMap((group) => group.items);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const completed = useMemo(() => allItems.filter((item) => checked[item]).length, [allItems, checked]);

  function toggle(item: string) {
    setChecked((current) => ({ ...current, [item]: !current[item] }));
  }

  return (
    <section className="bg-wbx-black py-10 sm:py-14">
      <div className="wbx-container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[clamp(32px,5vw,48px)] font-bold leading-tight text-white">Checklist de viaje</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-wbx-muted">Lo minimo para no sufrir en aeropuerto, hotel, estadio o migracion.</p>
          </div>
          <div className="rounded-xl bg-wbx-accent px-5 py-3 text-wbx-ink">
            <span className="wbx-number text-3xl font-bold">{completed}/{allItems.length}</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="wbx-card-dark p-5">
              <h2 className="text-xl font-semibold text-white">{group.title}</h2>
              <div className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggle(item)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left text-sm transition-colors ${
                      checked[item]
                        ? 'border-wbx-accent bg-wbx-accent text-wbx-ink'
                        : 'border-wbx-elevated bg-wbx-black text-wbx-muted hover:bg-wbx-elevated'
                    }`}
                  >
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border text-xs ${checked[item] ? 'border-wbx-ink' : 'border-wbx-muted'}`}>
                      {checked[item] ? 'x' : ''}
                    </span>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
