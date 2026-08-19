import { Hero } from '@/components/Hero';
import { VisitSummary } from '@/components/VisitSummary';
import { InteractiveMap } from '@/components/InteractiveMap';
import { Schedule } from '@/components/Schedule';
import { History } from '@/components/History';
import { Destinations } from '@/components/Destinations';
import { Tourism } from '@/components/Tourism';
import { Gastronomy } from '@/components/Gastronomy';
import { Gallery } from '@/components/Gallery';

export function HomePage() {
  return (
    <>
      <Hero />
      <VisitSummary />
      <InteractiveMap />
      <Schedule />
      <History />
      <Destinations />
      <Tourism />
      <Gastronomy />
      <Gallery />
    </>
  );
}
