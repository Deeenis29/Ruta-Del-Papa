import { useEffect, useState, useCallback } from 'react';

export interface RouteState {
  path: string;
  params: Record<string, string>;
}

export function getRouteFromHash(): RouteState {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const parts = hash.split('/').filter(Boolean);
  if (parts.length === 0) return { path: '/', params: {} };
  if (parts[0] === 'destino' && parts[1]) {
    return { path: `/destino/${parts[1]}`, params: { cityId: parts[1] } };
  }
  if (parts[0] === 'ruta') return { path: '/ruta', params: {} };
  if (parts[0] === 'destinos') return { path: '/destinos', params: {} };
  if (parts[0] === 'cronograma') return { path: '/cronograma', params: {} };
  if (parts[0] === 'turismo') return { path: '/turismo', params: {} };
  if (parts[0] === 'gastronomia') return { path: '/gastronomia', params: {} };
  if (parts[0] === 'galeria') return { path: '/galeria', params: {} };
  if (parts[0] === 'privacidad') return { path: '/privacidad', params: {} };
  if (parts[0] === 'fuentes') return { path: '/fuentes', params: {} };
  return { path: '/', params: {} };
}

export function navigate(to: string) {
  window.location.hash = to;
}

export function useRoute() {
  const [route, setRoute] = useState<RouteState>(() => getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = useCallback((to: string) => {
    window.location.hash = to;
  }, []);

  return { route, navigateTo };
}
