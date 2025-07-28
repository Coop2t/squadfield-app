import React from 'react';
import { cn } from '../../utils/cn';

type RarityType = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
type VariantType = 'default' | 'secondary' | 'accent' | 'outline' | 'rarity';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: VariantType;
  size?: 'sm' | 'md' | 'lg';
  rarity?: RarityType;
  children: React.ReactNode;
  icon?: React.ReactNode;
  pulse?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    rarity,
    children,
    icon,
    pulse = false,
    ...props 
  }, ref) => {
    // Use rarity variant if rarity is provided
    const effectiveVariant = rarity ? 'rarity' : variant;
    
    const baseClasses = 'badge inline-flex items-center font-medium';
    
    const sizeClasses = {
      sm: 'badge-sm',
      md: 'badge-md', 
      lg: 'badge-lg',
    };
    
    const variantClasses = {
      default: 'bg-gray-100 text-gray-800 border border-gray-200',
      secondary: 'bg-secondary-100 text-secondary-800 border border-secondary-200',
      accent: 'bg-accent-100 text-accent-800 border border-accent-200',
      outline: 'border-2 border-gray-300 text-gray-700 bg-transparent',
      rarity: '', // Will be handled by rarity-specific classes
    };
    
    const rarityClasses = {
      common: 'bg-gray-200 text-gray-800 border border-gray-300',
      uncommon: 'bg-accent-100 text-accent-800 border border-accent-300 shadow-glow-green',
      rare: 'bg-primary-100 text-primary-800 border border-primary-300 shadow-glow',
      epic: 'bg-purple-100 text-purple-800 border border-purple-300 shadow-glow',
      legendary: 'bg-gradient-to-r from-secondary-400 to-secondary-600 text-white border border-secondary-300 shadow-glow-gold',
      mythic: 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white border border-pink-300 shadow-strong',
    };
    
    const rarityEmojis = {
      common: '⚪',
      uncommon: '🟢',
      rare: '🔵',
      epic: '🟣',
      legendary: '🟡',
      mythic: '🔴',
    };
    
    const finalClasses = cn(
      baseClasses,
      sizeClasses[size],
      effectiveVariant === 'rarity' && rarity 
        ? rarityClasses[rarity]
        : variantClasses[effectiveVariant],
      pulse && 'animate-pulse',
      rarity === 'mythic' && 'animate-pulse-glow',
      className
    );
    
    return (
      <span
        ref={ref}
        className={finalClasses}
        {...props}
      >
        {rarity && (
          <span className="mr-1 text-xs">
            {rarityEmojis[rarity]}
          </span>
        )}
        
        {!rarity && icon && (
          <span className="mr-1">
            {icon}
          </span>
        )}
        
        <span>
          {children}
        </span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps, RarityType, VariantType };
