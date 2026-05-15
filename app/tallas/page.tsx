'use client';

import { useState, useMemo } from 'react';
import AdSlot from '@/components/AdSlot';
import FaqSection from '@/components/FaqSection';

/* ============================================================
   DATA
   ============================================================ */

interface ShoeRow { mx: number; us: number; eu: number; uk: number }

const SHOE_DATA: Record<string, ShoeRow[]> = {
  men: [
    { mx: 24, us: 6, eu: 38.5, uk: 5.5 },
    { mx: 24.5, us: 6.5, eu: 39, uk: 6 },
    { mx: 25, us: 7, eu: 40, uk: 6.5 },
    { mx: 25.5, us: 7.5, eu: 40.5, uk: 7 },
    { mx: 26, us: 8, eu: 41, uk: 7.5 },
    { mx: 26.5, us: 8.5, eu: 42, uk: 8 },
    { mx: 27, us: 9, eu: 42.5, uk: 8.5 },
    { mx: 27.5, us: 9.5, eu: 43, uk: 9 },
    { mx: 28, us: 10, eu: 44, uk: 9.5 },
    { mx: 28.5, us: 10.5, eu: 44.5, uk: 10 },
    { mx: 29, us: 11, eu: 45, uk: 10.5 },
    { mx: 29.5, us: 11.5, eu: 45.5, uk: 11 },
    { mx: 30, us: 12, eu: 46, uk: 11.5 },
    { mx: 31, us: 13, eu: 47.5, uk: 12.5 },
    { mx: 32, us: 14, eu: 48.5, uk: 13.5 },
  ],
  women: [
    { mx: 21.5, us: 5, eu: 35, uk: 2.5 },
    { mx: 22, us: 5.5, eu: 35.5, uk: 3 },
    { mx: 22.5, us: 6, eu: 36, uk: 3.5 },
    { mx: 23, us: 6.5, eu: 36.5, uk: 4 },
    { mx: 23.5, us: 7, eu: 37.5, uk: 4.5 },
    { mx: 24, us: 7.5, eu: 38, uk: 5 },
    { mx: 24.5, us: 8, eu: 38.5, uk: 5.5 },
    { mx: 25, us: 8.5, eu: 39, uk: 6 },
    { mx: 25.5, us: 9, eu: 40, uk: 6.5 },
    { mx: 26, us: 9.5, eu: 40.5, uk: 7 },
    { mx: 26.5, us: 10, eu: 41, uk: 7.5 },
    { mx: 27, us: 11, eu: 42, uk: 8.5 },
  ],
  kids: [
    { mx: 15, us: 8, eu: 25, uk: 7 },
    { mx: 15.5, us: 8.5, eu: 25.5, uk: 7.5 },
    { mx: 16, us: 9, eu: 26, uk: 8 },
    { mx: 16.5, us: 9.5, eu: 27, uk: 8.5 },
    { mx: 17, us: 10, eu: 27.5, uk: 9 },
    { mx: 17.5, us: 10.5, eu: 28, uk: 9.5 },
    { mx: 18, us: 11, eu: 29, uk: 10 },
    { mx: 18.5, us: 11.5, eu: 29.5, uk: 10.5 },
    { mx: 19, us: 12, eu: 30.5, uk: 11 },
    { mx: 19.5, us: 12.5, eu: 31, uk: 11.5 },
    { mx: 20, us: 13, eu: 31.5, uk: 12 },
    { mx: 21, us: 1, eu: 33, uk: 13 },
    { mx: 22, us: 2, eu: 34, uk: 1 },
    { mx: 23, us: 3, eu: 35, uk: 2 },
  ],
};

interface ClothingRow { mx: string; us: string; int: string }
interface ClothingCategory { title: string; sizes: ClothingRow[] }

