'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
};

function buildPageList(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set<number>([1, 2, total - 1, total, current - 1, current, current + 1]);
  const ordered = Array.from(set).filter(n => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | 'gap')[] = [];
  ordered.forEach((n, i) => {
    if (i > 0 && n - (ordered[i - 1] as number) > 1) out.push('gap');
    out.push(n);
  });
  return out;
}

export default function Pagination({ page, totalPages, onPage }: Props) {
  if (totalPages <= 1) return null;
  const pages = buildPageList(page, totalPages);
  return (
    <nav className="mt-6 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="btn-icon h-9 min-w-[36px] px-1 text-xs disabled:opacity-30 disabled:hover:border-dark-500 disabled:hover:text-pixel-blue-light"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p, i) =>
        p === 'gap' ? (
          <span key={`g${i}`} className="px-1 text-xs text-gray-500">…</span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPage(p)}
            className={`pixel-btn-press h-9 min-w-[36px] border-[2px] px-2 text-xs font-bold ${
              p === page
                ? 'border-accent bg-accent text-dark-900'
                : 'border-dark-500 bg-dark-800 text-gray-300 hover:border-accent/60 hover:text-white'
            }`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="btn-icon h-9 min-w-[36px] px-1 text-xs disabled:opacity-30 disabled:hover:border-dark-500 disabled:hover:text-pixel-blue-light"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
