import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquare, MapPin, Mail, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';
import { cities, t as translate } from '@/data/content';

export function ShareExperience() {
  const { t, lang } = useLanguage();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [experience, setExperience] = useState('');
  const [region, setRegion] = useState('');
  const [improvement, setImprovement] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!experience.trim() || !region) return;

    setStatus('submitting');
    try {
      const { error } = await supabase.from('feedback_submissions').insert({
        experience: experience.trim(),
        region,
        improvement: improvement.trim() || null,
        email: email.trim() || null,
        lang,
      });

      if (error) throw error;

      setStatus('success');
      setExperience('');
      setRegion('');
      setImprovement('');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="compartir" className="py-20 lg:py-28 bg-surface/50 border-t border-border">
      <div className="container-page">
        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="eyebrow mb-3">{t.share.title}</p>
              <h2 className="section-title">{t.share.title}</h2>
              <p className="section-subtitle mx-auto">{t.share.subtitle}</p>
            </div>

            {status === 'success' ? (
              <div className="card p-8 text-center" role="status" aria-live="polite">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <p className="text-lg font-semibold text-foreground mb-2">{t.share.success}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-sm font-medium text-primary hover:underline"
                >
                  {lang === 'es' ? 'Enviar otro comentario' : 'Submit another response'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 lg:p-8 space-y-5">
                {/* Experience */}
                <div>
                  <label htmlFor="experience" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                    <MessageSquare size={16} className="text-secondary-600 dark:text-secondary-500" />
                    {t.share.experience}
                  </label>
                  <textarea
                    id="experience"
                    required
                    rows={4}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder={t.share.experiencePlaceholder}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/60 focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>

                {/* Region */}
                <div>
                  <label htmlFor="region" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                    <MapPin size={16} className="text-secondary-600 dark:text-secondary-500" />
                    {t.share.region}
                  </label>
                  <select
                    id="region"
                    required
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    <option value="">{t.share.selectRegion}</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {translate(lang, city.name)} — {translate(lang, city.region)}
                      </option>
                    ))}
                    <option value="general">{lang === 'es' ? 'General / Múltiples' : 'General / Multiple'}</option>
                  </select>
                </div>

                {/* Improvement */}
                <div>
                  <label htmlFor="improvement" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                    <Lightbulb size={16} className="text-secondary-600 dark:text-secondary-500" />
                    {t.share.improve}
                    <span className="text-xs font-normal text-muted">({t.share.optional})</span>
                  </label>
                  <textarea
                    id="improvement"
                    rows={3}
                    value={improvement}
                    onChange={(e) => setImprovement(e.target.value)}
                    placeholder={t.share.improvePlaceholder}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/60 focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                    <Mail size={16} className="text-secondary-600 dark:text-secondary-500" />
                    {t.share.email}
                    <span className="text-xs font-normal text-muted">({t.share.optional})</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.share.emailPlaceholder}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/60 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 text-primary text-sm" role="alert">
                    <AlertCircle size={16} />
                    {t.share.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting' || !experience.trim() || !region}
                  className="btn-primary w-full"
                >
                  <Send size={18} />
                  {status === 'submitting' ? t.common.loading : t.share.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
