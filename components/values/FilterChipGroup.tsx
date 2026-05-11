'use client';

type Props = {
  label: string;
  options: string[];
  selected: Set<string>;
  onToggle: (value: string) => void;
};

export default function FilterChipGroup({ label, options, selected, onToggle }: Props) {
  if (options.length === 0) return null;
  return (
    <div className="mb-4">
      <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map(opt => {
          const isOn = selected.has(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`pixel-btn-press border-[2px] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                isOn
                  ? 'border-accent bg-accent/20 text-accent'
                  : 'border-dark-500 bg-dark-800 text-gray-300 hover:border-accent/60 hover:text-white'
              }`}
              aria-pressed={isOn}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
