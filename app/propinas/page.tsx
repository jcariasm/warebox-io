'use client';

import { useState, useMemo } from 'react';
import AdSlot from '@/components/AdSlot';
import FaqSection from '@/components/FaqSection';

/* ============================================================
   DATA
   ============================================================ */

const MXN_RATE = 18.5;

const SCENARIO_HINTS: Record<string, string> = {
  restaurant:
    'En USA, 18-20% es estandar. Si van 6+ personas, revisa si la propina ya esta incluida en la cuenta ("gratuity included").',
  bar: 'Tip: $1-2 por bebida simple (cerveza, copa de vino). $2-3 por coctel elaborado. Si abres una cuenta, 18-20% al cerrarla.',
  cafe: 'No es obligatorio, pero si la terminal te pregunta, $1-2 o 10-15% es un buen gesto.',
  delivery:
    'Minimo $3-5 incluso en pedidos chicos. Si llueve, hace frio o el repartidor subio escaleras, se generoso.',
  uber: 'La propina se agrega en la app despues del viaje. $2-3 minimo, 15-20% para viajes largos o con equipaje.',
  'hotel-bell': 'Propina por maleta: $1-2 por pieza. Ten dolares sueltos listos al llegar al hotel.',
  'hotel-house':
    '$2-5 por noche. Dejalo diario en la almohada con una nota — no todas las noches limpia la misma persona.',
  'hotel-valet': 'Se da al RECOGER el auto, no al dejarlo. $3-5 normal, $5-10 en hoteles de lujo.',
  hair: '18-22% sobre el total del servicio. Si es el dueno del salon, la propina es opcional pero apreciada.',
  tour: '15-20% del costo del tour. Si el tour fue gratuito (free walking tour), $5-10 por persona es justo.',
};

const SCENARIO_DEFAULTS: Record<string, { pct: number; bill: number; fixed?: number }> = {
  restaurant: { pct: 20, bill: 85 },
  bar: { pct: 18, bill: 45 },
  cafe: { pct: 10, bill: 12 },
  delivery: { pct: 18, bill: 35 },
  uber: { pct: 18, bill: 25 },
  'hotel-bell': { pct: 0, bill: 0, fixed: 5 },
  'hotel-house': { pct: 0, bill: 0, fixed: 5 },
  'hotel-valet': { pct: 0, bill: 0, fixed: 5 },
  hair: { pct: 20, bill: 40 },
  tour: { pct: 18, bill: 60 },
};

const SCENARIOS = [
  { value: 'restaurant', label: 'Restaurante con mesero' },
  { value: 'bar', label: 'Bar / Cantina' },
  { value: 'cafe', label: 'Cafe / Comida rapida' },
  { value: 'delivery', label: 'Delivery / Uber Eats' },
  { value: 'uber', label: 'Uber / Lyft / Taxi' },
  { value: 'hotel-bell', label: 'Hotel — Bellboy/Maletero' },
  { value: 'hotel-house', label: 'Hotel — Housekeeping' },
  { value: 'hotel-valet', label: 'Valet Parking' },
  { value: 'hair', label: 'Salon / Barberia' },
  { value: 'tour', label: 'Tour guide' },
];

const TIP_BUTTONS = [
  { pct: 15, label: '15%', desc: 'Aceptable' },
  { pct: 18, label: '18%', desc: 'Estandar' },
  { pct: 20, label: '20%', desc: 'Bueno' },
  { pct: 25, label: '25%', desc: 'Excelente' },
];

const GUIDE_TABLE = [
  { service: 'Restaurante (mesa)', tip: '18–22%', when: 'Sobre el subtotal antes de impuestos' },
  { service: 'Restaurante buffet', tip: '10–15%', when: 'Alguien trae bebidas y limpia tu mesa' },
  { service: 'Barra de bar', tip: '$1–2/bebida', when: 'O 18-20% de la cuenta si abres tab' },
  { service: 'Delivery (app)', tip: '15–20%', when: 'Minimo $3-5. Lluvia/noche: sube a 20%+' },
  { service: 'Uber / Lyft', tip: '15–20%', when: 'En la app despues del viaje. Min $2-3' },
  { service: 'Taxi amarillo', tip: '15–20%', when: 'En efectivo o en la terminal del taxi' },
  { service: 'Housekeeping', tip: '$2–5/noche', when: 'Diario en la almohada (no al final)' },
  { service: 'Bellboy', tip: '$1–2/maleta', when: 'Al llegar y/o al salir' },
  { service: 'Concierge', tip: '$5–20', when: 'Segun complejidad del favor' },
  { service: 'Valet parking', tip: '$3–5', when: 'Al recoger el auto' },
  { service: 'Barberia / Salon', tip: '18–22%', when: 'Al estilista, en efectivo si es posible' },
  { service: 'Tour guide', tip: '15–20%', when: 'O $5-10 para tours cortos gratuitos' },
  { service: 'Comida para llevar', tip: '$0–10%', when: 'No obligatorio, pero apreciado' },
  { service: 'Starbucks / Cafeteria', tip: '$0–$2', when: 'Totalmente opcional' },
];

