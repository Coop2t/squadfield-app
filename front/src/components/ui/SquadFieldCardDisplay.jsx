import React, { useState, useEffect } from 'react';
import DalleTemplate from '../templates/DalleTemplate';

const SquadFieldCardDisplay = ({ 
  player,
  size = 'md',
  className = '',
  loading = false
}) => {
  const sizeClasses = {
    sm: 'w-48 h-64',
    md: 'w-64 h-80', 
    lg: 'w-80 h-96',
    xl: 'w-96 h-[28rem]'
  };

  if (loading) {
    return (
      <div className={`${sizeClasses[size]} ${className} flex items-center justify-center bg-gray-800/50 rounded-2xl border border-gray-700/50`}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Chargement joueur...</p>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className={`${sizeClasses[size]} ${className} flex items-center justify-center bg-gray-800/50 rounded-2xl border border-gray-700/50`}>
        <div className="text-center">
          <div className="text-gray-400 text-3xl mb-2">🎯</div>
          <p className="text-gray-400 text-sm">Aucune donnée joueur</p>
        </div>
      </div>
    );
  }

  // Préparer les données pour le template Lucia
  const templateData = {
    name: player.name || 'JOUEUR',
    ageCategory: player.ageCategory || `U${player.age || 20}`,
    globalNote: player.overall || player.level || 75,
    scores: {
      technique: player.technique || 75,
      vitesse: player.vitesse || 75,
      physique: player.physique || 75,
      tirs: player.tirs || player.tir || 75,
      defense: player.mental || player.defense || 75,
      passe: player.passe || 75
    },
    photo: player.photo || null
  };

  return (
    <div className={`${className} relative group cursor-pointer`}>
      <DalleTemplate 
        {...templateData}
        onImageGenerated={(imageUrl) => {
          console.log('✅ Carte template DALL-E générée:', imageUrl);
        }}
      />
      
      {/* Overlay d'information au hover */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-2xl mb-2">🎯</div>
          <p className="font-bold">Carte SquadField</p>
          <p className="text-sm opacity-80">{player?.name || 'Joueur'}</p>
          <p className="text-xs opacity-60 mt-1">Note: {templateData.globalNote}</p>
        </div>
      </div>
    </div>
  );
};

export default SquadFieldCardDisplay;
