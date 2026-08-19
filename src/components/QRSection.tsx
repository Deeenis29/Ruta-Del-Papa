import { Smartphone, QrCode } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useReveal } from '@/hooks/useReveal';

export function QRSection() {
  const { t } = useLanguage();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container-page">
        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <div className="card p-6 lg:p-10 grid sm:grid-cols-[1fr_auto] items-center gap-6 lg:gap-10 max-w-3xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 text-secondary-600 dark:text-secondary-500 mb-3">
                <Smartphone size={20} />
                <span className="text-sm font-semibold uppercase tracking-wide">{t.qr.title}</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 leading-tight">
                {t.qr.title}
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-2">
                {t.qr.subtitle}
              </p>
              <p className="text-sm text-muted">
                {t.qr.scan}
              </p>
            </div>

            {/* QR Code — stylized placeholder */}
            <div className="flex justify-center">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 bg-white rounded-2xl p-3 border border-border shadow-sm">
                <QrCodeSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QrCodeSection() {
  // Generate a faux QR code pattern
  const grid = Array.from({ length: 21 }, (_, i) =>
    Array.from({ length: 21 }, (_, j) => {
      // Corner squares
      const isCorner = (i < 7 && j < 7) || (i < 7 && j > 13) || (i > 13 && j < 7);
      if (isCorner) {
        const ri = i % 7;
        const rj = j % 7;
        const isBorder = ri === 0 || ri === 6 || rj === 0 || rj === 6;
        const isCenter = ri >= 2 && ri <= 4 && rj >= 2 && rj <= 4;
        return isBorder || isCenter;
      }
      // Pseudo-random pattern
      return ((i * 7 + j * 13 + i * j) % 3) === 0;
    })
  );

  return (
    <svg viewBox="0 0 21 21" className="w-full h-full" aria-label="QR code" role="img">
      <rect width="21" height="21" fill="white" />
      {grid.map((row, i) =>
        row.map((on, j) =>
          on ? <rect key={`${i}-${j}`} x={j} y={i} width={1} height={1} fill="#1F2937" /> : null
        )
      )}
    </svg>
  );
}
