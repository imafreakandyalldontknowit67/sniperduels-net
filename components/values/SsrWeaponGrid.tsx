import type { Weapon } from '@/lib/weapons';
import WeaponCard from './WeaponCard';

// Server component — renders the first N weapon cards as static HTML.
// Used as Suspense fallback for ValuesBrowser so Googlebot sees actual
// weapon links + alts + JSON-LD-friendly anchor text in the initial HTML.
// Once the client ValuesBrowser hydrates, it swaps this out with the
// interactive search/filter view.
export default function SsrWeaponGrid({ weapons, take = 24 }: { weapons: Weapon[]; take?: number }) {
  const slice = weapons.slice(0, take);
  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-gray-400">
          {weapons.length} weapons
        </span>
        <span className="font-bold uppercase tracking-wider text-gray-500">Loading filters…</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {slice.map((w, i) => (
          <WeaponCard key={w.id} weapon={w} priority={i < 6} />
        ))}
      </div>
    </div>
  );
}
