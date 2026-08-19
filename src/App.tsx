import { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AccessibilityPanel } from '@/components/AccessibilityPanel';
import { HomePage } from '@/pages/HomePage';
import { RegionPage } from '@/components/RegionPage';
import { Schedule } from '@/components/Schedule';
import { Destinations } from '@/components/Destinations';
import { Tourism } from '@/components/Tourism';
import { Gastronomy } from '@/components/Gastronomy';
import { Gallery } from '@/components/Gallery';
import { InteractiveMap } from '@/components/InteractiveMap';
import { History } from '@/components/History';
import { ShareExperience } from '@/components/ShareExperience';
import { QRSection } from '@/components/QRSection';
import { LegalPage } from '@/pages/LegalPage';
import { useRoute } from '@/hooks/useRoute';

function AppContent() {
  const { route } = useRoute();
  const [a11yOpen, setA11yOpen] = useState(false);

  const renderPage = () => {
    if (route.path === '/') return <HomePage />;
    if (route.path === '/ruta') return <InteractiveMap />;
    if (route.path === '/destinos') return <Destinations />;
    if (route.path === '/cronograma') return <Schedule />;
    if (route.path === '/turismo') return <Tourism />;
    if (route.path === '/gastronomia') return <Gastronomy />;
    if (route.path === '/galeria') return <Gallery />;
    if (route.path === '/destino/' + route.params.cityId) return <RegionPage cityId={route.params.cityId} />;
    if (route.path === '/privacidad') return <LegalPage type="privacy" />;
    if (route.path === '/fuentes') return <LegalPage type="sources" />;
    return <HomePage />;
  };

  const isFullPage = route.path.startsWith('/destino/') || route.path === '/privacidad' || route.path === '/fuentes';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onOpenAccessibility={() => setA11yOpen(true)} />
      <main className="flex-1">
        {renderPage()}
      </main>
      {!isFullPage && <ShareExperience />}
      {!isFullPage && <QRSection />}
      <Footer onOpenAccessibility={() => setA11yOpen(true)} />
      <AccessibilityPanel open={a11yOpen} onClose={() => setA11yOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AccessibilityProvider>
          <AppContent />
        </AccessibilityProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
