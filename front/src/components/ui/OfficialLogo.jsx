import React from 'react';
import { cn } from '../../utils/cn';

const OfficialLogo = ({ 
  variant = 'default', 
  size = 'md', 
  className = '',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  // Logo officiel SQUADFIELD basé sur vos designs
  const OfficialLogoIcon = () => (
    <div className={cn(
      'relative flex items-center justify-center',
      'bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-600',
      'rounded-lg shadow-2xl',
      'border-2 border-yellow-300',
      sizeClasses[size]
    )} style={{
      boxShadow: '0 0 30px rgba(251, 191, 36, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)'
    }}>
      {/* Bouclier de base avec dégradé doré */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-600 rounded-lg opacity-90"></div>
      
      {/* Effets de brillance dorée */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-lg"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-yellow-200/20 to-transparent rounded-lg"></div>
      
      {/* Silhouettes des joueurs avec effets numériques */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <svg 
          viewBox="0 0 48 48" 
          className="w-3/4 h-3/4 text-black/80"
          fill="currentColor"
        >
          {/* Joueur central (plus grand) */}
          <g transform="translate(24,24)">
            {/* Tête */}
            <circle cx="0" cy="-8" r="3" className="fill-current"/>
            {/* Corps avec bras croisés */}
            <path d="M-4,-3 L-6,-1 L-4,1 L-2,0 L2,0 L4,1 L6,-1 L4,-3 L0,-4 Z" className="fill-current"/>
            {/* Jambes */}
            <path d="M-2,1 L-3,6 M2,1 L3,6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </g>

          {/* Joueur gauche (plus petit) */}
          <g transform="translate(12,28) scale(0.7)">
            <circle cx="0" cy="-6" r="2" className="fill-current"/>
            <path d="M-3,-2 L-4,0 L-2,1 L-1,0 L1,0 L2,1 L4,0 L3,-2 L0,-3 Z" className="fill-current"/>
            <path d="M-1,1 L-2,4 M1,1 L2,4" stroke="currentColor" strokeWidth="1" fill="none"/>
          </g>

          {/* Joueur droite (plus petit) */}
          <g transform="translate(36,28) scale(0.7)">
            <circle cx="0" cy="-6" r="2" className="fill-current"/>
            <path d="M-3,-2 L-4,0 L-2,1 L-1,0 L1,0 L2,1 L4,0 L3,-2 L0,-3 Z" className="fill-current"/>
            <path d="M-1,1 L-2,4 M1,1 L2,4" stroke="currentColor" strokeWidth="1" fill="none"/>
          </g>
          
          {/* Effets numériques bleus */}
          <g className="animate-pulse">
            {/* Pixels/particules numériques */}
            <rect x="8" y="35" width="1.5" height="1.5" className="fill-blue-400 opacity-80"/>
            <rect x="15" y="38" width="1" height="1" className="fill-cyan-400 opacity-60"/>
            <rect x="32" y="37" width="1.5" height="1.5" className="fill-blue-500 opacity-70"/>
            <rect x="39" y="35" width="1" height="1" className="fill-cyan-300 opacity-50"/>
            
            {/* Ligne numérique horizontale */}
            <rect x="10" y="40" width="28" height="0.5" className="fill-blue-400 opacity-60"/>
            <rect x="12" y="41" width="24" height="0.5" className="fill-cyan-400 opacity-40"/>
            
            {/* Points lumineux */}
            <circle cx="20" cy="32" r="0.5" className="fill-blue-300 opacity-80"/>
            <circle cx="28" cy="34" r="0.5" className="fill-cyan-400 opacity-60"/>
          </g>
        </svg>
      </div>
      
      {/* Bordure numérique bleue subtile */}
      <div className="absolute inset-0 rounded-lg border border-blue-400/20"></div>
      
      {/* Effet de halo doré externe */}
      <div className="absolute -inset-1 bg-gradient-radial from-yellow-400/30 to-transparent rounded-lg blur-sm -z-10"></div>
    </div>
  );

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <OfficialLogoIcon />
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            'font-black tracking-wider leading-none',
            'bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600',
            'bg-clip-text text-transparent',
            'drop-shadow-lg',
            textSizeClasses[size]
          )} style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            SQUADFIELD
          </h1>
          {(size === 'lg' || size === 'xl') && (
            <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">
              Premium Cards
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export { OfficialLogo };
