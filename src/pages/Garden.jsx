import { useEffect, useMemo, useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import { Link } from 'react-router-dom';

export const route = { path: '/garden', layout: 'public', access: 'public' };

const SEEDS = [
  { id: 'rewind', name: 'Rewind Root', effect: 'REWIND', glyph: '🌱', note: 'Restores broken structures.', tone: 'sepia' },
  { id: 'fast', name: 'Fast-forward Fern', effect: 'FAST-FORWARD', glyph: '🌿', note: 'Ages barriers and machines.', tone: 'neon' },
  { id: 'pause', name: 'Stillwater Moss', effect: 'PAUSE', glyph: '🍃', note: 'Freezes a moving field.', tone: 'calm' },
  { id: 'hybrid', name: 'Ageback Vine', effect: 'HYBRID', glyph: '🌾', note: 'Rewrites age in both directions.', tone: 'hybrid' },
];

const SECTORS = [
  { name: 'Glassway', goal: 'Restore the bridge to reach the greenhouse.', reward: 'Stillwater Moss', hazard: 'Stable atmosphere' },
  { name: 'Rust Orchard', goal: 'Age the sealed bulkhead until it crumbles.', reward: 'Hybrid nursery', hazard: 'Temporal corrosion' },
  { name: 'Clockroot Atrium', goal: 'Combine two temporal effects to stabilize the station core.', reward: 'Station core restored', hazard: 'Oxygen frost rising' },
];

const solutions = { 0: 'rewind', 1: 'fast', 2: 'hybrid' };

function loadProgress() {
  try {
    return Number(localStorage.getItem('chrono-botanist-sector') || 0);
  } catch {
    return 0;
  }
}

function DatapadFrame({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-(--z-modal) grid place-items-center bg-background/90 p-4 backdrop-blur-md">
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-lg">
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(125deg, transparent 48%, var(--border) 49%, transparent 51%), linear-gradient(20deg, transparent 48%, var(--border) 49%, transparent 51%)' }} />
        <div className="relative flex items-center justify-between border-b border-border bg-muted/70 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-primary"><ApperIcon name="TabletSmartphone" size={18} /></span>
            <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">B0TANIST / DATAPAD</p><p className="font-note text-lg">Field interface</p></div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close datapad" className="rounded-lg border border-border bg-background p-2 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"><ApperIcon name="X" size={17} /></button>
        </div>
        <div className="relative min-h-0 flex-1 overflow-y-auto p-5 md:p-7">{children}</div>
      </div>
    </div>
  );
}

function RadialSeedPod({ open, selected, discovered, onToggle, onSelect }) {
  if (!open) return null;
  const petals = discovered.map((seed, index) => {
    const angle = (-90 + (360 / discovered.length) * index) * (Math.PI / 180);
    return { seed, x: 50 + Math.cos(angle) * 35, y: 50 + Math.sin(angle) * 35 };
  });
  return (
    <div className="absolute inset-0 z-20 grid place-items-center rounded-[2rem] bg-background/75 p-4 backdrop-blur-sm">
      <div className="relative aspect-square w-[min(82vw,24rem)] rounded-full border border-primary/40 bg-card/95 shadow-lg">
        <div className="absolute inset-[28%] grid place-items-center rounded-full border border-border bg-background text-center shadow-md">
          <div><ApperIcon name="Flower2" size={26} className="mx-auto text-primary" /><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Seed pod</p><button type="button" onClick={onToggle} className="mt-2 rounded-lg px-2 py-1 text-xs font-semibold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]">Close</button></div>
        </div>
        {petals.map(({ seed, x, y }) => (
          <button key={seed.id} type="button" onClick={() => onSelect(seed.id)} aria-label={`Select ${seed.name}`} className={`absolute grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[45%_55%_55%_45%] border bg-secondary text-center shadow-sm transition hover:scale-105 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${selected === seed.id ? 'ring-2 ring-primary' : ''}`} style={{ left: `${x}%`, top: `${y}%`, rotate: `${(x - 50) / 2}deg`, touchAction: 'manipulation' }}>
            <span className="pointer-events-none text-2xl">{seed.glyph}</span><span className="pointer-events-none mt-0.5 max-w-[4.5rem] font-note text-xs leading-tight">{seed.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StationMap({ sector }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-background p-5">
      <div className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Holo-projection / 3D wireframe</div>
      <div className="grid min-h-72 place-items-center rounded-xl border border-primary/30 bg-muted/50 p-6">
        <div className="relative h-52 w-full max-w-2xl [transform:perspective(600px)_rotateX(58deg)_rotateZ(-4deg)]">
          <div className="absolute inset-0 rounded-lg border border-primary/50 opacity-80" style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          {SECTORS.map((item, index) => {
            const cleared = index < sector || sector === 2;
            return <div key={item.name} className={`absolute grid h-20 w-32 place-items-center rounded-lg border ${cleared ? 'border-success bg-success-muted text-success' : index === sector ? 'border-warning bg-warning-muted text-warning' : 'border-border bg-card text-muted-foreground'}`} style={{ left: `${12 + index * 30}%`, top: `${30 + (index % 2) * 18}%` }}><span className="font-note text-base">{item.name}</span><span className="font-mono text-[8px] uppercase tracking-widest">{cleared ? 'cleared' : index === sector ? 'blight' : 'locked'}</span></div>;
          })}
        </div>
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Green = restored sector · Amber = temporal blight · Gray = uncharted</p>
    </div>
  );
}

function FloraCompendium({ discovered, bred }) {
  const plants = discovered.map((seed) => seed.id === 'hybrid' && !bred ? null : seed).filter(Boolean);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {plants.map((seed) => <article key={seed.id} className="rounded-2xl border border-border bg-background p-5">
        <div className="flex items-start gap-4"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-secondary text-3xl">{seed.glyph}</span><div className="min-w-0"><h3 className="font-note text-2xl">{seed.name}</h3><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Temporal signature: {seed.effect}</p></div></div>
        <p className="mt-4 font-note text-lg leading-relaxed text-foreground/80">“{seed.note} The field sketch is still damp with greenhouse soil; corporate annotations underneath are mostly redacted.”</p>
      </article>)}
    </div>
  );
}

export default function Garden() {
  const [sector, setSector] = useState(loadProgress);
  const [selected, setSelected] = useState(null);
  const [bred, setBred] = useState(false);
  const [message, setMessage] = useState('Choose a seed from the pod, then aim at a temporal tile.');
  const [podOpen, setPodOpen] = useState(false);
  const [datapad, setDatapad] = useState(null);
  const [spliceSource, setSpliceSource] = useState('rewind');
  const [spliceTarget, setSpliceTarget] = useState('fast');

  useEffect(() => {
    try { localStorage.setItem('chrono-botanist-sector', String(sector)); } catch {}
  }, [sector]);

  const discovered = useMemo(() => SEEDS.filter((seed) => seed.id !== 'hybrid' || bred), [bred]);
  const current = SECTORS[Math.min(sector, SECTORS.length - 1)];
  const activeSeed = SEEDS.find((seed) => seed.id === selected) || SEEDS[0];
  const solved = sector >= 2 && bred;
  const frost = sector === 2 && !solved;

  function plant(seedId) {
    setSelected(seedId);
    const answer = solutions[sector];
    if (answer === seedId) {
      setMessage(sector === 0 ? 'REWIND accepted. The bridge remembers its shape and vines unfurl across the gap.' : sector === 1 ? 'FAST-FORWARD accepted. Oxidation races through the reinforced bulkhead.' : 'HYBRID accepted. Opposing temporal vectors braid around the station core.');
      setTimeout(() => setSector((value) => Math.min(value + 1, SECTORS.length - 1)), 500);
    } else {
      setMessage(sector === 2 && seedId === 'rewind' ? 'The root restores matter, but the core needs two effects at once. Open the Splicing Table.' : 'Temporal shimmer detected. The target resists this seed’s signature.');
    }
  }

  function breed() {
    if (sector < 2) {
      setMessage('The prediction scanner needs more station data. Reach Clockroot Atrium first.');
      return;
    }
    setBred(true);
    setSelected('hybrid');
    setMessage('Ageback Vine synthesized: Rewind + Fast-forward. The station core can now be stabilized.');
  }

  function reset() {
    setSector(0);
    setSelected(null);
    setBred(false);
    setMessage('Garden reset. The station settles back into its first quiet puzzle.');
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background">
      <div className={`pointer-events-none fixed inset-0 z-10 transition-opacity duration-(--transition-slow) ${frost ? 'opacity-100' : 'opacity-0'}`} style={{ boxShadow: 'inset 0 0 90px 26px var(--accent)' }} />
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-7 md:py-7">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <div className="flex items-center gap-4"><Link to="/" aria-label="Back to home" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"><ApperIcon name="ArrowLeft" size={17} /></Link><div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">STATION ORBITAL-07 / GREENHOUSE</p><h1 className="mt-1 font-heading text-2xl font-semibold tracking-tight md:text-3xl">{current.name}</h1></div></div>
          <div className="flex items-center gap-2"><span className={`rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest ${frost ? 'border-warning bg-warning-muted text-warning' : 'border-success-border bg-success-muted text-success'}`}>{frost ? 'O₂ / frost warning' : current.hazard}</span><button type="button" onClick={() => setDatapad('map')} aria-label="Open botanist datapad" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"><ApperIcon name="TabletSmartphone" size={17} /></button><button type="button" onClick={reset} aria-label="Reset garden" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"><ApperIcon name="RotateCcw" size={16} /></button></div>
        </header>

        <main className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <section className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-4 shadow-md md:p-6">
            <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">SECTOR {String(sector + 1).padStart(2, '0')} / 03</p><p className="mt-1 max-w-xl text-sm text-muted-foreground">{current.goal}</p></div><span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{solved ? 'CORE // STABLE' : 'FIELD // ACTIVE'}</span></div>
            <div className="relative mt-5 overflow-hidden rounded-[1.5rem] border border-border bg-muted p-3">
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {Array.from({ length: 24 }, (_, index) => {
                  const blocked = index === 5 && sector === 0;
                  const barrier = index === 18 && sector === 1;
                  const core = index === 14 && sector === 2;
                  const solvedTile = (blocked && selected === 'rewind') || (barrier && selected === 'fast') || (core && solved);
                  return <div key={index} className={`relative grid aspect-square place-items-center overflow-hidden rounded-lg border bg-background text-xl transition ${blocked ? 'border-accent ring-2 ring-accent/40' : barrier ? 'border-warning ring-2 ring-warning/30' : core ? 'border-primary ring-2 ring-primary/30' : 'border-border'}`}><span className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)', backgroundSize: '13px 13px' }} />{blocked ? (solvedTile ? '🌉' : '🕳️') : barrier ? (solvedTile ? '🪴' : '🧱') : core ? (solvedTile ? '🌳' : '◌') : index % 5 === 0 ? '🌿' : ''}</div>;
                })}
              </div>
              <div className="pointer-events-none absolute inset-0 grid place-items-center"><div className={`grid h-14 w-14 place-items-center rounded-full border-2 bg-background/30 transition-all ${activeSeed.tone === 'sepia' ? 'border-accent text-accent' : activeSeed.tone === 'neon' ? 'border-primary text-primary' : 'border-success text-success'} ${activeSeed.tone === 'sepia' ? 'animate-[spin_2.4s_linear_infinite]' : activeSeed.tone === 'neon' ? 'animate-pulse' : ''}`}><span className="h-2 w-2 rounded-full bg-current" /><span className="absolute h-7 w-7 rounded-full border border-current opacity-60" /></div></div>
              <div className="absolute bottom-3 left-3 rounded-lg border border-border bg-card/90 px-3 py-2 backdrop-blur"><p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">RETICLE // {activeSeed.effect}</p><p className="font-note text-base">{activeSeed.name}</p></div>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex-1 rounded-xl border border-border bg-background px-4 py-3"><p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Station telemetry</p><p className="mt-1 text-sm leading-relaxed text-foreground/80">{message}</p></div><button type="button" onClick={() => setPodOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"><ApperIcon name="Flower2" size={17} /> Open Seed Pod</button></div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-border bg-card p-4 shadow-xs"><div className="flex items-center justify-between"><h2 className="font-heading text-lg font-semibold">Botanist’s datapad</h2><span className="font-mono text-[9px] text-muted-foreground">LIVE</span></div><div className="mt-3 grid grid-cols-3 gap-2"><button type="button" onClick={() => setDatapad('map')} className="rounded-xl border border-border bg-background p-3 text-left transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"><ApperIcon name="Map" size={16} /><p className="mt-2 font-mono text-[9px] uppercase tracking-wider">Map</p></button><button type="button" onClick={() => setDatapad('flora')} className="rounded-xl border border-border bg-background p-3 text-left transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"><ApperIcon name="BookOpen" size={16} /><p className="mt-2 font-mono text-[9px] uppercase tracking-wider">Flora</p></button><button type="button" onClick={() => setDatapad('splice')} className="rounded-xl border border-border bg-background p-3 text-left transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"><ApperIcon name="Dna" size={16} /><p className="mt-2 font-mono text-[9px] uppercase tracking-wider">Splice</p></button></div></section>
            <section className="rounded-2xl border border-border bg-muted p-4"><p className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Temporal signature</p><div className="mt-3 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-2xl">{activeSeed.glyph}</span><div><p className="font-note text-xl">{activeSeed.name}</p><p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{activeSeed.effect}</p></div></div></section>
            <section className="rounded-2xl border border-border bg-card p-4"><div className="flex items-center justify-between"><p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Restoration</p><span className="font-mono text-[9px] text-muted-foreground">{Math.min(sector + (bred ? 1 : 0), 3)} / 3</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all duration-(--transition-normal)" style={{ width: `${Math.min((sector + (bred ? 1 : 0)) / 3, 1) * 100}%` }} /></div><p className="mt-3 font-note text-lg">Next: {current.reward}</p></section>
          </aside>
        </main>
      </div>

      <RadialSeedPod open={podOpen} selected={selected} discovered={discovered} onToggle={() => setPodOpen(false)} onSelect={(id) => { setPodOpen(false); plant(id); }} />

      {datapad && <DatapadFrame onClose={() => setDatapad(null)}>
        {datapad === 'map' && <div><div className="mb-5"><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">HOLOGRAPHIC STATION MAP</p><h2 className="mt-1 font-heading text-3xl font-semibold">Where the station remembers</h2><p className="mt-2 max-w-2xl text-sm text-muted-foreground">Restored sectors bloom in soft organic green. Temporal Blight pulses amber around unstable routes.</p></div><StationMap sector={sector} /></div>}
        {datapad === 'flora' && <div><div className="mb-5"><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">FLORA COMPENDIUM / FIELD NOTES</p><h2 className="mt-1 font-heading text-3xl font-semibold">Plants that bend the clock</h2><p className="mt-2 text-sm text-muted-foreground">Handwritten observations layered over redacted corporate blueprints.</p></div><FloraCompendium discovered={discovered} bred={bred} /></div>}
        {datapad === 'splice' && <div><div className="mb-5"><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">GREENHOUSE / SPLICING TABLE</p><h2 className="mt-1 font-heading text-3xl font-semibold">Crossbreed a temporal signature</h2><p className="mt-2 text-sm text-muted-foreground">Choose a source and target. The retro CRT predicts the result before you commit rare material.</p></div><div className="grid gap-5 lg:grid-cols-[1fr_20rem]"><div className="rounded-2xl border border-border bg-muted p-5"><div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Sample source</span><select value={spliceSource} onChange={(event) => setSpliceSource(event.target.value)} className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{SEEDS.slice(0, 3).map((seed) => <option key={seed.id} value={seed.id}>{seed.name}</option>)}</select></label><label className="block"><span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Receiving plant</span><select value={spliceTarget} onChange={(event) => setSpliceTarget(event.target.value)} className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{SEEDS.slice(0, 3).map((seed) => <option key={seed.id} value={seed.id}>{seed.name}</option>)}</select></label></div><div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-border bg-background p-8 text-center"><div className="flex items-center gap-5"><span className="grid h-16 w-16 place-items-center rounded-full border border-border bg-secondary text-3xl">{SEEDS.find((seed) => seed.id === spliceSource)?.glyph}</span><ApperIcon name="MoveRight" size={22} className="text-muted-foreground" /><span className="grid h-16 w-16 place-items-center rounded-full border border-border bg-secondary text-3xl">{SEEDS.find((seed) => seed.id === spliceTarget)?.glyph}</span></div><p className="mt-4 font-note text-xl">Mechanical tweezers ready</p><p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Drag sample → target</p></div></div><div className="rounded-2xl border border-border bg-background p-5 shadow-xs"><div className="flex items-center justify-between"><p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">CRT prediction scanner</p><span className="h-2 w-2 animate-pulse rounded-full bg-success" /></div><div className="mt-4 grid aspect-square place-items-center rounded-xl border border-border bg-muted p-5 text-center"><div><div className="font-mono text-xs text-success">{spliceSource === spliceTarget ? 'NO HYBRID' : 'AGEBACK VINE'}</div><div className="mx-auto mt-3 h-20 w-20 rounded-full border border-success/50" style={{ backgroundImage: 'radial-gradient(circle, var(--success) 1px, transparent 1px)', backgroundSize: '7px 7px' }} /><p className="mt-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{spliceSource === spliceTarget ? 'Compatible signal not detected' : 'Predicted: dual temporal vector'}</p></div></div><button type="button" onClick={breed} disabled={sector < 2 || bred || spliceSource === spliceTarget} className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50">{bred ? 'Ageback Vine catalogued' : 'Lock tweezers & synthesize'}</button></div></div></div>}
      </DatapadFrame>}
    </div>
  );
}
