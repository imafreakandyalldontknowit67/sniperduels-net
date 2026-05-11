type Item = { label: string; value: string };

const ITEMS: Item[] = [
  { label: 'Orders fulfilled', value: '1,200+' },
  { label: 'Active vendors', value: '13' },
  { label: 'Avg. delivery', value: '< 5 min' },
  { label: 'Cheapest tier', value: '$2.65/k' },
];

export default function TrustRow() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {ITEMS.map(it => (
        <div key={it.label} className="border-[3px] border-dark-500 bg-dark-700 p-4 text-center">
          <div className="text-2xl font-black text-accent md:text-3xl">{it.value}</div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
