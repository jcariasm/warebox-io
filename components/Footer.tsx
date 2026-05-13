import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-wbx-black text-neutral-500 text-center py-8 px-5 text-sm">
      <p>
        <strong className="text-neutral-300">warebox.io</strong> &mdash; Herramientas simples para viajeros inteligentes
      </p>
      <p className="mt-2">
        Un proyecto de{' '}
        <a href="https://rebelsites.com" target="_blank" rel="noopener noreferrer" className="text-wbx-accent hover:underline">
          Rebel Sites Network
        </a>{' '}
        para el FIFA World Cup 2026
      </p>
      <div className="mt-3 text-xs text-neutral-600 flex justify-center gap-4">
        <Link href="/">Inicio</Link>
        <Link href="/tallas">Tallas</Link>
        <Link href="/propinas">Propinas</Link>
      </div>
    </footer>
  );
}
