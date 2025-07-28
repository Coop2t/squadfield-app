import React from 'react';

// Configuration des rangs selon le nouveau système
const rankConfig = {
  platine: {
    name: 'Platine',
    range: [95, 99],
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    shadow: 'shadow-lg shadow-cyan-500/50',
    glow: 'hover:shadow-cyan-500/60',
    textColor: 'text-white',
    icon: '🟦',
    bgPattern: 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
    particles: true,
    description: 'Élite mondiale',
    effects: 'animate-pulse-glow'
  },
  dore: {
    name: 'Doré',
    range: [90, 94],
    gradient: 'from-yellow-400 via-yellow-500 to-amber-600',
    shadow: 'shadow-lg shadow-yellow-500/50',
    glow: 'hover:shadow-yellow-500/60',
    textColor: 'text-white',
    icon: '🟨',
    bgPattern: 'bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20',
    particles: false,
    description: 'Haut niveau professionnel',
    effects: 'hover:animate-bounce'
  },
  violet: {
    name: 'Violet',
    range: [85, 89],
    gradient: 'from-purple-400 via-purple-500 to-violet-600',
    shadow: 'shadow-lg shadow-purple-500/50',
    glow: 'hover:shadow-purple-500/60',
    textColor: 'text-white',
    icon: '🟪',
    bgPattern: 'bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-purple-600/20',
    particles: false,
    description: 'Très fort niveau, rare',
    effects: 'hover:scale-105'
  },
  vert: {
    name: 'Vert',
    range: [80, 84],
    gradient: 'from-green-400 via-green-500 to-emerald-600',
    shadow: 'shadow-lg shadow-green-500/50',
    glow: 'hover:shadow-green-500/60',
    textColor: 'text-white',
    icon: '🟩',
    bgPattern: 'bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-600/20',
    particles: false,
    description: 'Très bon niveau amateur',
    effects: 'hover:scale-105'
  },
  jaune: {
    name: 'Jaune',
    range: [75, 79],
    gradient: 'from-yellow-300 via-yellow-400 to-yellow-500',
    shadow: 'shadow-lg shadow-yellow-400/40',
    glow: 'hover:shadow-yellow-400/50',
    textColor: 'text-gray-800',
    icon: '🟨',
    bgPattern: 'bg-gradient-to-r from-yellow-400/20 via-yellow-300/20 to-yellow-500/20',
    particles: false,
    description: 'Niveau standard en progression',
    effects: 'hover:scale-105'
  },
  bronze: {
    name: 'Bronze',
    range: [0, 74],
    gradient: 'from-gray-400 via-gray-500 to-gray-600',
    shadow: 'shadow-lg shadow-gray-500/40',
    glow: 'hover:shadow-gray-500/50',
    textColor: 'text-white',
    icon: '⬜',
    bgPattern: 'bg-gradient-to-r from-gray-500/20 via-gray-400/20 to-gray-600/20',
    particles: false,
    description: 'Débutant avec potentiel',
    effects: 'hover:scale-105'
  }
};

// Fonction pour déterminer le rang selon la note
export const getRankFromRating = (rating) => {
  const numRating = parseInt(rating) || 0;
  
  if (numRating >= 95) return 'platine';
  if (numRating >= 90) return 'dore';
  if (numRating >= 85) return 'violet';
  if (numRating >= 80) return 'vert';
  if (numRating >= 75) return 'jaune';
  return 'bronze';
};

// Fonction pour obtenir la configuration d'un rang
export const getRankConfig = (rank) => {
  return rankConfig[rank] || rankConfig.bronze;
};

