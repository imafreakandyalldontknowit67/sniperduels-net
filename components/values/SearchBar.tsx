'use client';

import { Search } from 'lucide-react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = 'Search by name…' }: Props) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search weapons"
        className="w-full border-[3px] border-dark-500 bg-dark-800 py-2.5 pl-10 pr-3 text-sm font-bold uppercase tracking-wider text-white placeholder:font-bold placeholder:text-gray-500 focus:border-accent focus:outline-none"
      />
    </div>
  );
}
