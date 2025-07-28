import React from 'react';
import { cn } from '../../utils/cn';

const PremiumCardOfficial = ({ 
  player, 
  rarity = 'common',
  size = 'md',
  className = '',
  showAnimations = true 
}) => {
  // Configuration des raretés basée sur vos designs
  const rarityConfig = {
    common: {
      gradientFrom: '#9CA3AF',
      gradientTo: '#4B5563',
      shadowColor: 'rgba(156, 163, 175, 0.3)',
    },
    uncommon: {
      gradientFrom: '#10B981',
      gradientTo: '#059669',
      shadowColor: 'rgba(16, 185, 129, 0.4)',
    },
    rare: {
      gradientFrom: '#3B82F6',
      gradientTo: '#1D4ED8',
      shadowColor: 'rgba(59, 130, 246, 0.5)',
    },
    epic: {
      gradientFrom: '#8B5CF6',
      gradientTo: '#7C3AED',
      shadowColor: 'rgba(139, 92, 246, 0.6)',
    },
    legendary: {
      gradientFrom: '#F59E0B',
      gradientTo: '#D97706',
      shadowColor: 'rgba(245, 158, 11, 0.7)',
    },
    mythic: {
      gradientFrom: '#EF4444',
      gradientTo: '#DC2626',
      shadowColor: 'rgba(239, 68, 68, 0.8)',
    },
  };

  const config = rarityConfig[rarity] || rarityConfig.common;

  const sizeClasses = {
    sm: 'w-56 h-80',
    md: 'w-72 h-96',
    lg: 'w-80 h-[28rem]',
    xl: 'w-96 h-[32rem]'
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-2xl transform transition-all duration-500 shadow-2xl',
        sizeClasses[size],
        showAnimations && 'hover:scale-105',
        className
      )} 
      style={{
        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
        boxShadow: `0 25px 50px -12px ${config.shadowColor}, 0 0 30px ${config.shadowColor}`
      }}
    >
      
      {/* Bordures ornementées aux coins */}
      <div className="absolute top-2 left-2 w-6 h-6 z-20">
        <svg viewBox="0 0 24 24" className="w-full h-full text-white/80 fill-current">
          <path d="M2 2v8c0 1.1.9 2 2 2h8V8c0-3.3-2.7-6-6-6H2z"/>
        </svg>
      </div>
      <div className="absolute top-2 right-2 w-6 h-6 z-20 rotate-90">
        <svg viewBox="0 0 24 24" className="w-full h-full text-white/80 fill-current">
          <path d="M2 2v8c0 1.1.9 2 2 2h8V8c0-3.3-2.7-6-6-6H2z"/>
        </svg>
      </div>
      <div className="absolute bottom-2 left-2 w-6 h-6 z-20 -rotate-90">
        <svg viewBox="0 0 24 24" className="w-full h-full text-white/80 fill-current">
          <path d="M2 2v8c0 1.1.9 2 2 2h8V8c0-3.3-2.7-6-6-6H2z"/>
        </svg>
      </div>
      <div className="absolute bottom-2 right-2 w-6 h-6 z-20 rotate-180">
        <svg viewBox="0 0 24 24" className="w-full h-full text-white/80 fill-current">
          <path d="M2 2v8c0 1.1.9 2 2 2h8V8c0-3.3-2.7-6-6-6H2z"/>
        </svg>
      </div>

      {/* Effets radiaux en arrière-plan */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)`
        }}
      ></div>

      {/* Header avec nom et niveau */}
      <div className="relative z-10 p-4 bg-gradient-to-b from-black/60 to-black/30 backdrop-blur-sm border-b border-white/20">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-white font-black text-lg tracking-wide leading-tight">
              {player.name}
            </h3>
            <p className="text-white/90 text-sm font-medium">
              {player.position} • {player.team}
            </p>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm">
            <span className="text-white font-black text-lg">{player.overall}</span>
          </div>
        </div>
      </div>

      {/* Zone photo avec effets radiaux */}
      <div className="relative flex items-center justify-center h-32 bg-gradient-to-b from-white/10 to-transparent overflow-hidden">
        {/* Placeholder photo */}
        <div className="relative z-10 w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
          <span className="text-4xl">⚽</span>
        </div>
        
        {/* Particules brillantes */}
        <div className="absolute top-4 left-8 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
        <div 
          className="absolute top-8 right-12 w-0.5 h-0.5 bg-white/40 rounded-full animate-ping" 
          style={{animationDelay: '500ms'}}
        ></div>
        <div 
          className="absolute bottom-6 left-16 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping" 
          style={{animationDelay: '1000ms'}}
        ></div>
      </div>

      {/* Section statistiques avec icônes premium */}
      <div className="relative z-10 p-4 bg-black/40 backdrop-blur-sm space-y-2">
        <div className="grid grid-cols-2 gap-3 text-white text-sm">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              <span className="text-blue-300">⚡</span>
              <span className="font-medium">TECHNIQUE</span>
            </span>
            <span className="font-black text-lg">{player.technique}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              <span className="text-green-300">🏃‍♂️</span>
              <span className="font-medium">VITESSE</span>
            </span>
            <span className="font-black text-lg">{player.vitesse}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              <span className="text-red-300">💪</span>
              <span className="font-medium">PHYSIQUE</span>
            </span>
            <span className="font-black text-lg">{player.physique}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              <span className="text-orange-300">🎯</span>
              <span className="font-medium">TIRS</span>
            </span>
            <span className="font-black text-lg">{player.tirs}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              <span className="text-purple-300">🛡️</span>
              <span className="font-medium">DÉFENSE</span>
            </span>
            <span className="font-black text-lg">{player.defense}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              <span className="text-cyan-300">⚽</span>
              <span className="font-medium">PASSE</span>
            </span>
            <span className="font-black text-lg">{player.passe}</span>
          </div>
        </div>
      </div>

      {/* Footer avec logo SQUADFIELD et rareté */}
      <div className="relative z-10 p-4 bg-black/60 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-white font-black text-2xl tracking-wider mb-1">SQUADFIELD</div>
          <div className="text-white/70 text-xs uppercase tracking-widest font-medium">{rarity}</div>
        </div>
      </div>

      {/* Effet de brillance premium qui traverse la carte */}
      {showAnimations && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transform: 'translateX(-200%) skewX(-12deg)',
            animation: 'shine 3s ease-in-out infinite'
          }}
        ></div>
      )}
    </div>
  );
};

export { PremiumCardOfficial };
