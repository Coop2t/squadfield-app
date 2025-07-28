import React from 'react';

export const StatIcons = {
  TECHNIQUE: ({ className = "w-5 h-5", color = "currentColor" }) => (
    <svg viewBox="0 0 24 24" className={className} fill={color}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      <circle cx="12" cy="12" r="2" opacity="0.7"/>
    </svg>
  ),
  
  VITESSE: ({ className = "w-5 h-5", color = "currentColor" }) => (
    <svg viewBox="0 0 24 24" className={className} fill={color}>
      <path d="M12 2l-2 6h4l-2-6z"/>
      <path d="M8 8l4 4-4 4v-8z" opacity="0.7"/>
      <path d="M16 8v8l-4-4 4-4z"/>
      <path d="M5 12l3-3v6l-3-3z" opacity="0.5"/>
      <path d="M19 12l-3 3V9l3 3z" opacity="0.5"/>
    </svg>
  ),
  
  PHYSIQUE: ({ className = "w-5 h-5", color = "currentColor" }) => (
    <svg viewBox="0 0 24 24" className={className} fill={color}>
      <path d="M9 16V8l3-2 3 2v8h-6z"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M7 12h2v6H7z" opacity="0.7"/>
      <path d="M15 12h2v6h-2z" opacity="0.7"/>
      <rect x="6" y="18" width="12" height="2" opacity="0.5"/>
    </svg>
  ),
  
  TIRS: ({ className = "w-5 h-5", color = "currentColor" }) => (
    <svg viewBox="0 0 24 24" className={className} fill={color}>
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="4" opacity="0.7"/>
      <circle cx="12" cy="12" r="1"/>
      <path d="M4 12h3M17 12h3M12 4v3M12 17v3" stroke={color} strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  
  DEFENSE: ({ className = "w-5 h-5", color = "currentColor" }) => (
    <svg viewBox="0 0 24 24" className={className} fill={color}>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      <path d="M12 6L8 10l4 4 4-4-4-4z" fill="white" opacity="0.8"/>
    </svg>
  ),
  
  PASSE: ({ className = "w-5 h-5", color = "currentColor" }) => (
    <svg viewBox="0 0 24 24" className={className} fill={color}>
      <path d="M2 12C2 12 5 8 12 8s10 4 10 4-3 4-10 4S2 12 2 12z" opacity="0.7"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M8 12h8M12 8v8" stroke={color} strokeWidth="1" opacity="0.5"/>
      <circle cx="6" cy="12" r="1" opacity="0.6"/>
      <circle cx="18" cy="12" r="1" opacity="0.6"/>
    </svg>
  ),
};

// Fonction helper pour obtenir l'icône appropriée
export const getStatIcon = (statName, props = {}) => {
  const iconName = statName.toUpperCase();
  const IconComponent = StatIcons[iconName];
  
  if (!IconComponent) {
    return StatIcons.TECHNIQUE(props); // Icône par défaut
  }
  
  return IconComponent(props);
};