const QUICK_SCENARIOS = [
  {
    title: 'Restaurante',
    range: '18–22%',
    detail:
      'Con servicio de mesa. Minimo 15% incluso si el servicio fue malo. Si van 6+ personas, algunos restaurantes agregan propina automatica (18%).',
  },
  {
    title: 'Bar',
    range: '$1–2/bebida',
    detail: 'O 18-20% de la cuenta total. Cocteles elaborados: $2-3. En estadios del Mundial aplica igual.',
  },
  {
    title: 'Uber / Lyft',
    range: '15–20%',
    detail: 'Minimo $2-3. Con equipaje o viaje al aeropuerto, se generoso. La propina se agrega en la app.',
  },
  {
    title: 'Hotel',
    range: '$2–5/dia',
    detail:
      'Housekeeping: $2-5/noche, dejalo en la almohada con nota. Bellboy: $1-2 por maleta. Concierge: $5-20 segun el favor.',
  },
  {
    title: 'Valet Parking',
    range: '$3–5',
    detail: 'Al recoger el auto, no al dejarlo. En hoteles de lujo cerca de estadios: $5-10.',
  },
  {
    title: 'Comida rapida / Cafe',
    range: '$0–$2',
    detail: 'No obligatorio. Si ves un jar de propinas o la terminal te pregunta, $1-2 esta bien. Starbucks: opcional.',
  },
];

const CULTURAL_TIPS = [
  {
    icon: '🇲🇽 → 🇺🇸',
    title: 'En Mexico: 10-15%. En USA: 18-22%.',
    text: 'La propina en USA no es "extra" — es parte del sueldo del mesero. Muchos ganan $2-3/hora de salario base y dependen de las propinas para vivir.',
  },
  {
    icon: '💳',
    title: 'Propina en tarjeta esta bien',
    text: 'A diferencia de Mexico donde el efectivo es rey, en USA es perfectamente normal agregar la propina en la terminal de pago. Escribe el monto en la linea "Tip" del recibo.',
  },
  {
    icon: '⚽',
    title: 'En el estadio del Mundial',
    text: 'Los vendedores de cerveza/comida en el estadio: $1-2. Las propinas en puestos de comida del estadio son opcionales pero apreciadas.',
  },
  {
    icon: '🚫',
    title: 'Nunca dejes 0% en un restaurante',
    text: 'Es considerado un insulto grave. Si el servicio fue terrible, 10-15% y habla con el gerente. Algunos restaurantes ya incluyen propina automatica para grupos de 6+.',
  },
];

const FAQ_ITEMS = [
  {
    question: '¿Cuanto se deja de propina en un restaurante en USA?',
    answer:
      'En restaurantes con servicio de mesa, la propina estandar es 18-20% del total antes de impuestos. Para servicio excelente, 22-25%. Para servicio malo, 15% es el minimo aceptable. No dejar propina es considerado extremadamente grosero.',
  },
  {
    question: '¿Se deja propina en Uber o Lyft?',
    answer:
      'Si, se espera propina de 15-20% del viaje o $2-5 dolares minimo. La app tiene opcion de propina despues del viaje. Para viajes al aeropuerto o con mucho equipaje, se recomienda ser mas generoso.',
  },
  {
    question: '¿Se deja propina en bares?',
    answer:
      'Si. Para bebidas en barra: $1-2 por bebida o 18-20% de la cuenta. Si el bartender prepara cocteles elaborados, $2-3 por bebida. Esto aplica tambien en los bares de los estadios del Mundial.',
  },
  {
    question: '¿Cuanto se le da al valet parking?',
    answer:
      '$3-5 dolares al recoger el auto. En hoteles de lujo o restaurantes finos, $5-10. La propina se da cuando te entregan las llaves, no al dejar el auto.',
  },
  {
    question: '¿La propina es obligatoria en USA?',
    answer:
      'Legalmente no, pero culturalmente si en servicios de mesa. Los meseros dependen de las propinas — su salario base puede ser tan bajo como $2.13/hora en algunos estados.',
  },
  {
    question: '¿Debo dejar propina en efectivo o con tarjeta?',
    answer:
      'Ambas opciones son aceptables. El efectivo tiene la ventaja de que el mesero lo recibe inmediatamente y al 100%. Con tarjeta, el restaurante puede retener un porcentaje. Si tienes dolares en efectivo, es la opcion preferida.',
  },
];

