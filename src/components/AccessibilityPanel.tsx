import { X, Type, Contrast, Wind, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useLanguage } from '@/context/LanguageContext';

interface AccessibilityPanelProps {
  open: boolean;
  onClose: () => void;
}

export function AccessibilityPanel({ open, onClose }: AccessibilityPanelProps) {
  const { t } = useLanguage();
  const a11y = useAccessibility();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const options = [
    { icon: Type, label: t.accessibility.largeText, desc: t.accessibility.largeTextDesc, value: a11y.largeText, toggle: a11y.toggleLargeText },
    { icon: Contrast, label: t.accessibility.highContrast, desc: t.accessibility.highContrastDesc, value: a11y.highContrast, toggle: a11y.toggleHighContrast },
    { icon: Wind, label: t.accessibility.reduceMotion, desc: t.accessibility.reduceMotionDesc, value: a11y.reduceMotion, toggle: a11y.toggleReduceMotion },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label={t.accessibility.title}>
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-surface rounded-t-3xl sm:rounded-3xl border border-border shadow-2xl w-full sm:max-w-md p-6 animate-slide-up max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-foreground">{t.accessibility.settings}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-foreground/5"
            aria-label={t.map.close}
          >
            <X size={20} />
          </button>
        </div>

        <ul className="space-y-3">
          {options.map((opt) => (
            <li key={opt.label}>
              <button
                onClick={opt.toggle}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                  opt.value ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-foreground/20'
                }`}
                aria-pressed={opt.value}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${opt.value ? 'bg-primary text-white' : 'bg-foreground/5 text-muted'}`}>
                  <opt.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{opt.label}</p>
                  <p className="text-xs text-muted mt-0.5">{opt.desc}</p>
                </div>
                {/* Toggle switch */}
                <div className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${opt.value ? 'bg-primary' : 'bg-border'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${opt.value ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={a11y.reset}
          className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-muted hover:text-foreground border border-border hover:border-foreground/20 transition-colors"
        >
          <RotateCcw size={16} />
          {t.accessibility.reset}
        </button>
      </div>
    </div>
  );
}
