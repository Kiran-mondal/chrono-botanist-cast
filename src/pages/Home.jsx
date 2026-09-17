import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

export const route = { path: '/', layout: 'public', access: 'public' };

const features = [
  { icon: 'RotateCcw', title: 'Rewind roots', text: 'Restore broken paths by pulling a small piece of the station back through time.' },
  { icon: 'FastForward', title: 'Fast-forward ferns', text: 'Age metal, machines, and obstacles until they become ready to cross.' },
  { icon: 'GitMerge', title: 'Crossbreed effects', text: 'Combine alien traits in the greenhouse to discover new temporal reactions.' },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.1fr_.9fr] md:px-8 md:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success" /> A quiet puzzle garden on a forgotten station
            </div>
            <h1 className="max-w-3xl font-heading text-5xl leading-[1.02] tracking-tight md:text-7xl">Grow something that remembers tomorrow.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">You are the last gardener aboard an abandoned space station. Plant strange seeds, bend local time, and bring overgrown sectors back to life one satisfying puzzle at a time.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/garden" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]">
                Enter the greenhouse <ApperIcon name="ArrowRight" size={17} />
              </Link>
              <a href="#how-it-works" className="inline-flex items-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]">How it works</a>
            </div>
          </div>
          <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] border border-border bg-muted p-5 shadow-md">
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(circle at 25% 20%, var(--secondary) 0 2px, transparent 3px), radial-gradient(circle at 75% 65%, var(--accent) 0 1px, transparent 2px)', backgroundSize: '42px 42px, 61px 61px' }} />
            <div className="relative grid h-full place-items-center">
              <div className="w-full max-w-sm rounded-[1.75rem] border border-border bg-card p-5 shadow-lg">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div><p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Sector 01</p><p className="mt-1 font-heading text-2xl">Glassway</p></div>
                  <span className="rounded-full bg-success-muted px-3 py-1 text-xs font-semibold text-success">Restored</span>
                </div>
                <div className="mt-5 grid grid-cols-4 gap-2">
                  {['🌱','🌿','🌱','🪨','🌳','🌱','🌿','🔒','🌱','🌳','🌿','🌱'].map((icon, index) => <span key={index} className="grid aspect-square place-items-center rounded-xl border border-border bg-background text-xl">{icon}</span>)}
                </div>
                <div className="mt-5 flex items-center gap-3 rounded-xl bg-secondary p-3 text-sm text-secondary-foreground"><ApperIcon name="Clock3" size={18} /><span>Local time field: <strong>stable</strong></span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">The temporal garden</p><h2 className="mt-2 font-heading text-4xl md:text-5xl">Three ideas. Endless little “aha” moments.</h2></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => <article key={feature.title} className="rounded-2xl border border-border bg-card p-6 shadow-xs transition hover:-translate-y-1 hover:shadow-md"><div className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-secondary-foreground"><ApperIcon name={feature.icon} size={20} /></div><h3 className="mt-5 font-heading text-2xl">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.text}</p></article>)}
        </div>
      </section>

      <section className="border-y border-border bg-muted">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1fr_auto] md:items-center md:px-8">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">No rush</p><h2 className="mt-2 font-heading text-4xl">The station is broken. You don't have to be.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Explore at your own pace. There are no timers, no combat, and no wrong way to tend the garden.</p></div>
          <Link to="/garden" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]">Start growing <ApperIcon name="Sprout" size={17} /></Link>
        </div>
      </section>
    </div>
  );
}
