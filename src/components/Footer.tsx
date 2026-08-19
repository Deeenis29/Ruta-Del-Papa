import { ExternalLink, Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useRoute } from '@/hooks/useRoute';

export function Footer({ onOpenAccessibility }: { onOpenAccessibility: () => void }) {
  const { t } = useLanguage();
  const { navigateTo } = useRoute();

  const navLinks = [
    { label: t.nav.inicio, path: '/' },
    { label: t.nav.ruta, path: '/ruta' },
    { label: t.nav.destinos, path: '/destinos' },
    { label: t.nav.cronograma, path: '/cronograma' },
    { label: t.nav.turismo, path: '/turismo' },
    { label: t.nav.gastronomia, path: '/gastronomia' },
  ];

  const legalLinks = [
    { label: t.nav.accesibilidad, action: onOpenAccessibility },
    { label: t.footer.privacy, path: '/privacidad' },
    { label: t.footer.sourcesLink, path: '/fuentes' },
  ];

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white font-bold text-lg">
                R
              </span>
              <span className="font-bold text-lg text-foreground">La Ruta del Papa</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-md mb-4">
              {t.footer.tagline}
            </p>
            <p className="text-sm text-muted leading-relaxed max-w-md">
              {t.footer.disclaimer}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              {t.footer.links}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigateTo(link.path)}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              {t.footer.legal}
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  {link.action ? (
                    <button
                      onClick={link.action}
                      className="text-sm text-muted hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <button
                      onClick={() => link.path && navigateTo(link.path)}
                      className="text-sm text-muted hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sources note */}
        <div className="mt-10 pt-6 border-t border-border">
          <div className="flex items-start gap-2 text-sm text-muted">
            <Shield size={16} className="shrink-0 mt-0.5 text-secondary-600 dark:text-secondary-500" />
            <p>{t.footer.sources}</p>
          </div>
          <p className="text-xs text-muted mt-4">
            © 2026 La Ruta del Papa. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
