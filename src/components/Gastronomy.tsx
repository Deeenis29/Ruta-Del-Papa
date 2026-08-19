import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useReveal } from '@/hooks/useReveal';
import { dishes, cities, t as translate } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Gastronomy() {
  const { t, lang } = useLanguage();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [activeCity, setActiveCity] = useState<string>('all');

  const cityFilters = [{ id: 'all', name: { es: 'Todas', en: 'All' } }, ...cities.map((c) => ({ id: c.id, name: c.name }))];
  const filtered = activeCity === 'all' ? dishes : dishes.filter((d) => d.cityId === activeCity);

  return (
    <section id="gastronomia" className="py-20 lg:py-28 bg-surface/50 border-y border-border">
      <div className="container-page">
        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <SectionHeading eyebrow={t.gastronomy.title} title={t.gastronomy.title} subtitle={t.gastronomy.subtitle} />

          {/* City filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 mb-10">
            {cityFilters.map((city) => (
              <button
                key={city.id}
                onClick={() => setActiveCity(city.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCity === city.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-background border border-border text-foreground/70 hover:border-primary hover:text-primary'
                }`}
                aria-pressed={activeCity === city.id}
              >
                {translate(lang, city.name)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((dish) => (
              <article key={dish.id} className="card card-hover overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={translate(lang, dish.name)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 inline-flex items-center text-xs font-semibold text-white bg-secondary/80 backdrop-blur-sm rounded-full px-2.5 py-1">
                    {translate(lang, dish.region)}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-1">{translate(lang, dish.name)}</h3>
                  <p className="text-sm text-muted leading-relaxed">{translate(lang, dish.description)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
