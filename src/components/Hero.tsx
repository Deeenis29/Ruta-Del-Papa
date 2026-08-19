import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCountdown } from '@/hooks/useCountdown';
import { useRoute } from '@/hooks/useRoute';

export function Hero() {
  const { t } = useLanguage();
  const { navigateTo } = useRoute();
  const countdown = useCountdown();

  const timeUnits = [
    { value: countdown.days, label: t.hero.days },
    { value: countdown.hours, label: t.hero.hours },
    { value: countdown.minutes, label: t.hero.minutes },
    { value: countdown.seconds, label: t.hero.seconds },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label={t.hero.title}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/16198544/pexels-photo-16198544.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-page pt-20 pb-12 text-center">
        <div className="animate-fade-in-up">
          {/* Date badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/15 text-secondary-700 dark:text-secondary-500 border border-secondary/30 mb-6">
            <Calendar size={16} className="shrink-0" />
            <span className="text-sm font-semibold tracking-wide">{t.hero.dates}</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[1.05] mb-6">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-foreground/70 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Countdown */}
          {!countdown.done && (
            <div className="mb-10" aria-label={t.hero.countdown}>
              <p className="text-sm font-medium text-foreground/50 mb-3 uppercase tracking-wider">
                {t.hero.countdown}
              </p>
              <div className="flex justify-center gap-2 sm:gap-3">
                {timeUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center bg-surface/90 backdrop-blur-sm rounded-xl px-3 py-3 sm:px-5 sm:py-4 min-w-[64px] sm:min-w-[90px] border border-border shadow-sm"
                  >
                    <span className="text-2xl sm:text-4xl font-bold text-primary tabular-nums leading-none">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] sm:text-xs font-medium text-foreground/60 mt-1.5 uppercase tracking-wide">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => navigateTo('/ruta')}
              className="btn-primary btn-lg w-full sm:w-auto"
            >
              <MapPin size={20} />
              {t.hero.explore}
            </button>
            <button
              onClick={() => navigateTo('/cronograma')}
              className="btn-outline btn-lg w-full sm:w-auto"
            >
              <Calendar size={20} />
              {t.hero.schedule}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => {
          document.getElementById('resumen')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-foreground/50 hover:text-foreground transition-colors"
        aria-label={t.hero.scroll}
      >
        <span className="block text-xs font-medium mb-1">{t.hero.scroll}</span>
        <ChevronDown size={24} className="mx-auto animate-bounce-soft" />
      </button>
    </section>
  );
}
