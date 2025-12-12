import React from 'react';
import PersonaCard from '../components/PersonaCard';
import GlassIcon from '../components/GlassIcon';
import { PersonaType, PersonaContent } from '../types';
import { useNavigate } from 'react-router-dom';
import { Microscope, MessageCircle, PenTool, Globe2 } from 'lucide-react';

const personas: PersonaContent[] = [
  {
    id: PersonaType.ADULT,
    title: "Dla Dorosłych z ADHD",
    description: "Dopiero co zdiagnozowany? A może szukasz sposobów na ogarnięcie codziennego chaosu? Znajdziesz tu konkretne strategie.",
    icon: "brain", // String identifier, mapping handled in PersonaCard
    colorClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300",
  },
  {
    id: PersonaType.PARENT,
    title: "Dla Rodziców",
    description: "Twoje dziecko ma ADHD? Zdobądź wiedzę, narzędzia wychowawcze i wsparcie, by pomóc jemu (i sobie) rozkwitnąć.",
    icon: "sprout",
    colorClass: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300",
  },
  {
    id: PersonaType.PARTNER,
    title: "Dla Bliskich",
    description: "Chcesz lepiej zrozumieć partnera z ADHD? Poznaj mechanizmy działania i naucz się budować wspierającą relację.",
    icon: "handshake",
    colorClass: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300",
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handlePersonaSelect = (id: PersonaType) => {
    navigate('/knowledge', { state: { persona: id } });
  };

  const features = [
    { text: "Treści oparte na nauce", icon: <Microscope className="w-full h-full" />, color: 'brand' as const },
    { text: "Język bez oceniania", icon: <MessageCircle className="w-full h-full" />, color: 'purple' as const },
    { text: "Praktyczne narzędzia", icon: <PenTool className="w-full h-full" />, color: 'orange' as const },
    { text: "Polska specyfika", icon: <Globe2 className="w-full h-full" />, color: 'red' as const },
  ];

  return (
    <div className="flex flex-col gap-20 py-16 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-full text-sm font-bold tracking-wide uppercase border border-brand-100 dark:border-brand-800 shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
          Witaj w bezpiecznej przestrzeni
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-warm-900 dark:text-warm-50 leading-tight tracking-tight">
          Zrozumieć <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-500 dark:from-brand-400 dark:to-teal-300">ADHD</span>.<br />
          Odzyskać sprawczość.
        </h1>
        
        <p className="text-xl md:text-2xl text-warm-600 dark:text-warm-300 leading-relaxed max-w-2xl mx-auto font-light">
          Niezależnie od tego, czy diagnozę masz Ty, Twoje dziecko czy partner — jesteś we właściwym miejscu. Rzetelna wiedza, zero oceniania.
        </p>
      </section>

      {/* Personas Section */}
      <section className="grid md:grid-cols-3 gap-8">
        {personas.map((persona) => (
          <PersonaCard 
            key={persona.id} 
            content={persona} 
            onClick={() => handlePersonaSelect(persona.id)} 
          />
        ))}
      </section>

      {/* Why Us Section */}
      <section className="bg-white/60 dark:bg-warm-900/60 rounded-[32px] p-8 md:p-12 shadow-sm border border-warm-100 dark:border-warm-800 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-warm-900 dark:text-warm-100">Dlaczego ADHD Hub?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <GlassIcon icon={item.icon} color={item.color} size="sm" className="flex-shrink-0" />
                  <span className="text-warm-700 dark:text-warm-200 font-medium group-hover:text-warm-900 dark:group-hover:text-warm-100 transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            {/* Quote Card */}
            <div className="bg-gradient-to-br from-warm-50 to-white dark:from-warm-800 dark:to-warm-900 rounded-3xl p-8 border border-warm-200 dark:border-warm-700 shadow-lg rotate-1 transform hover:rotate-0 transition-transform duration-500">
               <div className="absolute -top-4 -left-4 text-6xl text-brand-200 dark:text-brand-900 opacity-50 font-serif">"</div>
               <p className="text-lg text-warm-600 dark:text-warm-300 italic relative z-10 mb-6">
                 Miejsce, w którym w końcu poczułem, że nie jestem 'zepsuty', tylko działam inaczej. To zmieniło moje podejście do życia.
               </p>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-800 flex items-center justify-center font-bold text-brand-700 dark:text-brand-300">J</div>
                 <div>
                   <p className="font-bold text-warm-900 dark:text-warm-100">Jan</p>
                   <p className="text-xs text-warm-500 uppercase tracking-wider">32 lata, Programista</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;