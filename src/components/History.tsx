import { useLanguage } from '@/context/LanguageContext';
import { useReveal } from '@/hooks/useReveal';
import { historyContent } from '@/data/content';

export function History() {
  const { t, lang } = useLanguage();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const items = historyContent[lang];

  return (
    <section id="historia" className="py-20 lg:py-28 bg-surface/50 border-y border-border">
      <div className="container-page">
        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">{t.history.title}</p>
            <h2 className="section-title">{t.history.title}</h2>
            <p className="section-subtitle mx-auto">{t.history.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="https://images.pexels.com/photos/16198544/pexels-photo-16198544.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt={lang === 'es' ? 'Iglesia colonial en el Perú' : 'Colonial church in Peru'}
                  className="w-full h-[400px] lg:h-[520px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Floating quote card */}
              <div className="absolute -bottom-6 -left-2 lg:-left-6 max-w-xs bg-surface rounded-2xl shadow-xl border border-border p-5">
                <p className="text-sm text-foreground leading-relaxed italic">
                  {lang === 'es'
                    ? '"El Perú es la tierra que formó mi vocación. Regresar es regresar a casa."'
                    : '"Peru is the land that shaped my vocation. Returning is coming home."'}
                </p>
                <p className="text-xs font-semibold text-secondary-600 dark:text-secondary-500 mt-3">
                  — {lang === 'es' ? 'Papa León XIV' : 'Pope Leo XIV'}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="order-2 lg:order-1 relative">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" aria-hidden="true" />
              <ol className="space-y-6">
                {items.map((item, idx) => (
                  <li key={idx} className="relative pl-12">
                    <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background z-10" />
                    <p className="text-sm font-bold text-secondary-600 dark:text-secondary-500 mb-1">
                      {item.year}
                    </p>
                    <h3 className="text-lg font-bold text-foreground mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
