interface AdSlotProps {
  format?: 'leaderboard' | 'rectangle';
  className?: string;
}

export default function AdSlot({ format = 'leaderboard', className = '' }: AdSlotProps) {
  const h = format === 'rectangle' ? 'min-h-[250px]' : 'min-h-[90px]';
  const label = format === 'rectangle' ? 'Ad - Rectangle 300x250' : 'Ad - Leaderboard 728x90';

  return (
    <div
      className={`mx-auto flex max-w-[728px] items-center justify-center rounded-lg border border-dashed border-wbx-elevated bg-wbx-card text-xs text-wbx-muted ${h} my-5 ${className}`}
    >
      {label}
    </div>
  );
}
