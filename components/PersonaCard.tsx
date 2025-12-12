import React from 'react';
import { ArrowRight, Brain, Sprout, Handshake } from 'lucide-react'; // Changed emoji to Lucide
import { PersonaContent, PersonaType } from '../types';
import GlassIcon from './GlassIcon';

interface Props {
  content: PersonaContent;
  onClick: () => void;
}

const PersonaCard: React.FC<Props> = ({ content, onClick }) => {
  
  // Map persona ID to specific icons and colors
  const getIconProps = (id: PersonaType) => {
    switch (id) {
      case PersonaType.ADULT:
        return { icon: <Brain strokeWidth={1.5} className="w-full h-full" />, color: 'blue' as const };
      case PersonaType.PARENT:
        return { icon: <Sprout strokeWidth={1.5} className="w-full h-full" />, color: 'green' as const };
      case PersonaType.PARTNER:
        return { icon: <Handshake strokeWidth={1.5} className="w-full h-full" />, color: 'orange' as const };
      default:
        return { icon: <Brain className="w-full h-full" />, color: 'brand' as const };
    }
  };

  const { icon, color } = getIconProps(content.id);

  return (
    <div 
      onClick={onClick}
      className={`
        relative group cursor-pointer 
        bg-white dark:bg-warm-900 
        rounded-3xl p-8 
        border border-warm-100 dark:border-warm-800
        shadow-sm hover:shadow-xl hover:border-brand-200 dark:hover:border-brand-800
        transition-all duration-300 hover:-translate-y-1
        overflow-hidden
      `}
    >
      {/* Abstract Background Blob */}
      <div className={`
        absolute -top-10 -right-10 w-40 h-40 
        rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity
        bg-gradient-to-br 
        ${color === 'blue' ? 'from-blue-400 to-cyan-300' : ''}
        ${color === 'green' ? 'from-green-400 to-emerald-300' : ''}
        ${color === 'orange' ? 'from-orange-400 to-amber-300' : ''}
      `} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <GlassIcon icon={icon} color={color} size="lg" />
        </div>
        
        <h3 className="text-2xl font-bold text-warm-900 dark:text-warm-100 mb-3 tracking-tight">
          {content.title}
        </h3>
        
        <p className="text-warm-600 dark:text-warm-400 mb-8 leading-relaxed flex-grow">
          {content.description}
        </p>
        
        <div className="flex items-center text-sm font-bold uppercase tracking-wider text-warm-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          <span>Wybieram tę ścieżkę</span>
          <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;