const CLOTHING_DATA: Record<string, ClothingCategory> = {
  'men-tops': {
    title: 'Camisas / Playeras Hombre',
    sizes: [
      { mx: 'XS (34)', us: 'XS (34)', int: 'XS' },
      { mx: 'S (36)', us: 'S (36)', int: 'S' },
      { mx: 'M (38-40)', us: 'M (38-40)', int: 'M' },
      { mx: 'L (42-44)', us: 'L (42-44)', int: 'L' },
      { mx: 'XL (46)', us: 'XL (46)', int: 'XL' },
      { mx: 'XXL (48)', us: 'XXL (48)', int: 'XXL' },
    ],
  },
  'women-tops': {
    title: 'Blusas / Tops Mujer',
    sizes: [
      { mx: '24 / XS', us: '0-2 / XS', int: 'XS' },
      { mx: '26 / S', us: '4 / S', int: 'S' },
      { mx: '28 / M', us: '6-8 / M', int: 'M' },
      { mx: '30 / L', us: '10 / L', int: 'L' },
      { mx: '32 / XL', us: '12 / XL', int: 'XL' },
      { mx: '34 / XXL', us: '14 / XXL', int: 'XXL' },
    ],
  },
  'men-pants': {
    title: 'Pantalones Hombre',
    sizes: [
      { mx: '28', us: '28', int: 'XS' },
      { mx: '30', us: '30', int: 'S' },
      { mx: '32', us: '32', int: 'M' },
      { mx: '34', us: '34', int: 'L' },
      { mx: '36', us: '36', int: 'XL' },
      { mx: '38', us: '38', int: 'XXL' },
    ],
  },
  'women-pants': {
    title: 'Pantalones Mujer',
    sizes: [
      { mx: '24', us: '0', int: 'XS' },
      { mx: '26', us: '2', int: 'XS-S' },
      { mx: '28', us: '4', int: 'S' },
      { mx: '30', us: '6', int: 'M' },
      { mx: '32', us: '8', int: 'M-L' },
      { mx: '34', us: '10', int: 'L' },
      { mx: '36', us: '12', int: 'XL' },
      { mx: '38', us: '14', int: 'XXL' },
    ],
  },
};

interface JerseyInfo { chest: string; rec: string; tip: string }

const JERSEY_DATA: Record<string, JerseyInfo> = {
  XS: { chest: '84–88', rec: '55–65 kg', tip: 'Si mides menos de 1.65m' },
  S: { chest: '88–96', rec: '65–72 kg', tip: 'La mas popular en Mexico' },
  M: { chest: '96–104', rec: '72–80 kg', tip: 'Fit comodo para la mayoria' },
  L: { chest: '104–112', rec: '80–90 kg', tip: 'Holgado y comodo' },
  XL: { chest: '112–124', rec: '90–100 kg', tip: 'Espacio extra generoso' },
  XXL: { chest: '124–136', rec: '100–115 kg', tip: 'La mas amplia disponible' },
};

const JERSEY_TABLE = [
  { size: 'XS', chest: '84–88', waist: '70–74', length: '68', weight: '55–65' },
  { size: 'S', chest: '88–96', waist: '74–82', length: '70', weight: '65–72' },
  { size: 'M', chest: '96–104', waist: '82–90', length: '72', weight: '72–80' },
  { size: 'L', chest: '104–112', waist: '90–98', length: '74', weight: '80–90' },
  { size: 'XL', chest: '112–124', waist: '98–110', length: '78', weight: '90–100' },
  { size: 'XXL', chest: '124–136', waist: '110–122', length: '82', weight: '100–115' },
];

const FAQ_ITEMS = [
  {
    question: '¿Como convierto mi talla de zapatos de Mexico a USA?',
    answer:
      'Las tallas de zapatos en Mexico usan el sistema centimetrico (cm). Para hombres: una talla MX 27 equivale a US 9. Para mujeres: una talla MX 24 equivale a US 7. Usa nuestro conversor arriba para encontrar tu equivalencia exacta.',
  },
  {
    question: '¿Que talla de jersey FIFA 2026 debo comprar?',
    answer:
      'Los jerseys FIFA usan tallas internacionales (S, M, L, XL). Si usas talla M en Mexico, generalmente es la misma M en jerseys FIFA. Para fit mas holgado (fan fit), pide tu talla normal. Para fit ajustado (player fit), considera una talla arriba si estas entre dos tallas.',
  },
  {
    question: '¿Las tallas de ropa en USA son iguales a Mexico?',
    answer:
      'No exactamente. En ropa de hombre, las tallas S/M/L suelen ser similares, pero las tallas numericas pueden variar. En ropa de mujer, la diferencia es mayor: una talla MX 28 equivale aproximadamente a US 4. Consulta nuestras tablas completas.',
  },
  {
    question: '¿Donde comprar jerseys del Mundial 2026 en USA?',
    answer:
      "Puedes comprar jerseys oficiales FIFA 2026 en Nike.com, Adidas.com, tiendas oficiales FIFA en las sedes, Dick's Sporting Goods, Soccer.com y Fanatics. Las tiendas en estadios tendran stock limitado durante los partidos.",
  },
  {
    question: '¿Es mejor comprar zapatos en Mexico o en USA?',
    answer:
      'Depende de la marca. Nike, Adidas y New Balance suelen ser mas baratos en USA, especialmente en outlets. Marcas mexicanas como Flexi son mas accesibles en Mexico. Tip: las tiendas outlet en USA (Premium Outlets) tienen descuentos de 30-70% todo el anio.',
  },
];

