import React from 'react';
import ResponsiveCardGrid from '../ResponsiveCardGrid';

// Exemple de données de cartes avec les nouveaux chemins d'images
const exampleCards = [
  {
    id: 'lucia-1',
    playerName: 'LUCIA',
    position: 'CADETTE',
    level: 9,
    rating: 99,
    rarity: 'Légendaire',
    sport: 'football',
    playerImage: null, // Remplacez par: '/assets/players/lucia-portrait.jpg'
    cardBackground: 'gold',
    teamLogo: null
  },
  {
    id: 'example-2',
    playerName: 'MARTIN',
    position: 'ATTAQUANT',
    level: 8,
    rating: 87,
    rarity: 'Épique',
    sport: 'football',
    playerImage: null, // Remplacez par: '/assets/players/martin-portrait.jpg'
    cardBackground: 'purple'
  },
  {
    id: 'example-3',
    playerName: 'SARAH',
    position: 'GARDIENNE',
    level: 7,
    rating: 82,
    rarity: 'Rare',
    sport: 'football',
    playerImage: null, // Remplacez par: '/assets/players/sarah-portrait.jpg'
    cardBackground: 'blue'
  }
];

const CardDisplayExample = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Nos Créations
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvre les cartes créées par notre communauté SquadField
        </p>
      </div>

      {/* Filter Section - Mobile Optimized */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Toutes les cartes ({exampleCards.length})
          </h2>
          
          {/* Mobile-first filter buttons */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Toutes
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Football
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Basketball
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid - Using the ResponsiveCardGrid component */}
      <ResponsiveCardGrid 
        cards={exampleCards} 
        className="mb-8"
      />

      {/* Instructions pour l'utilisateur */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          🎯 Instructions pour vos visuels
        </h3>
        <div className="space-y-2 text-blue-800">
          <p><strong>1. Images de cartes complètes :</strong> Déposez dans <code>public/assets/cards/</code></p>
          <p><strong>2. Photos de joueurs :</strong> Déposez dans <code>public/assets/players/</code></p>
          <p><strong>3. Logos d'équipes :</strong> Déposez dans <code>public/assets/logos/</code></p>
          <p><strong>4. Arrière-plans :</strong> Déposez dans <code>public/assets/backgrounds/</code></p>
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>Format recommandé :</strong> PNG pour les cartes (400x600px), JPG pour les photos (800x800px min)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDisplayExample;
