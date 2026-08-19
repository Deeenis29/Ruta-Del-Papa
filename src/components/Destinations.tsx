import { ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useReveal } from '@/hooks/useReveal';
import { useRoute } from '@/hooks/useRoute';
import { cities, t as translate } from '@/data/content';

export function Destinations() {
  const { t, lang } = useLanguage();
  const { navigateTo } = useRoute();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="destinos" className="py-20 lg:py-28 bg-background">
      <div className="container-page">
        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">{t.destinations.title}</p>
            <h2 className="section-title">{t.destinations.title}</h2>
            <p className="section-subtitle mx-auto">{t.destinations.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {cities.map((city) => (
              <article key={city.id} className="card card-hover group cursor-pointer" onClick={() => navigateTo(`/destino/${city.id}`)}>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={city.heroImage}
                    alt={translate(lang, city.name)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold mb-1 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <Calendar size={11} />
                      {translate(lang, city.visitDate)}
                    </div>
                    <h3 className="text-2xl font-bold leading-tight">{translate(lang, city.name)}</h3>
                    <p className="text-sm opacity-80">{translate(lang, city.region)}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3 mb-4">
                    {translate(lang, city.description)}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    {t.destinations.explore}
                    <ArrowRight size={16} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
