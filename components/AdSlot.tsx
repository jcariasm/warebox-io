interface AdSlotProps {
  format?: 'leaderboard' | 'rectangle';
  className?: string;
}

export default function AdSlot({ format = 'leaderboard', className = '' }: AdSlotProps) {
  const h = format === 'rectangle' ? 'min-h-[250px]' : 'min-h-[90px]';
  const label = format === 'rectangle' ? 'Ad — Rectangle 300x250' : 'Ad — Leaderboard 728x90';

  return (
    <div
      className={`max-w-[728px] mx-auto ${h} bg-neutral-100 border border-dashed border-neutral-300 flex items-center justify-center text-neutral-400 text-xs rounded-lg my-5 ${className}`}
    >
      {label}
    </div>
  );
}
