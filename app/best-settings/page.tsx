import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, DISCORD_INVITE } from '@/lib/config';
import BuyCTA from '@/components/BuyCTA';

const TITLE = 'Best Sniper Duels Settings & Sensitivity (2026 Guide)';
const DESC =
  'Recommended starting sensitivity, FPS, FOV, and keybind settings for Sniper Duels on PC, mobile, and controller — plus a simple method to dial in YOUR own perfect sensitivity.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/best-settings` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/best-settings` },
  twitter: { title: TITLE, description: DESC },
};

const SECTIONS = [
  { id: 'quick-answer', title: 'Quick Answer' },
  { id: 'pc-sensitivity', title: 'PC Mouse Sensitivity' },
  { id: 'mobile-sensitivity', title: 'Mobile Sensitivity' },
  { id: 'controller-sensitivity', title: 'Controller Sensitivity' },
  { id: 'graphics', title: 'Graphics & FPS Settings' },
  { id: 'fov-aim', title: 'FOV & Aim Tips' },
  { id: 'keybinds', title: 'Keybinds' },
  { id: 'find-your-sens', title: 'How to Find YOUR Sensitivity' },
];

const FAQ = [
  {
    q: 'What is the best sensitivity for Sniper Duels?',
    a: 'There is no single "best" sensitivity — it depends on your device, mouse DPI, and play style. As a starting point, PC players often land somewhere around 0.4–0.8 in-game sensitivity at 800 DPI, mobile players tend to keep it on the lower-to-middle end so flick shots stay controllable, and controller players usually start near the middle and nudge it up. Pick a value in those ranges, then use the dial-in method on this page to tune it until a single smooth wrist or thumb motion lands your crosshair on a target without overshooting.',
  },
  {
    q: 'What settings do pros use in Sniper Duels?',
    a: 'Skilled players tend to favor lower sensitivity for precise sniper aim, prioritize a stable high frame rate over fancy graphics, and keep a consistent setup they never change. The exact numbers vary person to person because they depend on DPI and hardware, so copying one player\'s raw sensitivity rarely transfers cleanly. The transferable habit is locking in one comfortable sensitivity and building muscle memory instead of constantly tweaking it.',
  },
  {
    q: 'How do I get better aim in Sniper Duels?',
    a: 'Lock in one sensitivity and stop changing it so your muscle memory can develop, aim for a stable frame rate by lowering graphics, and practice tracking and flicking to targets every session. Consistency matters far more than the specific numbers — a "decent" sensitivity you have trained on will always beat a "perfect" one you switched to yesterday.',
  },
  {
    q: 'How do I increase FPS in Sniper Duels?',
    a: 'Lower your Roblox graphics quality (around level 1–4 of 10 is common for competitive play), close background apps, and on PC make sure Roblox is using your dedicated GPU. A steady frame rate makes your aim feel far more consistent than a high but stuttering one, so favor stability over a slightly higher peak number.',
  },
  {
    q: 'Is lower or higher sensitivity better for sniping?',
    a: 'Lower sensitivity generally gives more precise sniper aim because small hand movements translate to small crosshair movements, which makes it easier to hold and micro-adjust on a target. The tradeoff is that very low sensitivity makes fast 180-degree turns harder. Most players settle on a value low enough for steady aim but still high enough to turn quickly when caught off guard.',
  },
];