/* ============================================================
   COMPONENT
   ============================================================ */

type Tab = 'zapatos' | 'ropa' | 'jerseys';
type Gender = 'men' | 'women' | 'kids';
const GENDER_LABELS: Record<Gender, string> = { men: 'Hombre', women: 'Mujer', kids: 'Ninos' };
const TABLE_LABELS: Record<Gender, string> = { men: 'Zapatos Hombre', women: 'Zapatos Mujer', kids: 'Zapatos Ninos' };

export default function TallasPage() {
  const [tab, setTab] = useState<Tab>('zapatos');

  /* Shoe state */
  const [shoeGender, setShoeGender] = useState<Gender>('men');
  const [shoeDirection, setShoeDirection] = useState<'mx-to-us' | 'us-to-mx'>('mx-to-us');
  const [shoeSelected, setShoeSelected] = useState<string>('');

  /* Clothing state */
  const [clothingType, setClothingType] = useState<string>('men-tops');
  const [clothingDirection, setClothingDirection] = useState<'mx-to-us' | 'us-to-mx'>('mx-to-us');
  const [clothingSelected, setClothingSelected] = useState<string>('');

  /* Jersey state */
  const [jerseyMx, setJerseyMx] = useState<string>('');
  const [jerseyFit, setJerseyFit] = useState<'fan' | 'player'>('fan');

  /* ---- Shoe logic ---- */
  const shoeData = SHOE_DATA[shoeGender];

  const shoeOptions = useMemo(() => {
    return shoeData.map((d) => ({
      value: shoeDirection === 'mx-to-us' ? String(d.mx) : String(d.us),
      label: shoeDirection === 'mx-to-us' ? `${d.mx} cm` : `US ${d.us}`,
    }));
  }, [shoeData, shoeDirection]);

  const shoeMatch = useMemo(() => {
    if (!shoeSelected) return null;
    const v = parseFloat(shoeSelected);
    return shoeData.find((d) =>
      shoeDirection === 'mx-to-us' ? d.mx === v : d.us === v,
    ) ?? null;
  }, [shoeSelected, shoeData, shoeDirection]);

  const shoeTip = useMemo(() => {
    if (!shoeMatch) return null;
    if (shoeGender === 'men' && shoeMatch.us >= 10)
      return 'Tip: Tallas grandes (US 10+) pueden ser dificiles de encontrar en tiendas fisicas en Mexico. En USA hay mas variedad.';
    if (shoeGender === 'women' && shoeMatch.us >= 9)
      return 'Tip: Tallas grandes de mujer (US 9+) tienen mas opciones en tiendas de USA que en Mexico.';
    return null;
  }, [shoeMatch, shoeGender]);

  /* ---- Clothing logic ---- */
  const clothingSizes = CLOTHING_DATA[clothingType].sizes;

  const clothingOptions = useMemo(() => {
    return clothingSizes.map((d, i) => ({
      value: String(i),
      label: clothingDirection === 'mx-to-us' ? d.mx : d.us,
    }));
  }, [clothingSizes, clothingDirection]);

  const clothingMatch = useMemo(() => {
    if (clothingSelected === '') return null;
    const idx = parseInt(clothingSelected);
    return isNaN(idx) ? null : clothingSizes[idx] ?? null;
  }, [clothingSelected, clothingSizes]);

  /* ---- Jersey logic ---- */
  const jerseyResult = useMemo(() => {
    if (!jerseyMx) return null;
    const info = JERSEY_DATA[jerseyMx];
    if (!info) return null;
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    if (jerseyFit === 'player') {
      const idx = sizes.indexOf(jerseyMx);
      const recSize = idx < sizes.length - 1 ? `${jerseyMx} o ${sizes[idx + 1]}` : jerseyMx;
      const note =
        idx < sizes.length - 1
          ? 'El fit Player es mas ajustado. Si estas entre dos tallas, sube una.'
          : 'El fit Player es mas ajustado. XXL es la talla mas grande disponible.';
      return { recSize, note, info };
    }
    return {
      recSize: jerseyMx,
      note: 'El fit Fan es holgado y comodo. Tu talla normal funciona perfecto.',
      info,
    };
  }, [jerseyMx, jerseyFit]);

  /* ---- Reset selections on direction/type changes ---- */
  function swapShoe() {
    setShoeDirection((d) => (d === 'mx-to-us' ? 'us-to-mx' : 'mx-to-us'));
    setShoeSelected('');
  }
  function swapClothing() {
    setClothingDirection((d) => (d === 'mx-to-us' ? 'us-to-mx' : 'mx-to-us'));
    setClothingSelected('');
  }

  /* ---- Render helpers ---- */
  const tabBtn = (t: Tab, label: string) => (
    <button
      key={t}
      onClick={() => setTab(t)}
      className={`px-5 py-2.5 rounded-full text-[15px] font-semibold border-2 transition-all ${
        tab === t
          ? 'bg-wbx-black text-white border-wbx-black'
          : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400'
      }`}
    >
      {label}
    </button>
  );

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
      <section className="bg-gradient-to-br from-wbx-black to-neutral-800 text-white py-12 px-5 text-center">
        <h1 className="text-[clamp(28px,5vw,42px)] font-extrabold tracking-tighter leading-tight mb-3">
          Conversor de Tallas <span className="text-wbx-accent">MX ↔ USA</span>
        </h1>
        <p className="text-[17px] text-neutral-400 max-w-lg mx-auto">
          Zapatos, ropa y jerseys FIFA 2026. Encuentra tu talla exacta en segundos.
        </p>
      </section>

      <AdSlot />

      <div className="mx-auto mb-16 max-w-[900px] rounded-xl bg-wbx-soft px-4 py-8 text-wbx-ink sm:px-6">
        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {tabBtn('zapatos', 'Zapatos')}
          {tabBtn('ropa', 'Ropa')}
          {tabBtn('jerseys', 'Jerseys FIFA')}
        </div>

        {/* ======================== ZAPATOS ======================== */}
        {tab === 'zapatos' && (
          <>
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-end flex-wrap mb-5">
                {/* Gender */}
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                    Genero
                  </label>
                  <select
                    value={shoeGender}
                    onChange={(e) => {
                      setShoeGender(e.target.value as Gender);
                      setShoeSelected('');
                    }}
                    className="w-full p-3 border-2 border-neutral-200 rounded-lg text-base focus:border-wbx-accent focus:outline-none"
                  >
                    {(Object.keys(GENDER_LABELS) as Gender[]).map((g) => (
                      <option key={g} value={g}>
                        {GENDER_LABELS[g]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* From */}
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                    {shoeDirection === 'mx-to-us' ? 'Talla Mexico (cm)' : 'Talla USA'}
                  </label>
                  <select
                    value={shoeSelected}
                    onChange={(e) => setShoeSelected(e.target.value)}
                    className="w-full p-3 border-2 border-neutral-200 rounded-lg text-base focus:border-wbx-accent focus:outline-none"
                  >
                    <option value="">Selecciona...</option>
                    {shoeOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Swap */}
                <button
                  onClick={swapShoe}
                  className="w-11 h-11 rounded-full border-2 border-neutral-200 bg-white flex items-center justify-center text-xl shrink-0 hover:bg-wbx-accent hover:text-white hover:border-wbx-accent transition-all md:rotate-0 rotate-90"
                  title="Invertir"
                >
                  ⇄
                </button>

                {/* Result */}
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                    {shoeDirection === 'mx-to-us' ? 'Talla USA' : 'Talla Mexico (cm)'}
                  </label>
                  <div className="border-2 border-green-500 rounded-xl p-3 text-center bg-neutral-50">
                    <div className="text-4xl font-extrabold text-wbx-black leading-none">
                      {shoeMatch
                        ? shoeDirection === 'mx-to-us'
                          ? `US ${shoeMatch.us}`
                          : `${shoeMatch.mx} cm`
                        : '—'}
                    </div>
                    <div className="text-sm text-neutral-500 mt-1">
                      {shoeMatch
                        ? shoeDirection === 'mx-to-us'
                          ? `${shoeMatch.mx} cm MX = US ${shoeMatch.us} (EU ${shoeMatch.eu})`
                          : `US ${shoeMatch.us} = ${shoeMatch.mx} cm MX (EU ${shoeMatch.eu})`
                        : 'Selecciona tu talla'}
                    </div>
                  </div>
                </div>
              </div>

              {shoeTip && (
                <div className="p-3 bg-amber-50 rounded-lg text-sm text-amber-800">{shoeTip}</div>
              )}
            </div>

            {/* Shoe Table */}
            <div className="mb-10">
              <h2 className="text-2xl font-extrabold text-wbx-black mb-4">
                Tabla de Tallas &mdash; {TABLE_LABELS[shoeGender]}
              </h2>
              <div className="overflow-x-auto rounded-xl shadow">
                <table className="w-full border-collapse bg-white text-[15px]">
                  <thead>
                    <tr>
                      {['MX (cm)', 'USA', 'EU', 'UK'].map((h) => (
                        <th
                          key={h}
                          className="bg-wbx-black text-white py-3 px-4 text-center text-xs font-semibold uppercase tracking-wide"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {shoeData.map((d) => {
                      const hl = shoeMatch && shoeMatch.mx === d.mx;
                      return (
                        <tr key={d.mx} className="hover:bg-orange-50">
                          {[d.mx, d.us, d.eu, d.uk].map((v, i) => (
                            <td
                              key={i}
                              className={`py-3 px-4 text-center border-b border-neutral-100 ${
                                hl ? 'bg-orange-200 font-bold text-wbx-black' : ''
                              }`}
                            >
                              {v}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ======================== ROPA ======================== */}
        {tab === 'ropa' && (
          <>
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-end flex-wrap mb-5">
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                    Tipo
                  </label>
                  <select
                    value={clothingType}
                    onChange={(e) => {
                      setClothingType(e.target.value);
                      setClothingSelected('');
                    }}
                    className="w-full p-3 border-2 border-neutral-200 rounded-lg text-base focus:border-wbx-accent focus:outline-none"
                  >
                    {Object.entries(CLOTHING_DATA).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                    Talla Mexico
                  </label>
                  <select
                    value={clothingSelected}
                    onChange={(e) => setClothingSelected(e.target.value)}
                    className="w-full p-3 border-2 border-neutral-200 rounded-lg text-base focus:border-wbx-accent focus:outline-none"
                  >
                    <option value="">Selecciona...</option>
                    {clothingOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={swapClothing}
                  className="w-11 h-11 rounded-full border-2 border-neutral-200 bg-white flex items-center justify-center text-xl shrink-0 hover:bg-wbx-accent hover:text-white hover:border-wbx-accent transition-all md:rotate-0 rotate-90"
                  title="Invertir"
                >
                  ⇄
                </button>

                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                    Talla USA
                  </label>
                  <div className="border-2 border-green-500 rounded-xl p-3 text-center bg-neutral-50">
                    <div className="text-3xl font-extrabold text-wbx-black leading-none">
                      {clothingMatch
                        ? clothingDirection === 'mx-to-us'
                          ? clothingMatch.us
                          : clothingMatch.mx
                        : '—'}
                    </div>
                    <div className="text-sm text-neutral-500 mt-1">
                      {clothingMatch
                        ? clothingDirection === 'mx-to-us'
                          ? `MX ${clothingMatch.mx} = USA ${clothingMatch.us} (${clothingMatch.int})`
                          : `USA ${clothingMatch.us} = MX ${clothingMatch.mx} (${clothingMatch.int})`
                        : 'Selecciona tu talla'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clothing tables */}
            <div className="space-y-8 mb-10">
              <h2 className="text-2xl font-extrabold text-wbx-black">Tablas de Tallas &mdash; Ropa</h2>
              {Object.entries(CLOTHING_DATA).map(([key, cat]) => (
                <div key={key}>
                  <h3 className="text-lg font-bold mb-2">{cat.title}</h3>
                  <div className="overflow-x-auto rounded-xl shadow">
                    <table className="w-full border-collapse bg-white text-[15px]">
                      <thead>
                        <tr>
                          {['MX', 'USA', 'Internacional'].map((h) => (
                            <th
                              key={h}
                              className="bg-wbx-black text-white py-3 px-4 text-center text-xs font-semibold uppercase tracking-wide"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {cat.sizes.map((s, i) => (
                          <tr key={i} className="hover:bg-orange-50">
                            <td className="py-3 px-4 text-center border-b border-neutral-100">{s.mx}</td>
                            <td className="py-3 px-4 text-center border-b border-neutral-100">{s.us}</td>
                            <td className="py-3 px-4 text-center border-b border-neutral-100">{s.int}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ======================== JERSEYS ======================== */}
        {tab === 'jerseys' && (
          <>
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h3 className="text-base font-bold mb-1">Que fit prefieres?</h3>
              <p className="text-neutral-400 text-sm mb-4">
                Los jerseys FIFA 2026 vienen en dos fits. El &ldquo;Fan&rdquo; es holgado y comodo.
                El &ldquo;Player&rdquo; es ajustado como el de los jugadores.
              </p>

              <div className="flex flex-col md:flex-row gap-4 items-end flex-wrap">
                <div className="flex-1 min-w-[180px]">
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                    Tu talla de playera en Mexico
                  </label>
                  <select
                    value={jerseyMx}
                    onChange={(e) => setJerseyMx(e.target.value)}
                    className="w-full p-3 border-2 border-neutral-200 rounded-lg text-base focus:border-wbx-accent focus:outline-none"
                  >
                    <option value="">Selecciona...</option>
                    <option value="XS">XS / Extra Chica</option>
                    <option value="S">S / Chica</option>
                    <option value="M">M / Mediana</option>
                    <option value="L">L / Grande</option>
                    <option value="XL">XL / Extra Grande</option>
                    <option value="XXL">XXL / Doble Extra Grande</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[160px]">
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                    Fit
                  </label>
                  <select
                    value={jerseyFit}
                    onChange={(e) => setJerseyFit(e.target.value as 'fan' | 'player')}
                    className="w-full p-3 border-2 border-neutral-200 rounded-lg text-base focus:border-wbx-accent focus:outline-none"
                  >
                    <option value="fan">Fan (holgado)</option>
                    <option value="player">Player (ajustado)</option>
                  </select>
                </div>
              </div>

              {jerseyResult && (
                <div className="mt-4 border-2 border-green-500 rounded-xl p-5 text-center bg-neutral-50">
                  <div className="text-4xl font-extrabold text-wbx-black">{jerseyResult.recSize}</div>
                  <div className="text-sm text-neutral-500 mt-1">{jerseyResult.note}</div>
                  <div className="mt-2 text-xs text-neutral-400">
                    Pecho: {jerseyResult.info.chest} cm &middot; {jerseyResult.info.tip}
                  </div>
                </div>
              )}
            </div>

            {/* Jersey grid */}
            <div className="mb-10">
              <h2 className="text-2xl font-extrabold text-wbx-black mb-4">Guia de Tallas &mdash; Jerseys FIFA 2026</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {Object.entries(JERSEY_DATA).map(([size, info]) => (
                  <div
                    key={size}
                    className={`bg-white rounded-lg p-5 text-center shadow border-2 transition-all cursor-pointer ${
                      jerseyMx === size ? 'border-wbx-accent' : 'border-transparent hover:border-wbx-accent'
                    }`}
                    onClick={() => setJerseyMx(size)}
                  >
                    <div className="text-4xl font-extrabold text-wbx-black">{size}</div>
                    <div className="text-xs text-neutral-400 mt-1">Pecho: {info.chest} cm</div>
                    <div className="text-xs text-neutral-400">{info.rec}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jersey measurements table */}
            <div className="mb-10">
              <h2 className="text-2xl font-extrabold text-wbx-black mb-4">Tabla completa de medidas (cm)</h2>
              <div className="overflow-x-auto rounded-xl shadow">
                <table className="w-full border-collapse bg-white text-[15px]">
                  <thead>
                    <tr>
                      {['Talla', 'Pecho (cm)', 'Cintura (cm)', 'Largo (cm)', 'Peso sugerido (kg)'].map((h) => (
                        <th
                          key={h}
                          className="bg-wbx-black text-white py-3 px-4 text-center text-xs font-semibold uppercase tracking-wide"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {JERSEY_TABLE.map((r) => (
                      <tr key={r.size} className="hover:bg-orange-50">
                        <td className="py-3 px-4 text-center border-b border-neutral-100 font-bold">{r.size}</td>
                        <td className="py-3 px-4 text-center border-b border-neutral-100">{r.chest}</td>
                        <td className="py-3 px-4 text-center border-b border-neutral-100">{r.waist}</td>
                        <td className="py-3 px-4 text-center border-b border-neutral-100">{r.length}</td>
                        <td className="py-3 px-4 text-center border-b border-neutral-100">{r.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <AdSlot format="rectangle" />

        <FaqSection items={FAQ_ITEMS} />

        <AdSlot />
      </div>
    </>
  );
}
