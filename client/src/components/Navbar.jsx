import { Menu, Calendar, Sun, Moon } from 'lucide-react';
import { useLocation } from 'react-router-dom';


export function Navbar({ onMenuOpen }) {


  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path.startsWith('/dashboard/projects/')) return 'Project Details';
    if (path === '/dashboard/projects') return 'Projects';
    if (path === '/dashboard/analytics') return 'Analytics';
    if (path === '/dashboard/profile') return 'Profile';
    if (path === '/dashboard/settings') return 'Settings';
    return 'TaskFlow';
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuOpen}
          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold font-display text-slate-800 dark:text-slate-100">
          {getPageTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="p-2 text-slate-450 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-100 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm transition-all"
          title={`Switch to  Mode`}
        >
          
        </button>

        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-300 text-xs font-semibold bg-slate-50 dark:bg-slate-850 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </header>
  );
}
