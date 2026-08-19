import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface AccessibilityState {
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
}

interface AccessibilityContextValue extends AccessibilityState {
  toggleLargeText: () => void;
  toggleHighContrast: () => void;
  toggleReduceMotion: () => void;
  reset: () => void;
  setFromObject: (state: AccessibilityState) => void;
}

const defaults: AccessibilityState = {
  largeText: false,
  highContrast: false,
  reduceMotion: false,
};

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccessibilityState>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lrp-a11y');
      if (stored) {
        try { return { ...defaults, ...JSON.parse(stored) }; } catch { /* ignore */ }
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return { ...defaults, reduceMotion: true };
      }
    }
    return defaults;
  });

  useEffect(() => {
    localStorage.setItem('lrp-a11y', JSON.stringify(state));
    const root = document.documentElement;
    root.classList.toggle('a11y-large-text', state.largeText);
    root.classList.toggle('a11y-high-contrast', state.highContrast);
    root.classList.toggle('a11y-reduce-motion', state.reduceMotion);
  }, [state]);

  const toggle = (key: keyof AccessibilityState) =>
    setState((s) => ({ ...s, [key]: !s[key] }));

  return (
    <AccessibilityContext.Provider
      value={{
        ...state,
        toggleLargeText: () => toggle('largeText'),
        toggleHighContrast: () => toggle('highContrast'),
        toggleReduceMotion: () => toggle('reduceMotion'),
        reset: () => setState(defaults),
        setFromObject: (newState) => setState(newState),
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
}
