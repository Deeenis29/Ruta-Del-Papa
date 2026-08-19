import { useState } from 'react';
import { X } from 'lucide-react';
import type { GalleryItem } from '@/data/content';
import { useLanguage } from '@/context/LanguageContext';
import { t as translate } from '@/data/content';

export function RegionGallery({ items }: { items: GalleryItem[] }) {
  const { lang } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActive(idx)}
            className="relative aspect-square rounded-xl overflow-hidden group focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={translate(lang, item.caption)}
          >
            <img
              src={item.image}
              alt={translate(lang, item.caption)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity text-left">
              {translate(lang, item.caption)}
            </p>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && items[active] && (
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
            src={items[active].image}
            alt={translate(lang, items[active].caption)}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-0 right-0 text-center text-white text-sm">
            {translate(lang, items[active].caption)}
          </p>
        </div>
      )}
    </>
  );
}
