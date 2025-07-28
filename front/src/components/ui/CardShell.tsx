import React from 'react';
import { cn } from '../../utils/cn';
import { Badge, RarityType } from './Badge';

interface CardShellProps {
  className?: string;
  rarity?: RarityType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  interactive?: boolean;
  glowEffect?: boolean;
  backgroundImage?: string;
  overlayGradient?: boolean;
}

const CardShell = React.forwardRef<HTMLDivElement, CardShellProps>(
  ({ 
    className,
    rarity = 'common',
    size = 'md',
    children,
    interactive = false,
    glowEffect = false,
    backgroundImage,
    overlayGradient = true,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'w-48 h-64',
      md: 'w-64 h-80',
      lg: 'w-72 h-96',
      xl: 'w-80 h-[28rem]',
    };
    
    const rarityThemes = {
      common: 'card-theme-common',
      uncommon: 'card-theme-uncommon', 
      rare: 'card-theme-rare',
      epic: 'card-theme-epic',
      legendary: 'card-theme-legendary',
      mythic: 'card-theme-mythic',
    };
    
    const cardClasses = cn(
      'sports-card relative overflow-hidden',
      sizeClasses[size],
      rarityThemes[rarity],
      interactive && 'card-interactive cursor-pointer',
      glowEffect && 'glow-primary',
      rarity === 'mythic' && 'animate-pulse-glow',
      className
    );
    
    return (
      <div
        ref={ref}
        className={cardClasses}
        {...props}
      >
        {/* Background Image */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        
        {/* Gradient Overlay */}
        {overlayGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        )}
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Rarity Badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge rarity={rarity} size="sm">
            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
          </Badge>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col p-4">
          {children}
        </div>
        
        {/* Border Glow Effect for High Rarities */}
        {(rarity === 'legendary' || rarity === 'mythic') && (
          <div className="absolute inset-0 rounded-2xl border-2 border-white/20 pointer-events-none" />
        )}
        
        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    );
  }
);

CardShell.displayName = 'CardShell';

export { CardShell };
export type { CardShellProps };
