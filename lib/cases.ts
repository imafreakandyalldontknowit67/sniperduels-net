import { allWeapons, allWeaponsIncludingUnpriced, type Weapon } from './weapons';

export type Case = {
  /** Matches the `crate` field on weapons in data/weapons.json (and the URL slug). */
  slug: string;
  /** Player-facing display name (e.g. "April Fools Case"). */
  displayName: string;
  /** 1-2 sentence description for hub + per-case pages. */
  description: string;
  /** Optional released-at marker — only set when we actually know the date.
   *  Leave undefined rather than guessing; fake dates break trust. */
  releasedAt?: string;
  /** Optional theme tag — used for accent color / categorization. */
  theme?: 'holiday' | 'classic' | 'release' | 'event';
};

/** Hardcoded case catalog. Slugs match the `crate` field on weapons in data/weapons.json.
 *  Display names + descriptions are stable strings the SEO content layer depends on —
 *  if SDValues ever renames a crate, update both ends in lockstep. */
const CASES: Case[] = [
  {
    slug: 'classic-case',
    displayName: 'Classic Case',
    description:
      'The original Sniper Duels case — the largest drop pool in the game with Adurite, Crimson, Frigidus, and other staple knife and AWP skins.',
    theme: 'classic',
  },
  {
    slug: 'skin-case-1',
    displayName: 'Skin Case 1',
    description:
      'Sniper Duels Skin Case 1 — featuring Inverted, True Inverted, Case Hardened, Aurora and other high-tier knife and sniper finishes.',
    theme: 'release',
  },
  {
    slug: 'release-case',
    displayName: 'Release Case',
    description:
      'The Release Case — Sniper Duels launch-era drops featuring True Inverted AWPs, Amethyst knives and other early-era collectibles.',
    theme: 'release',
  },
  {
    slug: 'christmas-present',
    displayName: 'Christmas Present',
    description:
      'The Christmas Present case — limited-time holiday drops including Candy Cane melees in Blueberry, Tutti Frutti and Wintergreen flavors.',
    theme: 'holiday',
  },
  {
    slug: 'present',
    displayName: 'Present Case',
    description:
      'The Present case — a smaller Christmas event drop with Peppermint and Snowflake variants on Karambits, Survivors, Deagles and AWPs.',
    theme: 'holiday',
  },
  {
    slug: 'hallows-basket',
    displayName: 'Hallows Basket',
    description:
      'The Halloween Hallows Basket — spooky-season exclusives including Vampiric, Cultist, Candy Corn and Elementalist skins.',
    theme: 'holiday',
  },
  {
    slug: 'april-fools-case',
    displayName: 'April Fools Case',
    description:
      'The April Fools Case — joke-themed Sniper Duels skins including the "of Destiny" series and the MLG Shotgun.',
    theme: 'event',
  },
  {
    slug: 'v-day',
    displayName: "Valentine's Day Case",
    description:
      "The Valentine's Day case — pink-themed Sniper Duels limited drops including True Pink AWPs, Cupid knives and Rose Fade variants.",
    theme: 'holiday',
  },
];

/** All known cases, in display order (most-popular / largest first). */
export function getAllCases(): Case[] {
  return CASES;
}

/** Look up a single case by slug. Returns undefined if unknown. */
export function getCase(slug: string): Case | undefined {
  return CASES.find(c => c.slug === slug);
}

/** Return all weapons whose `crate` matches the case slug.
 *  Filters to priced weapons (matches allWeapons() behaviour — pages built on
 *  this are user-facing, so we hide the "—" rows that look like broken data).
 *  Use allWeaponsIncludingUnpriced for raw counts in the unlikely case it matters. */
export function getCaseItems(slug: string): Weapon[] {
  return allWeapons().filter(w => w.crate === slug);
}

/** Same as getCaseItems but including unpriced — used for accurate "X items"
 *  copy when SDValues hasn't priced every variant yet. */
export function getCaseItemsIncludingUnpriced(slug: string): Weapon[] {
  return allWeaponsIncludingUnpriced().filter(w => w.crate === slug);
}
