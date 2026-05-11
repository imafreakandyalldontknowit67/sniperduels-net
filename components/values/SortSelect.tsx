'use client';

import type { SortKey } from '@/lib/values-filter';

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'rarity-desc', label: 'Rarity (High → Low)' },
  { value: 'rarity-asc',  label: 'Rarity (Low → High)' },
  { value: 'value-desc',  label: 'Value (High → Low)' },
  { value: 'value-asc',   label: 'Value (Low → High)' },
  { value: 'name-asc',    label: 'Name (A → Z)' },
  { value: 'name-desc',   label: 'Name (Z → A)' },
];

type Props = {
  value: SortKey;
  onChange: (v: SortKey) => void;
};

export default function SortSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as SortKey)}
      aria-label="Sort"
      className="border-[3px] border-dark-500 bg-dark-800 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white focus:border-accent focus:outline-none"
    >
      {OPTIONS.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
