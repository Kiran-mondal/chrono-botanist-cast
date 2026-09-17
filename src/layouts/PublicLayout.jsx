import { Link, Outlet } from 'react-router-dom';
import { APP_CONFIG } from '@/config/app.config';
import ApperIcon from '@/components/ApperIcon';
import ThemeToggle from '@/components/ThemeToggle';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-(--z-sticky) border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link to="/" className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <ApperIcon name={APP_CONFIG.icon} size={19} />
            </span>
            <span className="font-heading text-lg font-bold">{APP_CONFIG.name}</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/garden" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]">Play</Link>
          </div>
        </div>
      </header>
      <main><Outlet /></main>
    </div>
  );
}
