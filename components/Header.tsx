'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-wbx-black text-wbx-white px-5 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-extrabold tracking-tight">
        ware<span className="text-wbx-accent">box</span>.io
      </Link>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-neutral-300 text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-5 text-sm text-neutral-400">
        <Link href="/tallas" className="hover:text-white transition-colors">Tallas</Link>
        <Link href="/propinas" className="hover:text-white transition-colors">Propinas</Link>
      </nav>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="absolute top-14 left-0 right-0 bg-wbx-black z-50 flex flex-col items-center gap-4 py-6 text-sm text-neutral-400 md:hidden">
          <Link href="/tallas" className="hover:text-white" onClick={() => setMenuOpen(false)}>Tallas</Link>
          <Link href="/propinas" className="hover:text-white" onClick={() => setMenuOpen(false)}>Propinas</Link>
        </nav>
      )}
    </header>
  );
}
