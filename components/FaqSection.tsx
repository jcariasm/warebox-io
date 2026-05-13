'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold text-wbx-black mb-4 tracking-tight">Preguntas Frecuentes</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full flex justify-between items-center px-5 py-4 text-left font-bold text-[15px]"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <span>{item.question}</span>
              <span className="text-xl text-neutral-400 ml-4 shrink-0">{openIdx === i ? '−' : '+'}</span>
            </button>
            <div
              className={`px-5 text-[15px] text-neutral-500 leading-relaxed transition-all duration-300 overflow-hidden ${
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
