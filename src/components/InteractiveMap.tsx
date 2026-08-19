import { useState } from 'react';
import { MapPin, X, Calendar, Building2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useReveal } from '@/hooks/useReveal';
import { useRoute } from '@/hooks/useRoute';
import { cities, t as translate, type City } from '@/data/content';

export function InteractiveMap() {
  const { t, lang } = useLanguage();
  const { navigateTo } = useRoute();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<City | null>(null);

  return (
    <section id="ruta" className="py-20 lg:py-28 bg-surface/50 border-y border-border">
      <div className="container-page">
        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">{t.map.title}</p>
            <h2 className="section-title">{t.map.title}</h2>
            <p className="section-subtitle mx-auto">{t.map.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Map */}
            <div className="relative">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-gradient-to-b from-background to-surface rounded-3xl border border-border overflow-hidden p-4">
                <PeruMap selected={selected} onSelect={setSelected} />
              </div>
            </div>

            {/* Desktop info panel */}
            <div className="hidden lg:block">
              {selected ? (
                <CityInfoCard city={selected} onClose={() => setSelected(null)} onExplore={() => navigateTo(`/destino/${selected.id}`)} />
              ) : (
                <div className="card p-8 text-center">
                  <MapPin size={40} className="mx-auto text-muted mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">{t.map.selectCity}</p>
                  <div className="flex flex-wrap gap-2 justify-center mt-6">
                    {cities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => setSelected(city)}
                        className="px-4 py-2 rounded-lg bg-background border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        {translate(lang, city.name)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {selected && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setSelected(null)} aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-3xl border-t border-border shadow-2xl animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-surface pt-3 pb-2 px-4 border-b border-border">
              <div className="w-10 h-1 rounded-full bg-border mx-auto mb-2" aria-hidden="true" />
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-3 p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-foreground/5"
                aria-label={t.map.close}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <CityInfoCard city={selected} onClose={() => setSelected(null)} onExplore={() => navigateTo(`/destino/${selected.id}`)} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CityInfoCard({ city, onClose, onExplore }: { city: City; onClose: () => void; onExplore: () => void }) {
  const { t, lang } = useLanguage();
  return (
    <div className="card overflow-hidden">
      <div className="relative h-40 sm:h-48">
        <img src={city.heroImage} alt={translate(lang, city.name)} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <button
          onClick={onClose}
          className="hidden lg:flex absolute top-3 right-3 p-2 rounded-lg bg-surface/80 backdrop-blur-sm text-foreground hover:bg-surface"
          aria-label={t.map.close}
        >
          <X size={18} />
        </button>
        <div className="absolute bottom-3 left-4 text-white">
          <h3 className="text-2xl font-bold">{translate(lang, city.name)}</h3>
          <p className="text-sm opacity-90">{translate(lang, city.region)}</p>
        </div>
      </div>
      <div className="p-5 lg:p-6 space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <Calendar size={18} className="text-secondary-600 dark:text-secondary-500 shrink-0" />
          <div>
            <p className="text-xs text-muted">{t.map.date}</p>
            <p className="font-semibold text-foreground">{translate(lang, city.visitDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Building2 size={18} className="text-secondary-600 dark:text-secondary-500 shrink-0" />
          <div>
            <p className="text-xs text-muted">{t.map.place}</p>
            <p className="font-semibold text-foreground">{translate(lang, city.mainVenue)}</p>
          </div>
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed">
          {translate(lang, city.description)}
        </p>
        <button onClick={onExplore} className="btn-primary w-full">
          {t.map.moreInfo}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function PeruMap({ selected, onSelect }: { selected: City | null; onSelect: (city: City) => void }) {
  const { lang } = useLanguage();

  return (
    <svg
      viewBox="0 0 100 130"
      className="w-full h-full"
      role="img"
      aria-label="Mapa del Perú con las ciudades visitadas"
    >
      {/* Simplified Peru outline */}
      <path
        d="M 18 15 L 25 10 L 35 8 L 45 10 L 55 8 L 62 12 L 68 18 L 72 25 L 70 32 L 66 38 L 62 42 L 66 48 L 70 52 L 68 58 L 64 64 L 58 68 L 52 72 L 48 78 L 46 85 L 44 92 L 42 100 L 40 108 L 38 115 L 36 120 L 33 125 L 30 122 L 28 115 L 26 105 L 24 95 L 22 85 L 20 75 L 18 65 L 16 55 L 15 45 L 16 35 L 17 25 Z"
        className="fill-foreground/5 stroke-border"
        strokeWidth="0.5"
      />

      {/* Connection line between cities */}
      <g className="stroke-primary/40" strokeWidth="0.4" strokeDasharray="1.5,1" fill="none">
        <line x1={cities[0].coordinates.x} y1={cities[0].coordinates.y} x2={cities[1].coordinates.x} y2={cities[1].coordinates.y} />
        <line x1={cities[1].coordinates.x} y1={cities[1].coordinates.y} x2={cities[2].coordinates.x} y2={cities[2].coordinates.y} />
        <line x1={cities[2].coordinates.x} y1={cities[2].coordinates.y} x2={cities[3].coordinates.x} y2={cities[3].coordinates.y} />
        <line x1={cities[3].coordinates.x} y1={cities[3].coordinates.y} x2={cities[0].coordinates.x} y2={cities[0].coordinates.y} />
      </g>

      {/* City markers */}
      {cities.map((city) => {
        const isSelected = selected?.id === city.id;
        return (
          <g
            key={city.id}
            transform={`translate(${city.coordinates.x}, ${city.coordinates.y})`}
            onClick={() => onSelect(city)}
            role="button"
            tabIndex={0}
            aria-label={`${translate(lang, city.name)} - ${translate(lang, city.visitDate)}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(city); } }}
            className="cursor-pointer focus:outline-none"
          >
            {/* Pulse ring for selected */}
            {isSelected && <circle r="5" className="fill-primary/20 animate-ping" />}
            {/* Marker */}
            <circle
              r={isSelected ? 3 : 2.2}
              className={isSelected ? 'fill-primary' : 'fill-primary/80'}
              stroke="white"
              strokeWidth="0.6"
            />
            {/* Label */}
            <text
              x="0"
              y={isSelected ? -5 : -4}
              textAnchor="middle"
              className="fill-foreground font-semibold pointer-events-none"
              style={{ fontSize: '3.5px', fontWeight: 600 }}
            >
              {translate(lang, city.name)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
