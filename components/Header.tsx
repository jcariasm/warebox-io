'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-wbx-elevated bg-wbx-black/95 px-5 py-3 text-white backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between">
        <Link href="/" className="text-xl font-extrabold tracking-normal">
          ware<span className="text-wbx-accent">box</span>.io
        </Link>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md border border-wbx-elevated bg-wbx-card text-lg text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          {menuOpen ? 'x' : '='}
        </button>

        <nav className="hidden items-center gap-6 text-sm font-medium text-wbx-muted md:flex">
          <Link href="/tallas" className="transition-colors hover:text-white">
            Tallas
          </Link>
          <Link href="/propinas" className="transition-colors hover:text-white">
            Propinas
          </Link>
          <Link href="/propinas" className="wbx-button-primary ml-2">
            Abrir app
          </Link>
        </nav>
      </div>

      {menuOpen && (
        <nav className="absolute left-0 right-0 top-[65px] z-50 flex flex-col gap-2 border-b border-wbx-elevated bg-wbx-black p-5 text-sm text-white md:hidden">
          <Link href="/tallas" className="rounded-lg bg-wbx-card px-4 py-3" onClick={() => setMenuOpen(false)}>
            Tallas
          </Link>
          <Link href="/propinas" className="rounded-lg bg-wbx-card px-4 py-3" onClick={() => setMenuOpen(false)}>
            Propinas
          </Link>
          <Link href="/propinas" className="wbx-button-primary mt-3" onClick={() => setMenuOpen(false)}>
            Abrir app
          </Link>
        </nav>
      )}
    </header>
  );
}
