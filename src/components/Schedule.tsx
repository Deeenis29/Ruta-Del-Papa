import { Clock, MapPin, CheckCircle2, Circle, Radio } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useReveal } from '@/hooks/useReveal';
import { scheduleEvents, cities, t as translate } from '@/data/content';

export function Schedule() {
  const { t, lang } = useLanguage();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const statusConfig = {
    upcoming: { label: t.schedule.upcoming, icon: Circle, className: 'bg-secondary/10 text-secondary-600 dark:text-secondary-500 border-secondary/30', dot: 'bg-secondary' },
    ongoing: { label: t.schedule.ongoing, icon: Radio, className: 'bg-primary/10 text-primary border-primary/30', dot: 'bg-primary animate-pulse' },
    finished: { label: t.schedule.finished, icon: CheckCircle2, className: 'bg-foreground/5 text-muted border-border', dot: 'bg-muted' },
  } as const;

  const sortedEvents = [...scheduleEvents].sort((a, b) => {
    return (a.date + a.time).localeCompare(b.date + b.time);
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    const months = lang === 'es'
      ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      day: date.getDate(),
      month: months[date.getMonth()],
    };
  };

  return (
    <section id="cronograma" className="py-20 lg:py-28 bg-background">
      <div className="container-page">
        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">{t.schedule.title}</p>
            <h2 className="section-title">{t.schedule.title}</h2>
            <p className="section-subtitle mx-auto">{t.schedule.subtitle}</p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-0.5 bg-border" aria-hidden="true" />

            <ol className="space-y-4">
              {sortedEvents.map((event) => {
                const city = cities.find((c) => c.id === event.cityId);
                const status = statusConfig[event.status];
                const date = formatDate(event.date);

                return (
                  <li key={event.id} className="relative pl-12 sm:pl-16">
                    {/* Dot */}
                    <div className={`absolute left-[9px] sm:left-[17px] top-3 w-3.5 h-3.5 rounded-full ${status.dot} border-2 border-background z-10`} />

                    {/* Card */}
                    <div className="card p-4 sm:p-5 hover:border-primary/20 transition-colors">
                      <div className="flex flex-wrap items-start gap-3">
                        {/* Date block */}
                        <div className="flex flex-col items-center justify-center bg-background rounded-xl px-3 py-2 border border-border shrink-0 min-w-[56px]">
                          <span className="text-xl font-bold text-primary leading-none">{date.day}</span>
                          <span className="text-xs font-medium text-muted uppercase">{date.month}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/60">
                              <Clock size={12} />
                              {event.time}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/60">
                              <MapPin size={12} />
                              {city ? translate(lang, city.name) : ''}
                            </span>
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${status.className}`}>
                              <status.icon size={11} />
                              {status.label}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug mb-1">
                            {translate(lang, event.activity)}
                          </h3>
                          <p className="text-sm text-muted">{translate(lang, event.place)}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