// Composant RankBadge principal
const RankBadge = ({ 
  rating, 
  size = 'md', 
  showDescription = false, 
  className = '',
  animated = true 
}) => {
  const rank = getRankFromRating(rating);
  const config = getRankConfig(rank);
  
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const iconSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`relative inline-flex items-center gap-2 ${className}`}>
      {/* Badge principal */}
      <div className={`
        relative inline-flex items-center gap-2 rounded-full
        bg-gradient-to-r ${config.gradient}
        ${config.shadow} ${config.glow}
        ${sizeClasses[size]} ${config.textColor}
        font-bold transition-all duration-300
        ${animated ? config.effects : ''}
        transform-gpu
      `}>
        {/* Particules pour Platine */}
        {config.particles && (
          <>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75 delay-500"></div>
            <div className="absolute top-1/2 -left-2 w-1 h-1 bg-indigo-400 rounded-full animate-ping opacity-75 delay-1000"></div>
          </>
        )}
        
        {/* Contenu du badge */}
        <span className={iconSizes[size]}>{config.icon}</span>
        <span>{config.name}</span>
        {rating && (
          <span className="opacity-75 text-xs">• {rating}</span>
        )}
        
        {/* Effet de brillance pour Doré */}
        {rank === 'dore' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shine"></div>
        )}
      </div>

      {/* Description optionnelle */}
      {showDescription && (
        <span className="text-sm text-gray-600 font-medium">
          {config.description}
        </span>
      )}
    </div>
  );
};

// Composant pour afficher la progression entre rangs
export const RankProgression = ({ currentRating, targetRating = null }) => {
  const currentRank = getRankFromRating(currentRating);
  const currentConfig = getRankConfig(currentRank);
  
  // Déterminer le prochain rang
  const getNextRank = (rating) => {
    if (rating < 75) return { rank: 'jaune', minRating: 75 };
    if (rating < 80) return { rank: 'vert', minRating: 80 };
    if (rating < 85) return { rank: 'violet', minRating: 85 };
    if (rating < 90) return { rank: 'dore', minRating: 90 };
    if (rating < 95) return { rank: 'platine', minRating: 95 };
    return null; // Déjà au max
  };

  const nextRank = getNextRank(currentRating);
  
  if (!nextRank) {
    return (
      <div className="text-center p-4">
        <RankBadge rating={currentRating} size="lg" />
        <p className="text-sm text-gray-600 mt-2">Niveau maximum atteint ! 🏆</p>
      </div>
    );
  }

  const nextConfig = getRankConfig(nextRank.rank);
  const progress = Math.min(100, ((currentRating - currentConfig.range[0]) / (nextRank.minRating - currentConfig.range[0])) * 100);
  const pointsNeeded = nextRank.minRating - currentRating;

  return (
    <div className="text-center p-4 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-center gap-4 mb-3">
        <RankBadge rating={currentRating} size="md" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <span className="text-xs text-gray-500">→</span>
          <div className="w-8 h-0.5 bg-gray-300"></div>
        </div>
        <RankBadge rating={nextRank.minRating} size="md" />
      </div>
      
      {/* Barre de progression */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div 
          className={`bg-gradient-to-r ${nextConfig.gradient} h-3 rounded-full transition-all duration-1000`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-gray-600">
        Plus que <span className="font-bold text-gray-800">{pointsNeeded} points</span> pour atteindre le rang {nextConfig.name}
      </p>
    </div>
  );
};

// Composant pour la liste de tous les rangs
export const RanksList = ({ compact = false }) => {
  const ranks = ['platine', 'dore', 'violet', 'vert', 'jaune', 'bronze'];
  
  return (
    <div className={`grid ${compact ? 'grid-cols-2 gap-2' : 'grid-cols-1 gap-4'}`}>
      {ranks.map((rank) => {
        const config = getRankConfig(rank);
        const midRating = Math.floor((config.range[0] + config.range[1]) / 2);
        
        return (
          <div 
            key={rank}
            className={`flex items-center ${compact ? 'gap-2' : 'gap-4'} p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow`}
          >
            <RankBadge rating={midRating} size={compact ? 'sm' : 'md'} animated={false} />
            {!compact && (
              <div>
                <p className="text-sm font-medium text-gray-800">{config.description}</p>
                <p className="text-xs text-gray-500">
                  Notes {config.range[0]}-{config.range[1]}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RankBadge;
