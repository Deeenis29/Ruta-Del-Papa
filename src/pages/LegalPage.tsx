import { Shield, BookOpen, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useRoute } from '@/hooks/useRoute';

export function LegalPage({ type }: { type: 'privacy' | 'sources' }) {
  const { lang } = useLanguage();
  const { navigateTo } = useRoute();

  const content = {
    privacy: {
      es: {
        title: 'Privacidad',
        icon: Shield,
        sections: [
          { heading: 'Recopilación de datos', text: 'Esta plataforma recopila datos de uso anónimos con fines analíticos, como páginas visitadas, tiempo de navegación, idioma y tipo de dispositivo. Estos datos se utilizan exclusivamente para mejorar la experiencia de los visitantes.' },
          { heading: 'Formulario de comentarios', text: 'El formulario de "Comparte tu experiencia" es voluntario. Los datos enviados (experiencia, región, sugerencias y correo electrónico opcional) se almacenan de forma segura y se utilizan únicamente para mejorar la plataforma.' },
          { heading: 'Cookies y almacenamiento local', text: 'La plataforma utiliza almacenamiento local del navegador para recordar tus preferencias de idioma, tema y configuración de accesibilidad. No se utilizan cookies de seguimiento de terceros.' },
          { heading: 'No publicidad', text: 'Esta plataforma no contiene publicidad ni genera ingresos mediante la venta de datos de usuarios. Es un proyecto informativo y cultural.' },
          { heading: 'Contacto', text: 'Si tienes preguntas sobre el uso de tus datos, puedes contactarnos a través del formulario de comentarios.' },
        ],
      },
      en: {
        title: 'Privacy',
        icon: Shield,
        sections: [
          { heading: 'Data Collection', text: 'This platform collects anonymous usage data for analytics purposes, such as pages visited, navigation time, language, and device type. This data is used exclusively to improve the visitor experience.' },
          { heading: 'Feedback Form', text: 'The "Share Your Experience" form is voluntary. Submitted data (experience, region, suggestions, and optional email) is stored securely and used solely to improve the platform.' },
          { heading: 'Cookies and Local Storage', text: 'The platform uses browser local storage to remember your language, theme, and accessibility preferences. No third-party tracking cookies are used.' },
          { heading: 'No Advertising', text: 'This platform contains no advertising and does not generate revenue by selling user data. It is an informational and cultural project.' },
          { heading: 'Contact', text: 'If you have questions about how your data is used, you can contact us through the feedback form.' },
        ],
      },
    },
    sources: {
      es: {
        title: 'Fuentes oficiales',
        icon: BookOpen,
        sections: [
          { heading: 'Fuentes de información', text: 'La información presentada en esta plataforma se basa en fuentes oficiales de la Santa Sede, la Conferencia Episcopal Peruana, y medios de comunicación confiables. El cronograma y los detalles de la visita se actualizan conforme se confirman oficialmente.' },
          { heading: 'Cronograma', text: 'El cronograma del recorrido se elabora con base en los comunicados oficiales de la Nunciatura Apostólica en el Perú y la Santa Sede. Las fechas y actividades pueden sufrir modificaciones.' },
          { heading: 'Información turística y gastronómica', text: 'Los contenidos turísticos y gastronómicos se basan en información de PROMPERÚ, el Ministerio de Cultura del Perú, y fuentes especializadas en turismo y gastronomía peruana.' },
          { heading: 'Imágenes', text: 'Las imágenes utilizadas son fotografías de archivo de libre uso provenientes de Pexels. No representan necesariamente eventos específicos de la visita papal.' },
          { heading: 'Aclaración', text: 'Esta plataforma es un proyecto informativo independiente y no representa una entidad oficial de la Santa Sede ni del Estado Peruano.' },
        ],
      },
      en: {
        title: 'Official Sources',
        icon: BookOpen,
        sections: [
          { heading: 'Information Sources', text: 'The information presented on this platform is based on official sources from the Holy See, the Peruvian Episcopal Conference, and reliable media outlets. The schedule and visit details are updated as they are officially confirmed.' },
          { heading: 'Schedule', text: 'The journey schedule is based on official communications from the Apostolic Nunciature in Peru and the Holy See. Dates and activities may be subject to changes.' },
          { heading: 'Tourism and Gastronomy Information', text: 'Tourism and gastronomy content is based on information from PROMPERÚ, the Ministry of Culture of Peru, and specialized sources on Peruvian tourism and gastronomy.' },
          { heading: 'Images', text: 'The images used are free-to-use stock photographs from Pexels. They do not necessarily represent specific events of the papal visit.' },
          { heading: 'Disclaimer', text: 'This platform is an independent informational project and does not represent an official entity of the Holy See or the Peruvian State.' },
        ],
      },
    },
  };

  const pageContent = content[type][lang];

  return (
    <div className="pt-24 lg:pt-32 pb-16 min-h-screen">
      <div className="container-page max-w-3xl">
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
            <pageContent.icon size={24} />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{pageContent.title}</h1>
        </div>

        <div className="space-y-6">
          {pageContent.sections.map((section, idx) => (
            <div key={idx} className="card p-6">
              <h2 className="text-lg font-bold text-foreground mb-2">{section.heading}</h2>
              <p className="text-foreground/70 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
