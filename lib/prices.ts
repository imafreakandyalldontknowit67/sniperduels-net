// Read-only access to data/prices.json (built by scripts/fetch-prices.mjs).
// Returns null fields when the file is missing or stale → callers fall back
// to the static "Pricing tiers" copy.

import data from '@/data/prices.json';

export type PriceData = {
  fetchedAt: string;
  source: string;
  fetchedOk: boolean;
  cheapestPerK: number | null;
  cheapestBulkPerK: number | null;
  platformInStock: boolean;
  totalStockK: number;
  vendorCount: number;
  listings: unknown[];
};

const STALE_MS = 6 * 60 * 60 * 1000; // 6h

export function getPrices(): PriceData | null {
  const d = data as PriceData;
  if (!d || !d.fetchedOk) return null;
  // Cloudflare returns a stub `{users:[], orders:[], items:[], total:0}` for some
  // IPs — fetchedOk is true but listings are empty. Treat empty as "no real data".
  if (!d.listings || d.listings.length === 0) return null;
  if (d.cheapestPerK == null) return null;
  const ageMs = Date.now() - new Date(d.fetchedAt).getTime();
  if (ageMs > STALE_MS) return null;
  return d;
}

export function formatUsd(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return '—';
  return `$${n.toFixed(2)}`;
}
