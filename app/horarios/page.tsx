'use client';

import { useMemo, useState } from 'react';

const zones = [
  { city: 'CDMX / Guadalajara / Monterrey', zone: 'America/Mexico_City', offset: -6 },
  { city: 'Los Angeles / Vancouver / Seattle', zone: 'America/Los_Angeles', offset: -7 },
  { city: 'Dallas / Houston / Kansas City', zone: 'America/Chicago', offset: -5 },
  { city: 'Miami / New York / Toronto', zone: 'America/New_York', offset: -4 },
];

export default function HorariosPage() {
  const now = new Date();
  const [date, setDate] = useState(now.toISOString().slice(0, 10));
  const [time, setTime] = useState('20:00');
  const [from, setFrom] = useState(zones[0].zone);

  const rows = useMemo(() => {
    const source = zones.find((zone) => zone.zone === from) ?? zones[0];
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    const utc = Date.UTC(year, month - 1, day, hour, minute) - source.offset * 60 * 60 * 1000;
    return zones.map((zone) => ({
      ...zone,
      time: new Date(utc + zone.offset * 60 * 60 * 1000).toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
      }),
      source: zone.zone === source.zone,
    }));
  }, [date, from, time]);

  return (
    <section className="bg-wbx-black py-10 sm:py-14">
      <div className="wbx-container">
        <div className="mb-8">
          <h1 className="text-[clamp(32px,5vw,48px)] font-bold leading-tight text-white">Horarios por sede</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-wbx-muted">
            Convierte horarios de partido, vuelos, check-in y traslados entre las zonas del Mundial.
          </p>
        </div>
        <div className="wbx-card-light p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <label>
              <span className="wbx-label">Fecha</span>
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 h-12 w-full rounded-md border border-wbx-hairline px-4 outline-none focus:ring-2 focus:ring-wbx-blue/40" />
            </label>
            <label>
              <span className="wbx-label">Hora</span>
              <input type="time" value={time} onChange={(event) => setTime(event.target.value)} className="mt-2 h-12 w-full rounded-md border border-wbx-hairline px-4 outline-none focus:ring-2 focus:ring-wbx-blue/40" />
            </label>
            <label>
              <span className="wbx-label">Origen</span>
              <select value={from} onChange={(event) => setFrom(event.target.value)} className="mt-2 h-12 w-full rounded-md border border-wbx-hairline px-4 outline-none focus:ring-2 focus:ring-wbx-blue/40">
                {zones.map((zone) => (
                  <option key={zone.zone} value={zone.zone}>{zone.city}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-wbx-hairline">
            {rows.map((row) => (
              <div key={row.zone} className={`grid grid-cols-[1fr_auto] px-5 py-4 ${row.source ? 'bg-wbx-accent text-wbx-ink' : 'border-b border-wbx-hairline last:border-b-0'}`}>
                <span className="font-semibold">{row.city}</span>
                <span className="wbx-number text-xl font-bold">{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
