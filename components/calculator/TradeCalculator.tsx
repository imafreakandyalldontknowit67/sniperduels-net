'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Plus, Search, Trash2, ArrowRight } from 'lucide-react';
import type { SlimWeapon } from '@/lib/weapons';
import { rarityClasses, defaultPrice } from '@/lib/weapons';
import { formatGems } from '@/lib/values-filter';
import { shopLink } from '@/lib/config';

type Side = 'their' | 'yours';
type Row = { id: string; qty: number };

type Props = {
  weapons: SlimWeapon[];
};

const MAX_RESULTS = 10;
const MAX_QTY = 99;

function parseSideParam(s: string | null): Row[] {
  if (!s) return [];
  return s
    .split(',')
    .map(part => {
      const [id, q] = part.split(':');
      if (!id) return null;
      const qty = Math.max(1, Math.min(MAX_QTY, Math.floor(Number(q) || 1)));
      return { id: decodeURIComponent(id), qty } as Row;
    })
    .filter((r): r is Row => r !== null);
}

function encodeSide(rows: Row[]): string {
  return rows.map(r => `${encodeURIComponent(r.id)}:${r.qty}`).join(',');
}

export default function TradeCalculator({ weapons }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const byId = useMemo(() => {
    const m = new Map<string, SlimWeapon>();
    for (const w of weapons) m.set(w.id, w);
    return m;
  }, [weapons]);

  // The Weapon shape that defaultPrice expects matches SlimWeapon at the
  // fields it reads (defaultVariantIndex + variants), so we can pass directly.
  const priceFor = (id: string): number => {
    const w = byId.get(id);
    if (!w) return 0;
    // SlimWeapon is structurally compatible with the Weapon subset defaultPrice reads.
    return defaultPrice(w as unknown as Parameters<typeof defaultPrice>[0]);
  };

  const [their, setTheir] = useState<Row[]>(() => parseSideParam(searchParams.get('their')));
  const [yours, setYours] = useState<Row[]>(() => parseSideParam(searchParams.get('yours')));

  // Sync state → URL (replace, no scroll). Skip first run if both empty so we
  // don't bloat history when user just lands.
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      // Still run on first mount if there's existing state (no-op if not).
    }
    const params = new URLSearchParams();
    if (their.length) params.set('their', encodeSide(their));
    if (yours.length) params.set('yours', encodeSide(yours));
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [their, yours, pathname, router]);

  const theirTotal = useMemo(() => their.reduce((s, r) => s + priceFor(r.id) * r.qty, 0), [their, byId]);
  const yoursTotal = useMemo(() => yours.reduce((s, r) => s + priceFor(r.id) * r.qty, 0), [yours, byId]);
  const diff = yoursTotal - theirTotal;
  const youOwe = diff < 0 ? Math.abs(diff) : 0;

  function addRow(side: Side, id: string, qty: number) {
    const safeQty = Math.max(1, Math.min(MAX_QTY, Math.floor(qty) || 1));
    const setter = side === 'their' ? setTheir : setYours;
    setter(rows => {
      const existing = rows.findIndex(r => r.id === id);
      if (existing >= 0) {
        const next = rows.slice();
        next[existing] = { id, qty: Math.min(MAX_QTY, next[existing].qty + safeQty) };
        return next;
      }
      return [...rows, { id, qty: safeQty }];
    });
  }

  function removeRow(side: Side, idx: number) {
    const setter = side === 'their' ? setTheir : setYours;
    setter(rows => rows.filter((_, i) => i !== idx));
  }

  function updateQty(side: Side, idx: number, qty: number) {
    const safeQty = Math.max(1, Math.min(MAX_QTY, Math.floor(qty) || 1));
    const setter = side === 'their' ? setTheir : setYours;
    setter(rows => rows.map((r, i) => (i === idx ? { ...r, qty: safeQty } : r)));
  }

  function clearAll() {
    setTheir([]);
    setYours([]);
  }

  return (
    <div className="mt-2">
      <div className="grid gap-4 md:grid-cols-2">
        <SideColumn
          title="Their Offer"
          accent="blue"
          rows={their}
          weapons={weapons}
          byId={byId}
          priceFor={priceFor}
          onAdd={(id, qty) => addRow('their', id, qty)}
          onRemove={i => removeRow('their', i)}
          onQty={(i, q) => updateQty('their', i, q)}
        />
        <SideColumn
          title="Your Offer"
          accent="gold"
          rows={yours}
          weapons={weapons}
          byId={byId}
          priceFor={priceFor}
          onAdd={(id, qty) => addRow('yours', id, qty)}
          onRemove={i => removeRow('yours', i)}
          onQty={(i, q) => updateQty('yours', i, q)}
        />
      </div>

      {/* Summary */}
      <div className="mt-6 border-[3px] border-dark-500 bg-dark-700 p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-pixel-blue-light">Their Total</div>
            <div className="text-2xl font-black text-white sm:text-3xl">{formatGems(theirTotal) === '—' ? '0' : formatGems(theirTotal)} <span className="text-base text-gray-400">g</span></div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-accent">Your Total</div>
            <div className="text-2xl font-black text-white sm:text-3xl">{formatGems(yoursTotal) === '—' ? '0' : formatGems(yoursTotal)} <span className="text-base text-gray-400">g</span></div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Difference</div>
            {diff === 0 ? (
              <div className="text-2xl font-black text-gray-300 sm:text-3xl">Even</div>
            ) : diff > 0 ? (
              <div className="text-2xl font-black text-emerald-400 sm:text-3xl">
                +{formatGems(diff)} <span className="text-base text-emerald-300">g advantage</span>
              </div>
            ) : (
              <div className="text-2xl font-black text-red-400 sm:text-3xl">
                −{formatGems(Math.abs(diff))} <span className="text-base text-red-300">g short</span>
              </div>
            )}
          </div>
        </div>

        {youOwe > 0 && (
          <div className="mt-5 flex flex-col gap-3 border-t border-dark-600 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-300">
              <span className="font-bold text-white">Owe {formatGems(youOwe)} gems?</span> Top up the
              difference on sniperduels.shop and balance the trade.
            </div>
            <a
              href={`${shopLink('/gems', 'value-calculator')}&utm_content=${youOwe}`}
              target="_blank"
              rel="noopener"
              className="pixel-btn-press inline-flex items-center justify-center gap-2 whitespace-nowrap border-[3px] border-accent bg-accent/15 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-accent hover:bg-accent/25 hover:no-underline"
            >
              Buy {formatGems(youOwe)} gems for this trade
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {(their.length > 0 || yours.length > 0) && (
          <div className="mt-4 flex items-center justify-end border-t border-dark-600 pt-4">
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-accent"
            >
              Clear both sides
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SideColumn -------------------------------------------------------------

type SideProps = {
  title: string;
  accent: 'blue' | 'gold';
  rows: Row[];
  weapons: SlimWeapon[];
  byId: Map<string, SlimWeapon>;
  priceFor: (id: string) => number;
  onAdd: (id: string, qty: number) => void;
  onRemove: (idx: number) => void;
  onQty: (idx: number, q: number) => void;
};

function SideColumn({ title, accent, rows, weapons, byId, priceFor, onAdd, onRemove, onQty }: SideProps) {
  const [query, setQuery] = useState('');
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out: SlimWeapon[] = [];
    for (const w of weapons) {
      if (w.displayName.toLowerCase().includes(q) || w.weaponType.toLowerCase().includes(q)) {
        out.push(w);
        if (out.length >= MAX_RESULTS) break;
      }
    }
    return out;
  }, [query, weapons]);

  // Close dropdown on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function pick(id: string) {
    onAdd(id, qty);
    setQuery('');
    setQty(1);
    setOpen(false);
  }

  const subtotal = rows.reduce((s, r) => s + priceFor(r.id) * r.qty, 0);
  const borderClass = accent === 'gold' ? 'border-accent/60' : 'border-pixel-blue-light/40';
  const titleClass = accent === 'gold' ? 'text-accent' : 'text-pixel-blue-light';

  return (
    <div className={`border-[3px] ${borderClass} bg-dark-700 p-4`}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className={`text-sm font-bold uppercase tracking-wider sm:text-base ${titleClass}`}>{title}</h2>
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{rows.length} item{rows.length === 1 ? '' : 's'}</span>
      </div>

      {/* Picker */}
      <div ref={wrapRef} className="relative mb-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              placeholder="Search items by name…"
              aria-label={`Search items to add to ${title}`}
              className="w-full border-[3px] border-dark-500 bg-dark-800 py-2 pl-10 pr-3 text-sm font-bold uppercase tracking-wider text-white placeholder:font-bold placeholder:text-gray-500 focus:border-accent focus:outline-none"
            />
          </div>
          <input
            type="number"
            min={1}
            max={MAX_QTY}
            value={qty}
            onChange={e => setQty(Math.max(1, Math.min(MAX_QTY, Math.floor(Number(e.target.value) || 1))))}
            aria-label="Quantity"
            className="w-full border-[3px] border-dark-500 bg-dark-800 px-3 py-2 text-sm font-bold uppercase tracking-wider text-white focus:border-accent focus:outline-none sm:w-20"
          />
        </div>

        {open && results.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-72 overflow-y-auto border-[3px] border-dark-500 bg-dark-800 shadow-lg">
            {results.map(w => {
              const p = priceFor(w.id);
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => pick(w.id)}
                  className="flex w-full items-center gap-3 border-b border-dark-700 px-3 py-2 text-left hover:bg-dark-700"
                >
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden bg-dark-900">
                    {w.imagePath ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={w.imagePath} alt="" width={40} height={40} loading="lazy" decoding="async" className="h-full w-full object-contain p-0.5" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block border-[2px] px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider ${rarityClasses(w.rarity)}`}>
                        {w.rarity}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500">{w.weaponType}</span>
                    </div>
                    <div className="truncate text-sm font-bold text-white">{w.displayName}</div>
                  </div>
                  <div className="flex-shrink-0 text-sm font-black text-accent">{p > 0 ? `${formatGems(p)} g` : '—'}</div>
                </button>
              );
            })}
          </div>
        )}

        {open && query.trim() && results.length === 0 && (
          <div className="absolute left-0 right-0 top-full z-30 mt-1 border-[3px] border-dark-500 bg-dark-800 px-3 py-3 text-xs text-gray-500">
            No items match &quot;{query}&quot;.
          </div>
        )}
      </div>

      {/* Rows */}
      {rows.length === 0 ? (
        <div className="border-[3px] border-dashed border-dark-500 bg-dark-800/50 px-4 py-8 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
          <Plus className="mx-auto mb-2 h-5 w-5 text-gray-600" />
          Search above to add items
        </div>
      ) : (
        <ul className="space-y-2">
          {rows.map((r, i) => {
            const w = byId.get(r.id);
            const unit = priceFor(r.id);
            const line = unit * r.qty;
            return (
              <li key={`${r.id}-${i}`} className="flex items-center gap-2 border-[3px] border-dark-500 bg-dark-800 p-2">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden bg-dark-900">
                  {w?.imagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={w.imagePath} alt="" width={40} height={40} loading="lazy" decoding="async" className="h-full w-full object-contain p-0.5" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-white">{w?.displayName ?? r.id}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {unit > 0 ? `${formatGems(unit)} g each` : 'No value'}
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  max={MAX_QTY}
                  value={r.qty}
                  onChange={e => onQty(i, Number(e.target.value))}
                  aria-label={`Quantity of ${w?.displayName ?? r.id}`}
                  className="w-14 border-[2px] border-dark-500 bg-dark-900 px-2 py-1 text-center text-sm font-bold text-white focus:border-accent focus:outline-none"
                />
                <div className="w-16 flex-shrink-0 text-right text-sm font-black text-accent">
                  {line > 0 ? `${formatGems(line)}g` : '—'}
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  aria-label={`Remove ${w?.displayName ?? r.id}`}
                  className="flex-shrink-0 p-1 text-gray-500 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-dark-600 pt-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Subtotal</span>
        <span className={`text-lg font-black ${titleClass}`}>
          {subtotal > 0 ? `${formatGems(subtotal)} g` : '0 g'}
        </span>
      </div>
    </div>
  );
}
