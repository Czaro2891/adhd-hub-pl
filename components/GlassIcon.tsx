import React from 'react';

interface GlassIconProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'brand' | 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'yellow';
}

const GlassIcon: React.FC<GlassIconProps> = ({ 
  icon, 
  size = 'md', 
  className = '',
  color = 'brand' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-12 h-12 p-2.5',
    lg: 'w-16 h-16 p-3.5',
    xl: 'w-20 h-20 p-5'
  };

  // Maps to specific color gradients for the glass backing
  const colorMap = {
    brand: 'from-brand-500/20 to-brand-500/5 text-brand-600 dark:text-brand-300',
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-300',
    green: 'from-green-500/20 to-green-500/5 text-green-600 dark:text-green-300',
    orange: 'from-orange-500/20 to-orange-500/5 text-orange-600 dark:text-orange-300',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-300',
    red: 'from-red-500/20 to-red-500/5 text-red-600 dark:text-red-300',
    yellow: 'from-yellow-500/20 to-yellow-500/5 text-yellow-700 dark:text-yellow-400',
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Back glow for depth */}
      <div className={`absolute inset-0 rounded-2xl blur-md opacity-40 bg-gradient-to-br ${colorMap[color]} group-hover:opacity-60 transition-opacity`} />
      
      {/* The Glass Tile */}
      <div className={`
        relative 
        flex items-center justify-center 
        rounded-2xl 
        backdrop-blur-md 
        bg-white/40 dark:bg-white/5 
        border border-white/50 dark:border-white/10
        shadow-[0_4px_12px_0_rgba(0,0,0,0.05)]
        dark:shadow-[0_4px_12px_0_rgba(0,0,0,0.2)]
        transition-transform duration-300
        group-hover:scale-105 group-hover:border-white/70
        ${sizeClasses[size]}
        ${colorMap[color]} // Applies text color
      `}>
        {/* Shine effect on top-left */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl opacity-50 pointer-events-none" />
        
        {/* The Icon itself */}
        <div className="relative z-10 drop-shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default GlassIcon;