export default function BestSettingsPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Best Settings', item: `${SITE_URL}/best-settings` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Best Sniper Duels Settings & Sensitivity',
      datePublished: '2026-06-03T00:00:00Z',
      dateModified: '2026-06-03T00:00:00Z',
      author: { '@type': 'Organization', name: 'sniperduels.net', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'sniperduels.net',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/gem_icon.png` },
      },
      description: DESC,
      image: [`${SITE_URL}/og-banner.webp`],
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/best-settings` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <>
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider sm:text-4xl md:text-5xl">
          Best Sniper Duels <span className="text-accent">Settings & Sensitivity</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-400 sm:text-xs md:text-sm">
          Recommended starting points for PC, mobile & controller · 2026
        </p>
      </header>

      {/* Direct-answer intro (server-rendered, quotable ~50 words) */}
      <section id="quick-answer" className="mb-10">
        <p className="text-white/80 leading-relaxed">
          There is no one &quot;best&quot; setting in Sniper Duels — the right sensitivity depends on your device, DPI,
          and aim style. A solid starting point is a low-to-medium sensitivity (around 0.4–0.8 on PC at 800 DPI), a
          stable high frame rate over pretty graphics, and a default FOV. Lock one setup in, then tune it with the
          method below.
        </p>
      </section>

      {/* Table of Contents */}
      <nav className="mb-10 rounded-lg border border-white/10 bg-white/5 p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/50">Table of Contents</h2>
        <ol className="space-y-1.5">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-cyan-400 hover:text-cyan-300 text-sm">
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* PC Mouse Sensitivity */}
      <section id="pc-sensitivity" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">PC Mouse Sensitivity</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          On PC, your effective sensitivity is a combination of two things: your <strong className="text-white">mouse
          DPI</strong> (set in your mouse software or on the mouse itself) and the <strong className="text-white">in-game
          sensitivity slider</strong>. Treat these numbers as a recommended <em>starting point</em>, not a magic value —
          two players with different DPI will need very different in-game numbers to feel the same.
        </p>
        <div className="mb-4 rounded-lg border border-white/10 bg-white/5 p-4">
          <h3 className="mb-2 font-bold text-accent">Recommended starting range</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex gap-2"><span className="text-accent">•</span><span><strong className="text-white">Mouse DPI:</strong> 400–800. This is a common competitive range across shooters because it gives precise control without feeling sluggish.</span></li>
            <li className="flex gap-2"><span className="text-accent">•</span><span><strong className="text-white">In-game sensitivity:</strong> roughly 0.4–0.8 at 800 DPI. If you run 400 DPI, you&apos;ll want a higher slider value to compensate.</span></li>
            <li className="flex gap-2"><span className="text-accent">•</span><span><strong className="text-white">Goal:</strong> a comfortable 180° turn using roughly one mouse-pad width of movement.</span></li>
          </ul>
        </div>
        <p className="text-white/70 leading-relaxed">
          <strong className="text-white">The tradeoff:</strong> lower sensitivity = more precise aim but harder fast
          turns; higher sensitivity = quick turns but more overshooting on long-range shots. Snipers reward precision,
          so most players lean toward the lower end of their comfortable range. Start in the middle of these ranges,
          play a few rounds, and adjust in small steps.
        </p>
      </section>

      {/* Mobile Sensitivity */}
      <section id="mobile-sensitivity" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Mobile Sensitivity</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          On mobile (touchscreen), aiming is done by dragging on the screen, so the tradeoffs are different. A
          sensitivity that&apos;s too high makes your crosshair jump around and overshoot; too low and you can&apos;t
          drag far enough to turn. Most touch players settle on a <strong className="text-white">lower-to-medium</strong>
          {' '}setting so they can hold steady on distant targets.
        </p>
        <div className="mb-4 rounded-lg border border-white/10 bg-white/5 p-4">
          <h3 className="mb-2 font-bold text-accent">Recommended starting points (mobile)</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex gap-2"><span className="text-accent">•</span><span>Start your aim/look sensitivity on the lower half of the slider and raise it only if you struggle to turn fast enough.</span></li>
            <li className="flex gap-2"><span className="text-accent">•</span><span>If your device supports it, enable a higher refresh-rate / 60+ FPS mode — smoothness matters even more than the exact sensitivity on touch.</span></li>
            <li className="flex gap-2"><span className="text-accent">•</span><span>Consider a claw or multi-finger grip so you can move and aim at the same time.</span></li>
          </ul>
        </div>
        <p className="text-white/70 leading-relaxed">
          Because every phone screen size differs, mobile sensitivity is the most personal of all — the dial-in method
          further down is especially important here.
        </p>
      </section>

      {/* Controller Sensitivity */}
      <section id="controller-sensitivity" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Controller Sensitivity</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          On controller, aim is driven by how far you push the right stick, so consistency comes from picking a
          sensitivity you can hold steady at full lean. Stick aim naturally favors slower, deliberate movements, which
          actually suits sniping well.
        </p>
        <div className="mb-4 rounded-lg border border-white/10 bg-white/5 p-4">
          <h3 className="mb-2 font-bold text-accent">Recommended starting points (controller)</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex gap-2"><span className="text-accent">•</span><span>Start near the middle of the sensitivity range, then nudge it up a notch at a time until quick turns feel possible but small adjustments still feel controllable.</span></li>
            <li className="flex gap-2"><span className="text-accent">•</span><span>If turning feels too slow but fine aiming feels fine, raise look sensitivity slightly rather than overhauling everything.</span></li>
            <li className="flex gap-2"><span className="text-accent">•</span><span>Keep it consistent between sessions — stick muscle memory takes longer to build than mouse aim.</span></li>
          </ul>
        </div>
      </section>

      {/* Graphics & FPS */}
      <section id="graphics" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Graphics & FPS Settings</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          A <strong className="text-white">stable, high frame rate</strong> is one of the most underrated aim upgrades
          in Sniper Duels. Aim feels far more consistent at a steady 60+ FPS than at a higher number that constantly
          stutters. Favor stability over raw peak FPS.
        </p>
        <ul className="space-y-3 text-white/70">
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Lower Roblox graphics quality:</strong> dropping to around level 1–4 of 10 frees up performance for a smoother frame rate. Crank it back up only if your device has headroom.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Close background apps:</strong> browsers, music, and downloads all steal performance. Close them before a serious session.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Use your dedicated GPU (PC):</strong> on laptops, make sure Roblox runs on the discrete GPU, not integrated graphics.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Enable high-refresh modes (mobile):</strong> if your phone supports 90/120Hz, use it — smoother frames make flick shots land more reliably.</span>
          </li>
        </ul>
      </section>

      {/* FOV & Aim Tips */}
      <section id="fov-aim" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">FOV & Aim Tips</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          Field of view (FOV) is a personal-preference tradeoff. A <strong className="text-white">wider FOV</strong>
          {' '}lets you see more around you but makes distant targets appear smaller and harder to snipe. A{' '}
          <strong className="text-white">narrower FOV</strong> zooms targets in for precision but shrinks your peripheral
          awareness. If you&apos;re unsure, leave FOV at the default and only adjust once you know which problem you have.
        </p>
        <ul className="space-y-3 text-white/70">
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Pre-aim common angles:</strong> keep your crosshair at head height and pointed where enemies appear, so you only need a tiny adjustment to fire.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Flick vs. track:</strong> for quick peeks, practice flicking; for moving targets, practice smooth tracking. Both improve with a consistent sensitivity.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent">•</span>
            <span><strong className="text-white">Reset to center:</strong> after each shot, return your aim to a neutral position so your next flick starts from a known reference point.</span>
          </li>
        </ul>
      </section>

      {/* Keybinds */}
      <section id="keybinds" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Keybinds</h2>
        <p className="mb-3 text-white/70 leading-relaxed">
          Default keybinds work fine for most players — the goal is comfort and reachability, not exotic layouts. The
          guideline: any action you need mid-fight should be reachable <em>without</em> moving your aiming hand or
          lifting fingers off movement keys.
        </p>
        <ul className="space-y-3 text-white/70">
          <li className="flex gap-2"><span className="text-accent">•</span><span><strong className="text-white">PC:</strong> keep movement on WASD and aim/fire on the mouse. If a key feels like a stretch, rebind it to something within easy reach of WASD.</span></li>
          <li className="flex gap-2"><span className="text-accent">•</span><span><strong className="text-white">Mobile:</strong> arrange on-screen buttons so your thumbs naturally rest near move and fire; move the jump/aim buttons if they cause misclicks.</span></li>
          <li className="flex gap-2"><span className="text-accent">•</span><span><strong className="text-white">Controller:</strong> if jumping while aiming feels awkward, look into a bumper/paddle layout so you never take a thumb off the aim stick.</span></li>
          <li className="flex gap-2"><span className="text-accent">•</span><span><strong className="text-white">Don&apos;t over-tinker:</strong> once a layout feels natural, leave it alone so muscle memory can build.</span></li>
        </ul>
      </section>

      {/* How to find YOUR sensitivity — the practical part */}
      <section id="find-your-sens" className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">How to Find YOUR Sensitivity</h2>
        <p className="mb-4 text-white/70 leading-relaxed">
          This is the part most guides skip. Copying someone else&apos;s number rarely works because it depends on their
          DPI, device, and hands. Instead, use this simple process to converge on a sensitivity that&apos;s right for
          <em> you</em>:
        </p>
        <ol className="space-y-4 text-white/70">
          <li className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="font-bold text-accent">Step 1: Pick a starting value.</span> Use the recommended range
            above for your device. Don&apos;t agonize — anywhere in range is fine to begin.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="font-bold text-accent">Step 2: Test the 180° turn.</span> Without moving your hand off the
            mousepad (or in one comfortable thumb drag on mobile/stick), try to turn a full 180°. If you can&apos;t make
            it around, raise sensitivity. If you blow past it easily, lower it.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="font-bold text-accent">Step 3: Test fine aim.</span> Aim at a small distant target and try
            to hold the crosshair on it. If your aim jitters and overshoots, your sensitivity is too high. If micro-
            adjusting feels sluggish, it&apos;s slightly too low.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="font-bold text-accent">Step 4: Adjust in small steps.</span> Change sensitivity by tiny
            increments — never huge jumps. Big changes reset your muscle memory and make it impossible to tell what
            actually helped.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-4">
            <span className="font-bold text-accent">Step 5: Commit for a week.</span> Once both the turn test and the
            fine-aim test feel good, <strong className="text-white">stop changing it.</strong> Give your hands time to
            learn the setting. Consistency beats &quot;perfect&quot; numbers every time.
          </li>
        </ol>
        <p className="mt-4 text-white/70 leading-relaxed">
          New to the game entirely? Pair this with our{' '}
          <Link href="/how-to-play" className="text-cyan-400 hover:text-cyan-300">how to play Sniper Duels</Link> guide,
          and check the <Link href="/best-snipers" className="text-cyan-400 hover:text-cyan-300">best snipers</Link> and
          full <Link href="/tier-list" className="text-cyan-400 hover:text-cyan-300">weapon tier list</Link> to see what
          you&apos;re aiming for.
        </p>
      </section>

      {/* Discord CTA */}
      <section className="mb-10 rounded-lg border border-accent/30 bg-accent/5 p-6 text-center">
        <h2 className="mb-2 text-xl font-bold text-white">Ask Experienced Players for Their Settings</h2>
        <p className="mb-4 text-white/70 leading-relaxed">
          The fastest way to dial in your setup is to ask people who already have. Share your device and DPI in our
          community and get real recommendations from players who&apos;ve put in the hours.
        </p>
        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noopener"
          className="inline-block rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-dark-900 transition-opacity hover:opacity-90"
        >
          Join the Sniper Duels Discord
        </a>
      </section>

      {/* FAQ Section */}
      <section className="mt-12 mb-10">
        <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ.map(f => (
            <div key={f.q} className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h3 className="mb-2 font-bold text-white">{f.q}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <BuyCTA campaign="best-settings" shopPath="/gems" variant="banner" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
