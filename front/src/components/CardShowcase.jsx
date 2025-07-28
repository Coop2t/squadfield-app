import React, { useState } from 'react';
import FlipCard from './FlipCard';
import Image from 'next/image';

// Données de vos vraies cartes
const cardData = [
  {
    id: 'lucia',
    name: 'LUCIA',
    image: '/assets/cards/lucia-card.png',
    position: 'CADETTE',
    rarity: 'Légendaire',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 'ace',
    name: 'ACE',
    image: '/assets/cards/ace-card.png',
    position: 'ATTAQUANT',
    rarity: 'Épique',
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'manuka',
    name: 'MANUKA',
    image: '/assets/cards/manuka-card.png',
    position: 'DÉFENSEUR',
    rarity: 'Rare',
    color: 'from-blue-400 to-blue-600'
  }
];

const CardShowcase = () => {
  const [selectedCard, setSelectedCard] = useState(cardData[0]);
  const [autoFlipEnabled, setAutoFlipEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header avec logo */}
      <div className="pt-8 pb-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/assets/logos/logo-squadfield.png"
            alt="SquadField Logo"
            width={60}
            height={60}
            className="mr-4"
          />
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SQUADFIELD
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Découvrez nos cartes créées par notre communauté avec des animations flip 3D
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Card - Grande carte en vedette */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Carte en vedette
            </h2>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <button
                onClick={() => setAutoFlipEnabled(!autoFlipEnabled)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  autoFlipEnabled 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {autoFlipEnabled ? 'Arrêter l\'auto-flip' : 'Activer l\'auto-flip'}
              </button>
              <span className="text-sm text-gray-500">
                Survolez ou cliquez pour voir le verso
              </span>
            </div>
          </div>

          {/* Grande carte centrale */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm lg:max-w-md">
              <FlipCard
                frontImage={selectedCard.image}
                backImage="/assets/backgrounds/verso-card.png"
                cardName={selectedCard.name}
                autoFlip={autoFlipEnabled}
                flipDelay={3000}
                className="group"
              />
            </div>
          </div>

          {/* Informations de la carte sélectionnée */}
          <div className="mt-8 text-center">
            <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${selectedCard.color} text-white font-bold text-lg shadow-lg`}>
              {selectedCard.name} - {selectedCard.position}
            </div>
            <div className="mt-2">
              <span className="inline-block px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                {selectedCard.rarity}
              </span>
            </div>
          </div>
        </div>

        {/* Galerie de toutes les cartes */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Toutes les cartes ({cardData.length})
            </h2>
            <p className="text-gray-600">
              Cliquez sur une carte pour la voir en grand format
            </p>
          </div>

          {/* Grid responsive des cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardData.map((card) => (
              <div 
                key={card.id}
                className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  selectedCard.id === card.id ? 'ring-4 ring-blue-500 ring-opacity-60 rounded-xl' : ''
                }`}
                onClick={() => setSelectedCard(card)}
              >
                <FlipCard
                  frontImage={card.image}
                  backImage="/assets/backgrounds/verso-card.png"
                  cardName={card.name}
                  autoFlip={false}
                />
                
                {/* Informations de la carte */}
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {card.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {card.position} • {card.rarity}
                  </p>
                  {selectedCard.id === card.id && (
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Sélectionnée
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section instructions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ✨ Comment utiliser les animations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Survol</h4>
              <p className="text-gray-600 text-sm">
                Survolez une carte pour voir l'animation flip automatique
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Clic</h4>
              <p className="text-gray-600 text-sm">
                Cliquez pour maintenir la carte retournée et voir les détails
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Auto-flip</h4>
              <p className="text-gray-600 text-sm">
                Activez l'auto-flip pour voir la carte se retourner automatiquement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardShowcase;
