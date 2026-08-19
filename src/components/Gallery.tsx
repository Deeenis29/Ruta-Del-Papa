import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useReveal } from '@/hooks/useReveal';
import { galleryItems, cities, t as translate } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Filter = 'all' | 'photo' | 'video' | string;

export function Gallery() {
  const { t, lang } = useLanguage();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<Filter>('all');
  const [active, setActive] = useState<number | null>(null);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t.gallery.all },
    { key: 'photo', label: t.gallery.photos },
    { key: 'video', label: t.gallery.videos },
    ...cities.map((c) => ({ key: c.id as Filter, label: translate(lang, c.name) })),
  ];

  const filtered = galleryItems.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'photo' || filter === 'video') return item.type === filter;
    return item.cityId === filter;
  });

  return (
    <section id="galeria" className="py-20 lg:py-28 bg-background">
      <div className="container-page">
        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <SectionHeading eyebrow={t.gallery.title} title={t.gallery.title} subtitle={t.gallery.subtitle} />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 mb-10">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f.key
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface border border-border text-foreground/70 hover:border-primary hover:text-primary'
                }`}
                aria-pressed={filter === f.key}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 [&>*]:mb-3 sm:[&>*]:mb-4">
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActive(idx)}
                className="relative w-full rounded-xl overflow-hidden group break-inside-avoid focus-visible:ring-2 focus-visible:ring-primary block"
                aria-label={translate(lang, item.caption)}
              >
                <img
                  src={item.image}
                  alt={translate(lang, item.caption)}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-xs font-medium text-left">{translate(lang, item.caption)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && filtered[active] && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <img
            src={filtered[active].image}
            alt={translate(lang, filtered[active].caption)}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-0 right-0 text-center text-white text-sm">
            {translate(lang, filtered[active].caption)}
          </p>
        </div>
      )}
    </section>
  );
}
