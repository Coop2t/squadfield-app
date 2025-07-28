import React from 'react';
import { cn } from '../../utils/cn';

const Logo = ({ 
  variant = 'default', 
  size = 'md', 
  className = '',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  // Logo SVG basé sur vos designs SQUADFIELD
  const LogoIcon = () => (
    <div className={cn(
      'relative flex items-center justify-center rounded-lg',
      'bg-gradient-to-br from-secondary-400 to-secondary-600',
      'border-2 border-secondary-300',
      'shadow-glow-gold',
      sizeClasses[size]
    )}>
      {/* Bouclier doré avec effets */}
      <div className="absolute inset-0 bg-gradient-radial-gold rounded-lg opacity-80"></div>
      
      {/* Silhouettes des joueurs */}
      <div className="relative z-10 flex items-center justify-center">
        <svg 
          viewBox="0 0 24 24" 
          className="w-3/4 h-3/4 text-white drop-shadow-lg"
          fill="currentColor"
        >
          {/* Joueur central */}
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6 16.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5S15.7 17 16.5 17s1.5.7 1.5 1.5zm-12 0c0 .8-.7 1.5-1.5 1.5S4.5 19.3 4.5 18.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5z"/>
          <path d="M12.5 11.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zm3-7c.8 0 1.5.7 1.5 1.5S16.3 7.5 15.5 7.5 14 6.8 14 6s.7-1.5 1.5-1.5zm-7 0C9.3 4.5 10 5.2 10 6s-.7 1.5-1.5 1.5S7 6.8 7 6s.7-1.5 1.5-1.5z"/>
          {/* Effets numériques */}
          <circle cx="8" cy="14" r="1" className="opacity-60"/>
          <circle cx="16" cy="14" r="1" className="opacity-60"/>
          <rect x="11" y="16" width="2" height="1" className="opacity-40"/>
        </svg>
      </div>
      
      {/* Effet brillant */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-lg"></div>
      
      {/* Bordure numérique bleue */}
      <div className="absolute inset-0 rounded-lg border border-primary-400/30"></div>
    </div>
  );

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <LogoIcon />
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            'font-display font-bold tracking-wide',
            'bg-gradient-to-r from-secondary-500 via-primary-500 to-accent-500',
            'bg-clip-text text-transparent',
            textSizeClasses[size]
          )}>
            SQUADFIELD
          </h1>
          {size === 'xl' && (
            <p className="text-xs text-gray-600 font-medium tracking-wider">
              PREMIUM CARDS
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export { Logo };
