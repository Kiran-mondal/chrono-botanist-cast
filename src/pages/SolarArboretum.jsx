import { useEffect, useMemo, useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import { Link } from 'react-router-dom';

export const route = { path: '/solar-arboretum', layout: 'public', access: 'public' };

const SOLAR_FLORA = [
  { id: 'prism', name: 'Prism Orchid', effect: 'REFRACT', glyph: '🌸', note: 'Bends and redirects active time-fields around obstacles.', tone: 'prism' },
  { id: 'eclipse', name: 'Eclipse Moss', effect: 'SHIELD', glyph: '🫧', note: 'Absorbs ambient radiation. Protects fragile seed pods from temporal storms.', tone: 'shield' },
];

const ARBORETUM_SECTORS = [
  { name: 'Solar Arboretum', goal: 'Sync planting cycles with stellar radiation waves. Prism Orchids redirect Rewind Roots around corners to reach hidden mechanisms.', reward: 'Refraction unlock', hazard: 'Solar flare surge' },
];

function loadArboretumProgress() {
  try {
    return Number(localStorage.getItem('chrono-botanist-arboretum') || 0);
  } catch {
    return 0;
  }
}

function DatapadFrame({ children, onClose }) {
  return (
    <div className="pointer-events-auto fixed inset-0 z-30 grid place-items-center overflow-y-auto bg-background/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-3xl border border-border bg-card shadow-lg md:p-8 p-6">
        <button type="button" onClick={onClose} aria-label="Close datapad" className="absolute right-6 top-6 rounded-lg p-1.5 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <ApperIcon name="X" size={20} />
        </button>
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function SolarRadiationMap() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-background p-5">
      <div className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Real-time radiation levels</div>
      <div className="grid min-h-72 place-items-center rounded-xl border border-warning/30 bg-warning-muted/50 p-6">
        <div className="relative h-52 w-full max-w-2xl">
          <div className="absolute inset-0 rounded-lg border border-warning/50" style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(202, 138, 4, 0.1) 0%, transparent 70%)', animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-40 w-40 rounded-full border-2 border-warning/60 bg-warning/5">
              <div className="absolute inset-0 rounded-full border border-warning/40" style={{ animation: 'spin 8s linear infinite', transform: 'rotate(0deg)' }} />
              <div className="absolute inset-2 rounded-full border border-warning/30" style={{ animation: 'spin 4s linear infinite reverse', transform: 'rotate(0deg)' }} />
              <div className="grid h-full w-full place-items-center"><span className="font-mono text-sm font-bold text-warning">STELLAR CORE</span></div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Solar flares accelerate decay station-wide. Prism Orchids sync with radiation waves for timing-based puzzles.</p>
    </div>
  );
}

function FloraCompendium() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {SOLAR_FLORA.map((plant) => (
        <article key={plant.id} className="rounded-2xl border border-border bg-background p-5">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-secondary text-3xl">{plant.glyph}</span>
            <div className="min-w-0">
              <h3 className="font-note text-2xl">{plant.name}</h3>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Temporal signature: {plant.effect}</p>
            </div>
          </div>
          <p className="mt-4 font-note text-lg leading-relaxed text-foreground/80">"{plant.note}"</p>
        </article>
      ))}
    </div>
  );
}

export default function SolarArboretum() {
  const [progress, setProgress] = useState(loadArboretumProgress);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('Prism Orchids refract time-fields. Aim Rewind Roots through them to reach mechanisms in shadows.');
  const [datapad, setDatapad] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('chrono-botanist-arboretum', String(progress));
    } catch {}
  }, [progress]);

  const current = ARBORETUM_SECTORS[Math.min(progress, ARBORETUM_SECTORS.length - 1)];
  const activePlant = SOLAR_FLORA.find((p) => p.id === selected) || SOLAR_FLORA[0];

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-7 md:py-7">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Back to home" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]">
              <ApperIcon name="ArrowLeft" size={17} />
            </Link>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">ORBITAL SECTOR-12 / GLASS WING</p>
              <h1 className="mt-1 font-heading text-2xl font-semibold tracking-tight md:text-3xl">{current.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-warning bg-warning-muted px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-warning">Solar flare active</span>
            <button type="button" onClick={() => setDatapad('radiation')} aria-label="Open radiation map" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]">
              <ApperIcon name="Sun" size={17} />
            </button>
            <button type="button" onClick={() => setDatapad('flora')} aria-label="View flora compendium" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]">
              <ApperIcon name="BookOpen" size={17} />
            </button>
          </div>
        </header>

        <main className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <section className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-4 shadow-md md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">ORBITAL SECTOR / 12</p>
                <p className="mt-1 max-w-xl text-sm text-muted-foreground">{current.goal}</p>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">FIELD // ACTIVE</span>
            </div>
            <div className="relative mt-5 overflow-hidden rounded-[1.5rem] border border-border bg-muted p-3">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 20 }, (_, index) => (
                  <div key={index} className={`relative grid aspect-square place-items-center overflow-hidden rounded-lg border ${index === 7 ? 'border-primary ring-2 ring-primary/30 bg-background' : index % 3 === 0 ? 'border-warning/40 bg-warning/5' : 'border-border bg-background'}`}>
                    <span className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)', backgroundSize: '13px 13px' }} />
                    {index === 7 ? '◈' : index % 4 === 0 ? '☀️' : ''}
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className={`grid h-14 w-14 place-items-center rounded-full border-2 bg-background/30 border-accent text-accent animate-pulse`}>
                  <span className="h-2 w-2 rounded-full bg-current" />
                  <span className="absolute h-7 w-7 rounded-full border border-current opacity-60" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 rounded-lg border border-border bg-card/90 px-3 py-2 backdrop-blur">
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">RETICLE // {activePlant.effect}</p>
                <p className="font-note text-base">{activePlant.name}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 rounded-xl border border-border bg-background px-4 py-3">
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Station telemetry</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">{message}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setSelected('prism')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]">
                  <span>🌸</span> Prism Orchid
                </button>
                <button type="button" onClick={() => setSelected('eclipse')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]">
                  <span>🫧</span> Eclipse Moss
                </button>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-border bg-card p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold">Observation panel</h2>
                <span className="font-mono text-[9px] text-muted-foreground">LIVE</span>
              </div>
            </section>
            <section className="rounded-2xl border border-border bg-muted p-4">
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Current specimen</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-2xl">{activePlant.glyph}</span>
                <div>
                  <p className="font-note text-xl">{activePlant.name}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{activePlant.effect}</p>
                </div>
              </div>
            </section>
          </aside>
        </main>
      </div>

      {datapad && (
        <DatapadFrame onClose={() => setDatapad(null)}>
          {datapad === 'radiation' && (
            <div>
              <div className="mb-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">STELLAR RADIATION ANALYSIS</p>
                <h2 className="mt-1 font-heading text-3xl font-semibold">Solar flare cycles</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Radiation waves periodically accelerate station-wide decay. Prism Orchids sync your planting cycles with these waves.</p>
              </div>
              <SolarRadiationMap />
            </div>
          )}
          {datapad === 'flora' && (
            <div>
              <div className="mb-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">SOLAR ARBORETUM / FLORA</p>
                <h2 className="mt-1 font-heading text-3xl font-semibold">Plants of the glass wing</h2>
                <p className="mt-2 text-sm text-muted-foreground">New hybrids bred from station pressure. Prism Orchids refract and redirect temporal fields around obstacles.</p>
              </div>
              <FloraCompendium />
            </div>
          )}
        </DatapadFrame>
      )}
    </div>
  );
}
