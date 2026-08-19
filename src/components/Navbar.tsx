import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe, Accessibility } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useRoute } from '@/hooks/useRoute';
import type { Lang } from '@/i18n/translations';

interface NavbarProps {
  onOpenAccessibility: () => void;
}

export function Navbar({ onOpenAccessibility }: NavbarProps) {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { route, navigateTo } = useRoute();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [route.path]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems = [
    { key: 'inicio', path: '/' },
    { key: 'ruta', path: '/ruta' },
    { key: 'destinos', path: '/destinos' },
    { key: 'cronograma', path: '/cronograma' },
    { key: 'turismo', path: '/turismo' },
    { key: 'gastronomia', path: '/gastronomia' },
  ] as const;

  const isActive = (path: string) => {
    if (path === '/') return route.path === '/';
    return route.path.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-page flex items-center justify-between h-16 lg:h-20" aria-label="Main navigation">
          {/* Logo */}
          <button
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2.5 group"
            aria-label="La Ruta del Papa - Inicio"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              R
            </span>
            <span className={`font-bold text-lg lg:text-xl transition-colors ${scrolled ? 'text-foreground' : 'text-foreground'}`}>
              La Ruta del Papa
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => navigateTo(item.path)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  {t.nav[item.key]}
                </button>
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language toggle */}
            <div className="flex items-center bg-foreground/5 rounded-lg p-0.5" role="group" aria-label="Language selection">
              {(['es', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase transition-all ${
                    lang === l ? 'bg-primary text-white shadow-sm' : 'text-foreground/60 hover:text-foreground'
                  }`}
                  aria-pressed={lang === l}
                  aria-label={l === 'es' ? 'Español' : 'English'}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
              aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Accessibility */}
            <button
              onClick={onOpenAccessibility}
              className="p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors hidden sm:block"
              aria-label={t.nav.accesibilidad}
            >
              <Accessibility size={20} />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-foreground hover:bg-foreground/5 transition-colors"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-16 left-0 right-0 bg-surface border-b border-border shadow-lg animate-slide-up">
            <ul className="container-page py-4 space-y-1">
              {navItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => navigateTo(item.path)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                      isActive(item.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground hover:bg-foreground/5'
                    }`}
                  >
                    {t.nav[item.key]}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-border mt-2">
                <button
                  onClick={() => { onOpenAccessibility(); setMobileOpen(false); }}
                  className="w-full text-left px-4 py-3.5 rounded-xl text-base font-medium text-foreground hover:bg-foreground/5 flex items-center gap-3"
                >
                  <Accessibility size={20} />
                  {t.nav.accesibilidad}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
