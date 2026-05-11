'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import type { Weapon } from '@/lib/weapons';
import {
  applyFilters,
  applySort,
  EMPTY_FILTERS,
  type FilterState,
  type SortKey,
  uniqueValues,
  uniqueRarities,
  uniqueDemands,
} from '@/lib/values-filter';
import WeaponCard from './WeaponCard';
import SearchBar from './SearchBar';
import SortSelect from './SortSelect';
import FilterChipGroup from './FilterChipGroup';
import Pagination from './Pagination';

const PAGE_SIZE = 24;

type Props = {
  weapons: Weapon[];
  /** Lower-case label like "snipers", "knives", "items" — used in copy + URL placeholders */
  label?: string;
};

function decodeSet(s: string | null): Set<string> {
  if (!s) return new Set();
  return new Set(s.split(',').map(decodeURIComponent).filter(Boolean));
}

function encodeSet(set: Set<string>): string {
  return Array.from(set).map(encodeURIComponent).join(',');
}

export default function ValuesBrowser({ weapons, label = 'items' }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>(() => {
    const f = EMPTY_FILTERS();
    f.search = searchParams.get('q') ?? '';
    f.weaponTypes = decodeSet(searchParams.get('type'));
    f.rarities = decodeSet(searchParams.get('rarity'));
    f.crates = decodeSet(searchParams.get('crate'));
    f.demands = decodeSet(searchParams.get('demand'));
    f.sort = (searchParams.get('sort') as SortKey) ?? 'rarity-desc';
    return f;
  });
  const [page, setPage] = useState(() => Math.max(1, Number(searchParams.get('p')) || 1));
  const [showFilters, setShowFilters] = useState(false);

  // Sync state → URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('q', filters.search);
    if (filters.weaponTypes.size) params.set('type', encodeSet(filters.weaponTypes));
    if (filters.rarities.size) params.set('rarity', encodeSet(filters.rarities));
    if (filters.crates.size) params.set('crate', encodeSet(filters.crates));
    if (filters.demands.size) params.set('demand', encodeSet(filters.demands));
    if (filters.sort && filters.sort !== 'rarity-desc') params.set('sort', filters.sort);
    if (page > 1) params.set('p', String(page));
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [filters, page, pathname, router]);

  const allWeaponTypes = useMemo(() => uniqueValues(weapons, w => w.weaponType), [weapons]);
  const allRarities = useMemo(() => uniqueRarities(weapons), [weapons]);
  const allCrates = useMemo(() => uniqueValues(weapons, w => w.crate), [weapons]);
  const allDemands = useMemo(() => uniqueDemands(weapons).filter(d => d.toLowerCase() !== 'unknown'), [weapons]);

  const filtered = useMemo(() => applySort(applyFilters(weapons, filters), filters.sort), [weapons, filters]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const hasActiveFilters =
    filters.search.length > 0 ||
    filters.weaponTypes.size > 0 ||
    filters.rarities.size > 0 ||
    filters.crates.size > 0 ||
    filters.demands.size > 0;

  function toggleSet(key: 'weaponTypes' | 'rarities' | 'crates' | 'demands', v: string) {
    setFilters(f => {
      const next = new Set(f[key]);
      if (next.has(v)) next.delete(v); else next.add(v);
      return { ...f, [key]: next };
    });
    setPage(1);
  }

  function clearAll() {
    setFilters(EMPTY_FILTERS());
    setPage(1);
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <SearchBar
          value={filters.search}
          onChange={s => {
            setFilters(f => ({ ...f, search: s }));
            setPage(1);
          }}
          placeholder={`Search ${label} by name…`}
        />
        <button
          type="button"
          onClick={() => setShowFilters(o => !o)}
          className={`pixel-btn-press inline-flex items-center justify-center gap-2 border-[3px] px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
            showFilters || hasActiveFilters
              ? 'border-accent bg-accent/15 text-accent'
              : 'border-dark-500 bg-dark-800 text-gray-300 hover:border-accent/60 hover:text-white'
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 rounded-sm bg-accent px-1.5 py-0.5 text-[9px] text-dark-900">
              {filters.weaponTypes.size + filters.rarities.size + filters.crates.size + filters.demands.size}
            </span>
          )}
        </button>
        <SortSelect value={filters.sort} onChange={s => setFilters(f => ({ ...f, sort: s }))} />
      </div>

      {/* Result count + clear */}
      <div className="mb-4 flex items-center justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-gray-400">
          {filtered.length} {label}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent hover:underline"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mb-6 border-[3px] border-dark-500 bg-dark-700 p-4">
          <FilterChipGroup
            label="Weapon Type"
            options={allWeaponTypes}
            selected={filters.weaponTypes}
            onToggle={v => toggleSet('weaponTypes', v)}
          />
          <FilterChipGroup
            label="Rarity"
            options={allRarities}
            selected={filters.rarities}
            onToggle={v => toggleSet('rarities', v)}
          />
          <FilterChipGroup
            label="Crate"
            options={allCrates}
            selected={filters.crates}
            onToggle={v => toggleSet('crates', v)}
          />
          <FilterChipGroup
            label="Demand"
            options={allDemands}
            selected={filters.demands}
            onToggle={v => toggleSet('demands', v)}
          />
        </div>
      )}

      {/* Grid */}
      {slice.length === 0 ? (
        <div className="border-[3px] border-dark-500 bg-dark-700 p-10 text-center text-sm text-gray-500">
          No {label} match those filters.{' '}
          {hasActiveFilters && (
            <button onClick={clearAll} className="text-accent hover:underline">Clear filters</button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {slice.map((w, i) => (
            <WeaponCard key={w.id} weapon={w} priority={i < 6 && safePage === 1} />
          ))}
        </div>
      )}

      <Pagination page={safePage} totalPages={totalPages} onPage={p => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
    </div>
  );
}
