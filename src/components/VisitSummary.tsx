import { Calendar, Clock, Globe2, MapPinned } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useReveal } from '@/hooks/useReveal';
import { cities, t as translate } from '@/data/content';

export function VisitSummary() {
  const { t, lang } = useLanguage();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const stats = [
    { icon: Calendar, label: t.summary.date, value: t.summary.dateValue },
    { icon: Clock, label: t.summary.duration, value: t.summary.durationValue },
    { icon: Globe2, label: t.summary.country, value: t.summary.countryValue },
    { icon: MapPinned, label: t.summary.cities, value: t.summary.citiesValue },
  ];

  return (
    <section id="resumen" className="py-20 lg:py-28 bg-background">
      <div className="container-page">
        <div
          ref={ref}
          className={`reveal ${visible ? 'reveal-visible' : ''}`}
        >
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">{t.summary.title}</p>
            <h2 className="section-title">{t.summary.title}</h2>
            <p className="section-subtitle mx-auto">{t.summary.subtitle}</p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="card p-5 lg:p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 text-secondary-600 dark:text-secondary-500 mb-3">
                  <stat.icon size={24} />
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* City timeline */}
          <div className="relative">
            {/* Desktop horizontal line */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-border" aria-hidden="true" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
              {cities.map((city, idx) => (
                <div key={city.id} className="relative">
                  {/* Dot on timeline */}
                  <div className="hidden lg:flex absolute top-6 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background z-10" aria-hidden="true" />

                  <div className="card card-hover p-5 lg:mt-16">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-white bg-primary rounded-full w-6 h-6 flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-secondary-600 dark:text-secondary-500">
                        {translate(lang, city.visitDate)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {translate(lang, city.name)}
                    </h3>
                    <p className="text-sm text-muted">
                      {translate(lang, city.region)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
