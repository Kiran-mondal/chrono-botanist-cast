import { useEffect, useMemo, useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import { Link } from 'react-router-dom';

export const route = { path: '/garden', layout: 'public', access: 'public' };

const BASE_SEEDS = [
  { id: 'rewind', name: 'Rewind Root', effect: 'Rewind', glyph: '🌱', note: 'Restores broken structures.' },
  { id: 'fast', name: 'Fast-forward Fern', effect: 'Fast-forward', glyph: '🌿', note: 'Ages barriers and machines.' },
  { id: 'pause', name: 'Stillwater Moss', effect: 'Pause', glyph: '🍃', note: 'Freezes a moving field.' },
];

const SECTORS = [
  { name: 'Glassway', goal: 'Restore the bridge to reach the greenhouse.', reward: 'Unlocks Stillwater Moss.' },
  { name: 'Rust Orchard', goal: 'Age the sealed bulkhead until it crumbles.', reward: 'Unlocks the hybrid nursery.' },
  { name: 'Clockroot Atrium', goal: 'Combine two temporal effects to stabilize the station core.', reward: 'Final sector unlocked.' },
];

const solutions = {
  0: 'rewind',
  1: 'fast',
  2: 'hybrid',
};

function loadProgress() {
  try {
    return Number(localStorage.getItem('chrono-botanist-sector') || 0);
  } catch {
    return 0;
  }
}

export default function Garden() {
  const [sector, setSector] = useState(loadProgress);
  const [selected, setSelected] = useState(null);
  const [bred, setBred] = useState(false);
  const [message, setMessage] = useState('Choose a seed and plant it on the temporal tile.');

  useEffect(() => {
    try { localStorage.setItem('chrono-botanist-sector', String(sector)); } catch {}
  }, [sector]);

  const discovered = useMemo(() => BASE_SEEDS.slice(0, Math.min(BASE_SEEDS.length, sector + 1)), [sector]);
  const current = SECTORS[Math.min(sector, SECTORS.length - 1)];

  function plant(seedId) {
    setSelected(seedId);
    const answer = solutions[sector];
    if (answer === seedId) {
      setMessage(sector === 0 ? 'The bridge remembers its shape. Vines unfurl across the gap.' : 'Time takes hold. The obstacle gives way with a soft metallic sigh.');
      setTimeout(() => setSector((value) => Math.min(value + 1, SECTORS.length - 1)), 450);
    } else if (sector === 2 && seedId === 'rewind') {
      setMessage('The root restores matter, but the station core needs two effects at once. Try breeding.');
    } else {
      setMessage('A gentle shimmer, but nothing changes. Another temporal effect may fit this puzzle.');
    }
  }

  function breed() {
    if (sector < 2) {
      setMessage('The nursery needs a little more station data before it can crossbreed seeds.');
      return;
    }
    setBred(true);
    setMessage('New hybrid discovered: Rewind + Fast-forward = Ageback Vine. The core is stable.');
  }

  function reset() {
    setSector(0);
    setSelected(null);
    setBred(false);
    setMessage('The greenhouse settles back into its first quiet puzzle.');
  }

  const solved = sector >= 2 && bred;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div><Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ApperIcon name="ArrowLeft" size={15} /> Home</Link><p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-primary">Temporal greenhouse</p><h1 className="mt-2 font-heading text-4xl md:text-5xl">Tend the forgotten station.</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{current.goal} Every puzzle is a small experiment: plant, observe, and adjust.</p></div>
        <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"><ApperIcon name="RotateCcw" size={16} /> Reset garden</button>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_340px]">
        <section className="rounded-[2rem] border border-border bg-card p-5 shadow-md md:p-7">
          <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Sector {String(Math.min(sector + 1, 3)).padStart(2, '0')}</p><h2 className="mt-1 font-heading text-2xl">{current.name}</h2></div><span className="rounded-full bg-success-muted px-3 py-1 text-xs font-semibold text-success">{solved ? 'Core restored' : `${sector + 1} / 3`}</span></div>
          <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {Array.from({ length: 24 }, (_, index) => {
              const blocked = index === 5 && sector === 0;
              const barrier = index === 18 && sector === 1;
              const core = index === 14 && sector === 2;
              return <div key={index} className={`relative grid aspect-square place-items-center overflow-hidden rounded-xl border border-border bg-muted text-xl transition ${blocked ? 'ring-2 ring-accent' : ''} ${barrier ? 'ring-2 ring-warning' : ''} ${core ? 'ring-2 ring-primary' : ''}`}><span className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)', backgroundSize: '13px 13px' }} />{blocked ? (selected === 'rewind' ? '🌉' : '🕳️') : barrier ? (selected === 'fast' ? '🪴' : '🧱') : core ? (solved ? '🌳' : '◌') : index % 5 === 0 ? '🌿' : ''}</div>;
            })}
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-background p-4"><div className="flex gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"><ApperIcon name={message.includes('nothing') ? 'Cloud' : 'Sparkles'} size={17} /></span><div><p className="text-sm font-semibold">The station whispers</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{message}</p></div></div></div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-border bg-card p-5 shadow-xs"><div className="flex items-center justify-between"><h2 className="font-heading text-xl">Seed cabinet</h2><span className="text-xs text-muted-foreground">{discovered.length} discovered</span></div><div className="mt-4 space-y-2">{discovered.map((seed) => <button key={seed.id} type="button" onClick={() => plant(seed.id)} className={`flex w-full items-center gap-3 rounded-xl border border-border bg-background p-3 text-left transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99] ${selected === seed.id ? 'ring-2 ring-primary' : ''}`}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-xl">{seed.glyph}</span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{seed.name}</span><span className="block text-xs text-muted-foreground">{seed.note}</span></span><ApperIcon name="Sprout" size={16} /></button>)}</div></section>
          <section className="rounded-2xl border border-border bg-muted p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground"><ApperIcon name="GitMerge" size={18} /></span><div><h2 className="font-heading text-xl">Hybrid nursery</h2><p className="text-xs text-muted-foreground">{sector < 2 ? 'Locked until Sector 03' : 'Two effects, one new possibility'}</p></div></div><button type="button" onClick={breed} className="mt-4 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none" disabled={sector < 2 || bred}>{bred ? 'Ageback Vine discovered' : 'Crossbreed seeds'}</button></section>
          <section className="rounded-2xl border border-border bg-card p-5 shadow-xs"><p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Next restoration</p><p className="mt-2 font-heading text-xl">{current.reward}</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min((sector + (bred ? 1 : 0)) / 3, 1) * 100}%` }} /></div></section>
        </aside>
      </div>
    </div>
  );
}
