'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-semibold tracking-normal text-white">Preguntas frecuentes</h2>
      <div className="overflow-hidden rounded-xl border border-wbx-elevated bg-wbx-card">
        {items.map((item, i) => (
          <div key={i} className="border-b border-wbx-elevated last:border-b-0">
            <button
              className="flex w-full items-center justify-between px-5 py-5 text-left text-[15px] font-semibold text-white"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <span>{item.question}</span>
              <span className="ml-4 shrink-0 text-xl text-wbx-accent">{openIdx === i ? '-' : '+'}</span>
            </button>
            <div
              className={`overflow-hidden px-5 text-[15px] leading-relaxed text-wbx-muted transition-all duration-300 ${
                openIdx === i ? 'max-h-80 pb-4' : 'max-h-0'
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
