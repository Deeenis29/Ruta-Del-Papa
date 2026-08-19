import { ArrowLeft, Clock, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useRoute } from '@/hooks/useRoute';
import { getCityById, getEventsByCity, getCircuitByCity, getTourismByCity, getDishesByCity, getGalleryByCity, t as translate } from '@/data/content';
import { RegionGallery } from '@/components/region/RegionGallery';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function RegionPage({ cityId }: { cityId: string }) {
  const { t, lang } = useLanguage();
  const { navigateTo } = useRoute();
  const city = getCityById(cityId);

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-lg text-muted mb-4">Ciudad no encontrada</p>
          <button onClick={() => navigateTo('/destinos')} className="btn-primary">
            {t.region.back}
          </button>
        </div>
      </div>
    );
  }

  const events = getEventsByCity(cityId);
  const circuit = getCircuitByCity(cityId);
  const tourism = getTourismByCity(cityId);
  const dishes = getDishesByCity(cityId);
  const gallery = getGalleryByCity(cityId);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Banner */}
      <section className="relative h-[50vh] min-h-[320px] lg:h-[60vh] overflow-hidden">
        <img
          src={city.heroImage}
          alt={translate(lang, city.name)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 text-white">
          <div className="container-page">
            <button
              onClick={() => navigateTo('/destinos')}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={16} />
              {t.region.back}
            </button>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
              {translate(lang, city.name)}
            </h1>
            <p className="text-lg text-white/80 mb-3">{translate(lang, city.region)}</p>
            <div className="inline-flex items-center gap-2 bg-secondary/90 rounded-full px-4 py-1.5 text-sm font-semibold">
              <Clock size={14} />
              {translate(lang, city.visitDate)}
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container-page max-w-3xl">
          <p className="text-lg text-foreground/80 leading-relaxed">
            {translate(lang, city.description)}
          </p>
        </div>
      </section>

      {/* Circuit */}
      {circuit.length > 0 && (
        <section className="py-12 lg:py-16 bg-surface/50 border-y border-border">
          <div className="container-page">
            <SectionHeading title={t.region.circuit} subtitle={t.region.circuitDesc} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {circuit.map((point) => (
                <div key={point.id} className="card p-4 flex items-start gap-3">
                  <div className="flex flex-col items-center justify-center bg-primary/10 rounded-xl px-3 py-2 shrink-0">
                    <span className="text-sm font-bold text-primary">{point.time}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-sm leading-snug">
                      {translate(lang, point.name)}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">{translate(lang, point.description)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="py-12 lg:py-16 bg-background">
          <div className="container-page">
            <SectionHeading title={t.region.gallery} />
            <div className="mt-8">
              <RegionGallery items={gallery} />
            </div>
          </div>
        </section>
      )}

      {/* Tourism */}
      {tourism.length > 0 && (
        <section className="py-12 lg:py-16 bg-surface/50 border-y border-border">
          <div className="container-page">
            <SectionHeading title={t.region.tourism} subtitle={t.region.tourismDesc} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {tourism.map((place) => (
                <article key={place.id} className="card card-hover overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
                    <img src={place.image} alt={translate(lang, place.name)} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-1">{translate(lang, place.name)}</h3>
                    <p className="text-sm text-muted mb-2">{translate(lang, place.description)}</p>
                    <p className="inline-flex items-center gap-1 text-xs font-medium text-secondary-600 dark:text-secondary-500">
                      <MapPin size={12} />
                      {translate(lang, place.location)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gastronomy */}
      {dishes.length > 0 && (
        <section className="py-12 lg:py-16 bg-background">
          <div className="container-page">
            <SectionHeading title={t.region.gastronomy} subtitle={t.region.gastronomyDesc} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {dishes.map((dish) => (
                <article key={dish.id} className="card card-hover overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
                    <img src={dish.image} alt={translate(lang, dish.name)} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-foreground">{translate(lang, dish.name)}</h3>
                      <span className="text-xs font-medium text-secondary-600 dark:text-secondary-500 shrink-0">
                        {translate(lang, dish.region)}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{translate(lang, dish.description)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Schedule preview */}
      {events.length > 0 && (
        <section className="py-12 lg:py-16 bg-surface/50 border-y border-border">
          <div className="container-page">
            <SectionHeading title={t.schedule.title} />
            <div className="mt-8 space-y-3 max-w-2xl">
              {events.map((event) => (
                <div key={event.id} className="card p-4 flex items-center gap-4">
                  <div className="flex flex-col items-center bg-background rounded-xl px-3 py-2 border border-border shrink-0">
                    <span className="text-lg font-bold text-primary leading-none">
                      {new Date(event.date + 'T00:00:00').getDate()}
                    </span>
                    <span className="text-xs text-muted">Nov</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted mb-0.5">
                      <Clock size={12} /> {event.time}
                    </div>
                    <p className="text-sm font-semibold text-foreground leading-snug">
                      {translate(lang, event.activity)}
                    </p>
                    <p className="text-xs text-muted">{translate(lang, event.place)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