/* ============================================================
   COMPONENT
   ============================================================ */

export default function PropinasPage() {
  const [scenario, setScenario] = useState('restaurant');
  const [billStr, setBillStr] = useState('');
  const [tipPct, setTipPct] = useState(20);
  const [splitOpen, setSplitOpen] = useState(false);
  const [splitCount, setSplitCount] = useState(2);

  const bill = parseFloat(billStr) || 0;
  const defaults = SCENARIO_DEFAULTS[scenario];

  const result = useMemo(() => {
    if (bill <= 0 && !defaults.fixed) return null;

    let tipAmount: number;
    let total: number;
    let isFixed = false;

    if (defaults.fixed && bill === 0) {
      tipAmount = defaults.fixed;
      total = defaults.fixed;
      isFixed = true;
    } else {
      tipAmount = bill * (tipPct / 100);
      total = bill + tipAmount;
    }

    return { tipAmount, total, isFixed };
  }, [bill, tipPct, defaults]);

  const perPerson = result ? result.total / (splitCount || 2) : 0;

  function handleScenarioChange(val: string) {
    setScenario(val);
    const d = SCENARIO_DEFAULTS[val];
    if (d.bill) setBillStr(String(d.bill));
    if (d.pct) setTipPct(d.pct);
  }

  return (
    <>
      {/* Schema.org FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-wbx-black to-[#1a1a2e] text-white py-12 px-5 text-center">
        <h1 className="text-[clamp(28px,5vw,42px)] font-extrabold tracking-tighter leading-tight mb-3">
          Calculadora de <span className="text-wbx-accent">Propinas USA</span>
        </h1>
        <p className="text-[17px] text-neutral-400 max-w-lg mx-auto">
          Calcula exactamente cuanto dejar de propina en restaurantes, bares, taxis y hoteles de Estados Unidos.
        </p>
      </section>

      <AdSlot />

      <div className="max-w-[900px] mx-auto px-4 pb-16">
        {/* Calculator */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Scenario */}
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Escenario
              </label>
              <select
                value={scenario}
                onChange={(e) => handleScenarioChange(e.target.value)}
                className="w-full p-3 border-2 border-neutral-200 rounded-lg text-base focus:border-wbx-accent focus:outline-none"
              >
                {SCENARIOS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Bill */}
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Cuenta total (USD)
              </label>
              <input
                type="number"
                value={billStr}
                onChange={(e) => setBillStr(e.target.value)}
                placeholder="85.00"
                min="0"
                step="0.01"
                className="w-full p-3 border-2 border-neutral-200 rounded-lg text-base focus:border-wbx-accent focus:outline-none"
              />
            </div>

            {/* Tip buttons */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Porcentaje de propina
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {TIP_BUTTONS.map((b) => (
                  <button
                    key={b.pct}
                    onClick={() => setTipPct(b.pct)}
                    className={`flex-1 min-w-[80px] py-2.5 px-2 rounded-lg border-2 text-center font-semibold transition-all ${
                      tipPct === b.pct
                        ? 'bg-wbx-accent text-white border-wbx-accent'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <span className="text-lg block">{b.label}</span>
                    <span
                      className={`text-[11px] block mt-0.5 ${
                        tipPct === b.pct ? 'text-white/80' : 'text-neutral-400'
                      }`}
                    >
                      {b.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="mt-5 p-6 bg-gradient-to-br from-emerald-800 to-emerald-700 rounded-xl text-white">
              {!result.isFixed && (
                <div className="flex justify-between items-center py-2 border-b border-white/15">
                  <span className="text-[15px] opacity-85">Cuenta</span>
                  <span className="text-[17px] font-bold">${bill.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-2 border-b border-white/15">
                <span className="text-[15px] opacity-85">
                  Propina {!result.isFixed && `(${tipPct}%)`}
                </span>
                <span className="text-[17px] font-bold">${result.tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="text-lg">Total a pagar</span>
                <span className="text-3xl font-extrabold">${result.total.toFixed(2)}</span>
              </div>

              {/* MXN equivalent */}
              <div className="mt-3 p-3 bg-white/10 rounded-lg text-sm">
                Equivalente en pesos:{' '}
                <span className="text-xl font-extrabold">
                  ${Math.round(result.total * MXN_RATE).toLocaleString()} MXN
                </span>
                <span className="block text-xs opacity-70 mt-0.5">
                  Tipo de cambio aprox: {MXN_RATE} MXN/USD
                </span>
              </div>

              {/* Split */}
              {splitOpen && (
                <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-3 flex-wrap">
                    <label className="text-sm font-semibold text-neutral-700">Dividir entre</label>
                    <input
                      type="number"
                      value={splitCount}
                      onChange={(e) => setSplitCount(Math.max(2, parseInt(e.target.value) || 2))}
                      min={2}
                      max={20}
                      className="w-16 p-2 border-2 border-neutral-200 rounded-lg text-base text-center text-neutral-700"
                    />
                    <label className="text-sm font-semibold text-neutral-700">personas =</label>
                    <span className="text-xl font-extrabold text-wbx-accent">
                      ${perPerson.toFixed(2)}
                    </span>
                    <span className="text-xs text-neutral-400">c/u</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSplitOpen(!splitOpen)}
                className="mt-3 bg-transparent border-none text-white/70 cursor-pointer text-sm underline"
              >
                {splitOpen ? 'Ocultar division' : 'Dividir la cuenta'}
              </button>
            </div>
          )}

          {/* Hint */}
          {SCENARIO_HINTS[scenario] && (
            <div className="mt-4 p-3.5 bg-amber-50 rounded-lg text-sm text-amber-800">
              {SCENARIO_HINTS[scenario]}
            </div>
          )}
        </div>

        {/* Quick scenarios */}
        <section className="mb-10">
          <h2 className="text-2xl font-extrabold text-wbx-black mb-4">Guia rapida por escenario</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_SCENARIOS.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-xl p-5 shadow border-l-4 border-wbx-accent"
              >
                <h3 className="text-base font-bold text-wbx-black mb-2">{s.title}</h3>
                <div className="text-3xl font-extrabold text-wbx-accent">{s.range}</div>
                <p className="text-sm text-neutral-500 mt-1.5 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot format="rectangle" />

        {/* Full guide table */}
        <section className="mb-10">
          <h2 className="text-2xl font-extrabold text-wbx-black mb-4">Tabla completa de propinas en USA</h2>
          <div className="overflow-x-auto rounded-xl shadow">
            <table className="w-full border-collapse bg-white text-[15px]">
              <thead>
                <tr>
                  <th className="bg-wbx-black text-white py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide">
                    Servicio
                  </th>
                  <th className="bg-wbx-black text-white py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide">
                    Propina esperada
                  </th>
                  <th className="bg-wbx-black text-white py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide">
                    Cuando / Como
                  </th>
                </tr>
              </thead>
              <tbody>
                {GUIDE_TABLE.map((r, i) => (
                  <tr key={i} className="hover:bg-orange-50">
                    <td className="py-3 px-4 border-b border-neutral-100">{r.service}</td>
                    <td className="py-3 px-4 border-b border-neutral-100 font-bold text-wbx-accent whitespace-nowrap">
                      {r.tip}
                    </td>
                    <td className="py-3 px-4 border-b border-neutral-100">{r.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cultural tips */}
        <section className="mb-10">
          <h2 className="text-2xl font-extrabold text-wbx-black mb-4">Diferencias culturales: Mexico vs USA</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {CULTURAL_TIPS.map((t, i) => (
              <div key={i} className="bg-white rounded-lg p-5 shadow">
                <div className="text-3xl mb-2">{t.icon}</div>
                <h4 className="text-[15px] font-bold mb-1.5">{t.title}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </section>

        <FaqSection items={FAQ_ITEMS} />

        <AdSlot />
      </div>
    </>
  );
}
