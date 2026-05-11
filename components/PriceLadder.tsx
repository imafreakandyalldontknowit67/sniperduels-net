import { GEM_PRICING } from '@/lib/config';

export default function PriceLadder() {
  return (
    <div className="overflow-hidden rounded-lg border border-dark-500 bg-dark-800">
      <div className="border-b border-dark-600 bg-dark-700/50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
        Live gem prices
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-600 text-xs uppercase tracking-wider text-gray-500">
            <th className="px-5 py-2 text-left">Quantity</th>
            <th className="px-5 py-2 text-right">Rate</th>
            <th className="hidden px-5 py-2 text-right md:table-cell">You save</th>
          </tr>
        </thead>
        <tbody>
          {GEM_PRICING.map((p, i) => (
            <tr
              key={p.tier}
              className={`border-b border-dark-700 last:border-0 ${p.highlight ? 'bg-accent/5' : ''}`}
            >
              <td className="px-5 py-3 font-medium">
                {p.tier}
                {p.highlight && <span className="ml-2 price-badge">BEST PRICE</span>}
              </td>
              <td className="px-5 py-3 text-right text-lg font-bold text-accent">${p.rate.toFixed(2)}/k</td>
              <td className="hidden px-5 py-3 text-right text-sm text-gray-400 md:table-cell">
                {i === 0 ? 'baseline' : `${(((GEM_PRICING[0].rate - p.rate) / GEM_PRICING[0].rate) * 100).toFixed(0)}% off`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 py-3 text-xs text-gray-500">
        Rates updated live from <span className="font-semibold text-gray-400">sniperduels.shop</span>. Min order: 1k gems.
      </div>
    </div>
  );
}
