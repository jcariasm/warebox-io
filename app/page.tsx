import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Warebox.io - Travel tools para mexicanos | FIFA 2026',
  description:
    'Herramientas de viaje para mexicanos que van al Mundial FIFA 2026 en Mexico, Estados Unidos y Canada.',
  alternates: { canonical: 'https://warebox.io' },
};

const tools = [
  {
    href: '/moneda',
    title: 'Moneda MXN / USD / CAD',
    desc: 'Convierte gastos entre los tres paises sede con tipos de cambio editables.',
    metric: '3',
    label: 'monedas',
  },
  {
    href: '/impuestos',
    title: 'Tax de compra',
    desc: 'Calcula el precio final con sales tax o HST segun la sede.',
    metric: '+tax',
    label: 'checkout',
  },
  {
    href: '/tallas',
    title: 'Tallas MX / USA',
    desc: 'Zapatos, ropa y jerseys FIFA 2026 con equivalencias listas para comprar.',
    metric: '24-32',
    label: 'cm MX',
  },
  {
    href: '/propinas',
    title: 'Propinas en USA',
    desc: 'Restaurantes, bares, taxis y hoteles con total, split y equivalente en MXN.',
    metric: '18-22%',
    label: 'mesa',
  },
  {
    href: '/checklist',
    title: 'Checklist de viaje',
    desc: 'Documentos, boleto, power bank, hotel, seguro y medicinas.',
    metric: '13',
    label: 'items',
  },
  {
    href: '/estadio',
    title: 'Entrada al estadio',
    desc: 'Que llevar, que evitar y como llegar con el QR listo.',
    metric: 'QR',
    label: 'ready',
  },
  {
    href: '/horarios',
    title: 'Horarios por sede',
    desc: 'Convierte horarios entre Mexico, Pacifico, Centro y Este.',
    metric: '4',
    label: 'zonas',
  },
  {
    href: '/medidas',
    title: 'Medidas de viaje',
    desc: 'Millas, kilometros, galones, litros, temperatura y equipaje.',
    metric: '8',
    label: 'convers.',
  },
];

const cityRows = [
  { city: 'Los Angeles', use: 'Jerseys y outlets', signal: '+34%', tone: 'up' },
  { city: 'Dallas', use: 'Rentas, restaurantes', signal: '+21%', tone: 'up' },
  { city: 'Miami', use: 'Taxis, hoteles, bares', signal: '+18%', tone: 'up' },
  { city: 'New York / New Jersey', use: 'Propinas altas', signal: '+27%', tone: 'up' },
  { city: 'Seattle', use: 'Outdoor y traslados', signal: '-6%', tone: 'down' },
];

const checklist = ['Talla de tenis', 'Talla de jersey', 'Tip default', 'Split de cuenta', 'MXN aprox.'];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-wbx-elevated bg-wbx-black py-14 sm:py-20">
        <div className="wbx-container grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 className="max-w-3xl text-[clamp(38px,7vw,64px)] font-bold leading-[1.05] tracking-normal text-white">
              Viaja preparado al Mundial 2026
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-wbx-muted sm:text-lg">
              Warebox convierte las dudas de viaje por Mexico, Estados Unidos y Canada en decisiones rapidas: que talla comprar, cuanto dejar de propina y como aterrizar cada gasto en pesos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/moneda" className="wbx-button-primary">
                Abrir herramientas
              </Link>
              <Link href="/tallas" className="wbx-button-secondary-dark">
                Convertir tallas
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              <div>
                <div className="wbx-number text-3xl font-bold text-wbx-accent">8</div>
                <div className="mt-1 text-xs text-wbx-muted">tools activos</div>
              </div>
              <div>
                <div className="wbx-number text-3xl font-bold text-wbx-accent">3</div>
                <div className="mt-1 text-xs text-wbx-muted">paises sede</div>
              </div>
              <div>
                <div className="wbx-number text-3xl font-bold text-wbx-accent">4</div>
                <div className="mt-1 text-xs text-wbx-muted">zonas horario</div>
              </div>
            </div>
          </div>

          <div className="wbx-card-dark p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Travel command center</h2>
                <p className="mt-1 text-sm text-wbx-muted">Herramientas de bolsillo para comprar, comer y moverte.</p>
              </div>
              <span className="rounded-full bg-wbx-accent px-3 py-1 text-xs font-semibold text-wbx-ink">PWA ready</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="rounded-lg border border-wbx-elevated bg-wbx-black p-4 transition-colors hover:bg-wbx-elevated">
                  <div className="wbx-number text-3xl font-bold text-wbx-accent">{tool.metric}</div>
                  <div className="mt-1 text-xs font-semibold uppercase text-wbx-muted">{tool.label}</div>
                  <h3 className="mt-5 text-base font-semibold text-white">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-wbx-muted">{tool.desc}</p>
                </Link>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-wbx-elevated bg-wbx-black p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Checklist rapido</h3>
                <span className="wbx-number text-sm text-wbx-green">5/5</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {checklist.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-wbx-muted">
                    <span className="h-2 w-2 rounded-full bg-wbx-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="wbx-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-[clamp(30px,4vw,40px)] font-semibold leading-tight text-white">
              Una app pequena para decisiones de alto roce
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-wbx-muted">
              El sitio responsivo trae SEO. La web app trae recurrencia: se abre en aeropuertos, tiendas, restaurantes, estadios y traslados entre sedes.
            </p>
          </div>
          <div className="wbx-card-dark overflow-hidden">
            <div className="grid grid-cols-[1.2fr_1fr_0.6fr] border-b border-wbx-elevated px-4 py-3 text-xs font-semibold uppercase text-wbx-muted">
              <span>Sede 2026</span>
              <span>Uso probable</span>
              <span className="text-right">Senal</span>
            </div>
            {cityRows.map((row) => (
              <div key={row.city} className="grid grid-cols-[1.2fr_1fr_0.6fr] items-center border-b border-wbx-elevated px-4 py-4 last:border-b-0">
                <div className="font-semibold text-white">{row.city}</div>
                <div className="text-sm text-wbx-muted">{row.use}</div>
                <div className={`wbx-number text-right text-sm font-semibold ${row.tone === 'up' ? 'text-wbx-green' : 'text-wbx-red'}`}>
                  {row.signal}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="wbx-container">
          <div className="wbx-card-dark grid gap-6 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <h2 className="text-3xl font-semibold text-white">Tools simples. Uso real durante el viaje.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-wbx-muted">
                La primera version ya cubre dinero, compras, medidas, horarios, estadio y checklist. El siguiente paso natural es wallet de boletos y reservas.
              </p>
            </div>
            <Link href="/checklist" className="wbx-button-primary">
              Preparar checklist
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
