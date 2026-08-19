import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useReveal } from '@/hooks/useReveal';
import { useRoute } from '@/hooks/useRoute';
import { touristPlaces, cities, t as translate, type TouristPlace } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Category = 'all' | TouristPlace['category'];

export function Tourism() {
  const { t, lang } = useLanguage();
  const { navigateTo } = useRoute();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [category, setCategory] = useState<Category>('all');

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: lang === 'es' ? 'Todos' : 'All' },
    { key: 'cultura', label: t.tourism.categories.cultura },
    { key: 'historia', label: t.tourism.categories.historia },
    { key: 'naturaleza', label: t.tourism.categories.naturaleza },
    { key: 'gastronomia', label: t.tourism.categories.gastronomia },
    { key: 'artesania', label: t.tourism.categories.artesania },
  ];

  const filtered = category === 'all' ? touristPlaces : touristPlaces.filter((p) => p.category === category);

  return (
    <section id="turismo" className="py-20 lg:py-28 bg-background">
      <div className="container-page">
        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <SectionHeading eyebrow={t.tourism.title} title={t.tourism.title} subtitle={t.tourism.subtitle} />

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat.key
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface border border-border text-foreground/70 hover:border-primary hover:text-primary'
                }`}
                aria-pressed={category === cat.key}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {filtered.map((place) => {
              const city = cities.find((c) => c.id === place.cityId);
              return (
                <article key={place.id} className="card card-hover overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <img src={place.image} alt={translate(lang, place.name)} className="w-full h-full object-cover" loading="lazy" />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-semibold text-white bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
                      {t.tourism.categories[place.category]}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-foreground text-lg mb-1">{translate(lang, place.name)}</h3>
                    <p className="text-sm text-muted mb-3">{translate(lang, place.description)}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="inline-flex items-center gap-1 text-xs font-medium text-secondary-600 dark:text-secondary-500">
                        <MapPin size={12} />
                        {translate(lang, place.location)}
                      </p>
                      {city && (
                        <button
                          onClick={() => navigateTo(`/destino/${city.id}`)}
                          className="text-xs font-semibold text-primary hover:underline shrink-0"
                        >
                          {translate(lang, city.name)}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
