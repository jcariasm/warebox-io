const allowed = [
  'Boleto o QR cargado antes de llegar',
  'Identificacion oficial o pasaporte',
  'Telefono y bateria externa pequena',
  'Tarjeta bancaria y algo de efectivo',
  'Bloqueador, gorra y lentes si el estadio es abierto',
  'Bolsa transparente si el venue la exige',
];

const blocked = [
  'Mochilas grandes o bolsas opacas grandes',
  'Botellas de vidrio o metal',
  'Aerosoles, bengalas o pirotecnia',
  'Tripies, selfie sticks grandes o equipo profesional',
  'Comida y bebida externa si el venue no la permite',
  'Objetos punzocortantes o herramientas',
];

export default function EstadioPage() {
  return (
    <section className="bg-wbx-black py-10 sm:py-14">
      <div className="wbx-container">
        <div className="mb-8">
          <h1 className="text-[clamp(32px,5vw,48px)] font-bold leading-tight text-white">Entrada al estadio</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-wbx-muted">
            Checklist general para llegar rapido. Las reglas finales dependen de cada estadio, partido y organizador.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <List title="Lleva" items={allowed} tone="up" />
          <List title="Evita" items={blocked} tone="down" />
        </div>
        <div className="mt-6 wbx-card-dark p-6">
          <h2 className="text-xl font-semibold text-white">Tip operativo</h2>
          <p className="mt-2 text-sm leading-7 text-wbx-muted">
            Guarda capturas del boleto, puerta, fila, asiento y mapa del estadio. Si el internet falla, llegar con todo precargado te salva tiempo.
          </p>
        </div>
      </div>
    </section>
  );
}

function List({ title, items, tone }: { title: string; items: string[]; tone: 'up' | 'down' }) {
  return (
    <div className="wbx-card-dark p-6">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 rounded-lg border border-wbx-elevated bg-wbx-black p-4 text-sm text-wbx-muted">
            <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${tone === 'up' ? 'bg-wbx-green' : 'bg-wbx-red'}`} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
