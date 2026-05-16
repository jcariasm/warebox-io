import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-wbx-soft px-5 py-12 text-sm text-wbx-ink">
      <div className="mx-auto grid max-w-[1280px] gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-xl font-extrabold tracking-normal text-wbx-ink">
            <img src="/warebox-logo-positive.svg" alt="Warebox.io" className="h-8 w-auto sm:h-9" />
          </Link>
          <p className="mt-3 max-w-sm text-wbx-muted">
            Herramientas simples para viajeros mexicanos que quieren llegar preparados a las sedes de FIFA 2026.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Tools</h3>
          <div className="mt-3 flex flex-col gap-2 text-wbx-muted">
            <Link href="/moneda">Moneda</Link>
            <Link href="/impuestos">Impuestos de compra</Link>
            <Link href="/tallas">Conversor de tallas</Link>
            <Link href="/propinas">Calculadora de propinas</Link>
            <Link href="/simuladores">Simuladores</Link>
            <Link href="/medidas">Medidas</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Viaje</h3>
          <div className="mt-3 flex flex-col gap-2 text-wbx-muted">
            <span>Restaurantes</span>
            <span>Compras</span>
            <span>Estadios</span>
            <Link href="/checklist">Checklist</Link>
            <Link href="/horarios">Horarios por sede</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Network</h3>
          <p className="mt-3 text-wbx-muted">
            Un proyecto de{' '}
            <a
              href="https://rebelsites.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wbx-ink underline decoration-wbx-accent underline-offset-4"
            >
              Rebel Sites Network
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
