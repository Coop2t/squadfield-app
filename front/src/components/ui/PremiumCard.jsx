import React from 'react';
import { cn } from '../../utils/cn';
import { getStatIcon } from './StatIcons';
import { Logo } from './Logo';

const PremiumCard = ({ 
  player,
  rarity = 'rare',
  size = 'md',
  className = '',
  interactive = true
}) => {
  const sizeClasses = {
    sm: 'w-64 h-80',
    md: 'w-72 h-96',
    lg: 'w-80 h-[28rem]',
    xl: 'w-96 h-[32rem]'
  };

  const rarityConfig = {
    common: {
      gradient: 'from-rarity-common/80 to-rarity-common',
      border: 'border-rarity-common/50',
      glow: 'shadow-card-common',
      textGlow: 'text-shadow',
      animation: ''
    },
    uncommon: {
      gradient: 'from-rarity-uncommon/80 to-rarity-uncommon', 
      border: 'border-rarity-uncommon/50',
      glow: 'shadow-card-uncommon',
      textGlow: 'text-shadow',
      animation: ''
    },
    rare: {
      gradient: 'from-rarity-rare/80 to-rarity-rare',
      border: 'border-rarity-rare/50', 
      glow: 'shadow-card-rare',
      textGlow: 'text-shadow-lg',
      animation: ''
    },
    epic: {
      gradient: 'from-rarity-epic/80 to-rarity-epic',
      border: 'border-rarity-epic/50',
      glow: 'shadow-card-epic',
      textGlow: 'text-shadow-lg',
      animation: ''
    },
    legendary: {
      gradient: 'from-rarity-legendary/80 to-rarity-legendary',
      border: 'border-rarity-legendary/50',
      glow: 'shadow-card-legendary animate-pulse-glow-gold',
      textGlow: 'text-shadow-lg',
      animation: 'animate-pulse-glow-gold'
    },
    mythic: {
      gradient: 'from-rarity-mythic/80 to-rarity-mythic',
      border: 'border-rarity-mythic/50',
      glow: 'shadow-card-mythic animate-pulse-glow-mythic',
      textGlow: 'text-shadow-lg',
      animation: 'animate-pulse-glow-mythic'
    }
  };

  const config = rarityConfig[rarity];
  
  return (
    <div className={cn(
      'relative select-none',
      sizeClasses[size],
      interactive && 'cursor-pointer transform transition-all duration-300 hover:scale-105',
      config.animation,
      className
    )}>
      {/* Bordures améliorées avec double contour */}
      <div className={cn(
        'absolute inset-0 rounded-2xl p-[2px]',
        'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-xl',
        config.glow
      )}>
        {/* Contour interne pour effet premium */}
        <div className="absolute inset-[2px] rounded-2xl p-[1px] bg-gradient-to-br from-yellow-300/50 to-yellow-400/50">
          {/* Coin ornements */}
          <div className="absolute top-2 left-2 w-6 h-6">
            <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-200 drop-shadow-lg" fill="currentColor">
              <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" opacity="0.9"/>
            </svg>
          </div>
          <div className="absolute top-2 right-2 w-6 h-6 transform rotate-90">
            <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-200 drop-shadow-lg" fill="currentColor">
              <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" opacity="0.9"/>
            </svg>
          </div>
          <div className="absolute bottom-2 left-2 w-6 h-6 transform rotate-180">
            <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-200 drop-shadow-lg" fill="currentColor">
              <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" opacity="0.9"/>
            </svg>
          </div>
          <div className="absolute bottom-2 right-2 w-6 h-6 transform rotate-270">
            <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-200 drop-shadow-lg" fill="currentColor">
              <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" opacity="0.9"/>
            </svg>
          </div>

          {/* Carte principale */}
          <div className="w-full h-full rounded-2xl overflow-hidden relative border border-yellow-300/30">
            
            {/* Arrière-plan radial doré */}
            <div className={cn(
              'absolute inset-0',
              'bg-gradient-radial from-yellow-400/20 via-yellow-500/30 to-yellow-600/40'
            )}></div>
            
            {/* Effet radial secondaire */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
            
            {/* Header avec nom et niveau */}
            <div className="relative z-10 p-4 flex justify-between items-start">
              <div>
                <h2 className={cn(
                  'font-display text-2xl font-bold text-white mb-1 drop-shadow-lg',
                  config.textGlow
                )}>
                  {player?.name || 'JOUEUR'}
                </h2>
                <p className="text-white/90 text-sm font-medium drop-shadow">
                  {player?.position || 'ATT'} • {player?.team || 'SQUADFIELD'}
                </p>
              </div>
              <div className="bg-white/25 backdrop-blur-sm rounded-xl px-3 py-1 border-2 border-white/40 shadow-lg">
                <span className="text-white font-bold text-lg drop-shadow">
                  {player?.level || player?.overall || '99'}
                </span>
              </div>
            </div>

            {/* Zone photo joueur */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-2">
              <div className="relative">
                {/* Cercle de background pour la photo */}
                <div className="w-32 h-32 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm border-3 border-white/50 overflow-hidden shadow-xl">
                  {player?.photo ? (
                    <img 
                      src={player.photo} 
                      alt={player.name || 'Joueur'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-white text-5xl drop-shadow-lg">⚽</div>
                  )}
                </div>
                
                {/* Badge de rareté */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-xl">
                  <span className="text-xs font-bold text-yellow-600">
                    {rarity === 'mythic' ? '⚡' : 
                     rarity === 'legendary' ? '👑' : 
                     rarity === 'epic' ? '💎' : 
                     rarity === 'rare' ? '🥇' : '⭐'}
                  </span>
                </div>
              </div>
            </div>

            {/* Note générale */}
            <div className="relative z-10 px-4 mb-4">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-6 py-3 border-2 border-white/30 shadow-lg">
                <div className="text-center">
                  <div className="text-white/80 text-sm font-medium mb-1 drop-shadow">OVERALL</div>
                  <div className="text-white text-4xl font-bold font-display drop-shadow-lg">
                    {player?.overall || '85'}
                  </div>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="relative z-10 px-4 pb-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 border-2 border-white/30 shadow-lg">
                <div className="grid grid-cols-2 gap-2 text-white">
                  {[
                    { name: 'TECHNIQUE', value: player?.technique || 85 },
                    { name: 'VITESSE', value: player?.vitesse || 82 },
                    { name: 'PHYSIQUE', value: player?.physique || 78 },
                    { name: 'TIRS', value: player?.tirs || 88 },
                    { name: 'DEFENSE', value: player?.defense || 65 },
                    { name: 'PASSE', value: player?.passe || 91 },
                  ].map((stat) => (
                    <div key={stat.name} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        {getStatIcon(stat.name, { 
                          className: "w-4 h-4", 
                          color: "#FFF" 
                        })}
                        <span className="text-xs font-medium drop-shadow">{stat.name}</span>
                      </div>
                      <span className="text-sm font-bold drop-shadow">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer avec logo SQUADFIELD */}
            <div className="relative z-10 px-4 pb-3">
              <div className="flex justify-center">
                <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/30 shadow-lg">
                  <Logo size="sm" showText={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PremiumCard };
