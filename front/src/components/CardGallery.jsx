import { useState } from 'react';

// Données d'exemple robustes avec valeurs par défaut complètes
const DEFAULT_STATS = {
  technique: 50,
  vitesse: 50,
  physique: 50,
  tirs: 50,
  defense: 50,
  passe: 50
};

const DEFAULT_CARD = {
  id: 'default',
  name: 'JOUEUR',
  category: 'DEBUTANT',
  level: 1,
  rating: 50,
  rarity: 'common',
  image: null,
  stats: DEFAULT_STATS
};

const cardExamples = [
  {
    id: 'gwen-88',
    name: 'GWEN',
    category: 'PRO',
    level: 20,
    rating: 88,
    rarity: 'epic',
    image: '/assets/cards/GwenN88.png.png',
    stats: {
      technique: 85,
      vitesse: 92,
      physique: 78,
      tirs: 84,
      defense: 72,
      passe: 89
    }
  },
  {
    id: 'gwen-76',
    name: 'GWEN',
    category: 'AMATEUR',
    level: 12,
    rating: 76,
    rarity: 'rare',
    image: '/assets/cards/GwenN76.png.png',
    stats: {
      technique: 72,
      vitesse: 78,
      physique: 65,
      tirs: 74,
      defense: 58,
      passe: 81
    }
  },
  {
    id: 'alexandre',
    name: 'ALEXANDRE',
    category: 'ESPOIR',
    level: 18,
    rating: 82,
    rarity: 'rare',
    image: '/assets/cards/Alexandre.png.png',
    stats: {
      technique: 80,
      vitesse: 85,
      physique: 75,
      tirs: 83,
      defense: 70,
      passe: 79
    }
  },
  {
    id: 'max-82',
    name: 'MAX',
    category: 'SEMI-PRO',
    level: 16,
    rating: 82,
    rarity: 'rare',
    image: '/assets/cards/MaxN82.png.png',
    stats: {
      technique: 78,
      vitesse: 84,
      physique: 79,
      tirs: 85,
      defense: 73,
      passe: 75
    }
  },
  {
    id: 'ilir',
    name: 'ILIR',
    category: 'AMATEUR',
    level: 14,
    rating: 78,
    rarity: 'rare',
    image: '/assets/cards/Ilir.png.png',
    stats: {
      technique: 75,
      vitesse: 82,
      physique: 71,
      tirs: 79,
      defense: 68,
      passe: 77
    }
  },
  {
    id: 'elis',
    name: 'ELIS',
    category: 'JUNIOR',
    level: 10,
    rating: 72,
    rarity: 'rare',
    image: '/assets/cards/Elis.png.png',
    stats: {
      technique: 70,
      vitesse: 76,
      physique: 62,
      tirs: 74,
      defense: 58,
      passe: 72
    }
  },
  {
    id: 'k10',
    name: 'K10',
    category: 'LÉGENDE',
    level: 30,
    rating: 95,
    rarity: 'legendary',
    image: '/assets/cards/K10.png.png',
    stats: {
      technique: 96,
      vitesse: 88,
      physique: 85,
      tirs: 98,
      defense: 45,
      passe: 95
    }
  },
  {
    id: 'lucia',
    name: 'LUCIA',
    category: 'CADETTE',
    level: 9,
    rating: 99,
    rarity: 'legendary',
    image: '/assets/cards/lucia-card.png',
    stats: {
      technique: 99,
      vitesse: 94,
      physique: 94,
      tirs: 97,
      defense: 89,
      passe: 93
    }
  },
  {
    id: 'manuka',
    name: 'MANUKA',
    category: 'U15',
    level: 15,
    rating: 84,
    rarity: 'rare',
    image: '/assets/cards/manuka-card.png',
    stats: {
      technique: 76,
      vitesse: 83,
      physique: 73,
      tirs: 80,
      defense: 61,
      passe: 85
    }
  },
  {
    id: 'ace',
    name: 'ACE',
    category: 'ADOLESCENT',
    level: 16,
    rating: 99,
    rarity: 'mythic',
    image: '/assets/cards/ace-card.png',
    stats: {
      technique: 99,
      vitesse: 99,
      physique: 99,
      tirs: 99,
      defense: 99,
      passe: 99
    }
  }
];

const rarityConfig = {
  common: {
    gradient: 'from-gray-400 to-gray-600',
    shadow: 'shadow-lg',
    glow: 'hover:shadow-gray-500/40',
    text: 'Commune',
    icon: '⚽'
  },
  rare: {
    gradient: 'from-blue-400 to-blue-600',
    shadow: 'shadow-lg shadow-blue-500/25',
    glow: 'hover:shadow-blue-500/40',
    text: 'Rare',
    icon: '💙'
  },
  epic: {
    gradient: 'from-purple-400 to-purple-600',
    shadow: 'shadow-lg shadow-purple-500/25',
    glow: 'hover:shadow-purple-500/40',
    text: 'Épique',
    icon: '💜'
  },
  legendary: {
    gradient: 'from-yellow-400 to-yellow-600',
    shadow: 'shadow-lg shadow-yellow-500/25',
    glow: 'hover:shadow-yellow-500/40',
    text: 'Légendaire',
    icon: '⭐'
  },
  mythic: {
    gradient: 'from-red-400 to-red-600',
    shadow: 'shadow-lg shadow-red-500/25',
    glow: 'hover:shadow-red-500/40',
    text: 'Mythique',
    icon: '🔥'
  }
};

// Fonction utilitaire pour valider et normaliser une carte
const validateCard = (card) => {
  if (!card || typeof card !== 'object') {
    return { ...DEFAULT_CARD };
  }

  return {
    id: card.id || DEFAULT_CARD.id,
    name: card.name || DEFAULT_CARD.name,
    category: card.category || DEFAULT_CARD.category,
    level: typeof card.level === 'number' ? Math.max(1, card.level) : DEFAULT_CARD.level,
    rating: typeof card.rating === 'number' ? Math.max(0, Math.min(100, card.rating)) : DEFAULT_CARD.rating,
    rarity: card.rarity && rarityConfig[card.rarity] ? card.rarity : DEFAULT_CARD.rarity,
    image: card.image || null,
    stats: {
      ...DEFAULT_STATS,
      ...(card.stats && typeof card.stats === 'object' ? card.stats : {})
    }
  };
};

// Fonction utilitaire pour obtenir la configuration de rareté de manière sûre
const getRarityConfig = (rarity) => {
  return rarityConfig[rarity] || rarityConfig.common;
};

// Fonction utilitaire pour formater le nom d'une statistique
const formatStatName = (statName) => {
  const statLabels = {
    technique: 'Technique',
    vitesse: 'Vitesse',
    physique: 'Physique',
    tirs: 'Tirs',
    defense: 'Défense',
    passe: 'Passe'
  };
  return statLabels[statName] || statName.charAt(0).toUpperCase() + statName.slice(1);
};

export default function CardGallery() {
  // Validation et initialisation sécurisée
  const validCards = Array.isArray(cardExamples) && cardExamples.length > 0 
    ? cardExamples.map(validateCard)
    : [DEFAULT_CARD];

  const [selectedCard, setSelectedCard] = useState(validCards[0]);

  // Fonction de gestion de sélection sécurisée
  const handleCardSelect = (card) => {
    if (card && card.id) {
      const validatedCard = validateCard(card);
      setSelectedCard(validatedCard);
    }
  };

  // Protection contre l'absence de cartes
  if (!validCards || validCards.length === 0) {
    return (
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Galerie de cartes
          </h2>
          <p className="text-gray-600">Aucune carte disponible pour le moment.</p>
          <div className="mt-8 p-8 bg-gray-100 rounded-xl">
            <div className="text-6xl mb-4">⚽</div>
            <p className="text-gray-500">Chargement des cartes...</p>
          </div>
        </div>
      </section>
    );
  }

  // Validation finale de la carte sélectionnée
  const currentCard = validateCard(selectedCard);
  const currentRarity = getRarityConfig(currentCard.rarity);

  return (
    <section className="relative z-10 container mx-auto px-4 py-20">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Nos Créations
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Découvre les cartes créées par notre communauté SquadField
        </p>
      </div>

      {/* Grille responsive mobile first */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
        {validCards.map((card) => {
          const validatedCard = validateCard(card);
          const rarity = getRarityConfig(validatedCard.rarity);
          const isSelected = currentCard && currentCard.id === validatedCard.id;
          
          return (
            <div
              key={validatedCard.id}
              className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${rarity.glow} ${
                isSelected ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
              onClick={() => handleCardSelect(validatedCard)}
            >
              <div className={`relative bg-gradient-to-br ${rarity.gradient} p-1 rounded-xl ${rarity.shadow}`}>
                <div className="bg-white rounded-lg overflow-hidden">
                  {/* Image de la carte compacte */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {validatedCard.image ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={validatedCard.image}
                          alt={`Carte ${validatedCard.name}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        
                        {/* Effets de rareté */}
                        {validatedCard.rarity === 'legendary' && (
                          <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse"></div>
                        )}
                        {validatedCard.rarity === 'mythic' && (
                          <div className="absolute inset-0 bg-gradient-to-t from-red-400/30 via-transparent to-red-400/30 animate-pulse"></div>
                        )}
                        {validatedCard.rarity === 'epic' && (
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-400/20 via-transparent to-purple-400/20"></div>
                        )}
                        
                        {/* Badge de sélection */}
                        {isSelected && (
                          <div className="absolute top-2 left-2">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Badge de rareté */}
                        <div className="absolute top-2 right-2">
                          <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${rarity.gradient} text-white text-xs font-bold shadow-lg`}>
                            {rarity.icon}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className={`w-12 h-12 mx-auto mb-2 bg-gradient-to-br ${rarity.gradient} rounded-full flex items-center justify-center shadow-md`}>
                            <span className="text-lg text-white">{rarity.icon}</span>
                          </div>
                          <p className="text-xs text-gray-600 font-medium">{validatedCard.name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Infos compactes */}
                  <div className="p-2 md:p-3">
                    <h4 className="font-bold text-xs md:text-sm text-gray-800 truncate">{validatedCard.name}</h4>
                    <p className="text-xs text-gray-600 truncate">{validatedCard.category}</p>
                    <div className="flex items-center justify-between mt-1 md:mt-2">
                      <span className={`px-1.5 py-0.5 md:px-2 md:py-1 text-xs font-bold rounded-full bg-gradient-to-r ${rarity.gradient} text-white`}>
                        {validatedCard.rating}
                      </span>
                      <span className="text-xs text-gray-500 hidden md:block">{rarity.text}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carte sélectionnée détaillée */}
      {selectedCard && (
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* En-tête de la carte */}
            <div className={`bg-gradient-to-r ${currentRarity.gradient} p-6 text-white relative overflow-hidden`}>
              {/* Effets de fond pour les raretés spéciales */}
              {currentCard.rarity === 'legendary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse"></div>
              )}
              {currentCard.rarity === 'mythic' && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 via-transparent to-red-400/30 animate-pulse"></div>
              )}
              
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold">{currentCard.name}</h3>
                  <p className="text-lg opacity-90">{currentCard.category}</p>
                  <p className="text-sm opacity-75">Niveau {currentCard.level}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{currentCard.rating}</div>
                  <p className="text-sm opacity-90 flex items-center justify-end gap-1">
                    <span>{currentRarity.icon}</span>
                    <span>{currentRarity.text}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contenu de la carte */}
            <div className="p-6">
              {/* Image de la carte */}
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 relative overflow-hidden">
                {currentCard.image ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={currentCard.image}
                      alt={`Carte ${currentCard.name}`}
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    
                    {/* Effets de rareté par-dessus l'image */}
                    {currentCard.rarity === 'legendary' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse"></div>
                    )}
                    {currentCard.rarity === 'mythic' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-red-400/30 via-transparent to-red-400/30 animate-pulse"></div>
                    )}
                    {currentCard.rarity === 'epic' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-400/20 via-transparent to-purple-400/20"></div>
                    )}
                    
                    {/* Overlay de rareté */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${currentRarity.gradient} text-white text-xs font-bold shadow-lg`}>
                        {currentRarity.icon} {currentRarity.text}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center z-10">
                      <div className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${currentRarity.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                        <span className="text-3xl text-white">{currentRarity.icon}</span>
                      </div>
                      <p className="text-lg text-gray-700 font-medium">{currentCard.name}</p>
                      <p className="text-sm text-gray-500">{currentCard.category}</p>
                      <div className={`inline-flex px-3 py-1 mt-2 rounded-full bg-gradient-to-r ${currentRarity.gradient} text-white text-sm font-semibold`}>
                        {currentCard.rating}/100
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Statistiques détaillées */}
              <div className="grid grid-cols-2 gap-4">
                {currentCard.stats && Object.entries(currentCard.stats).map(([stat, value]) => {
                  const statValue = typeof value === 'number' ? Math.max(0, Math.min(100, value)) : 0;
                  return (
                    <div key={stat} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">{formatStatName(stat)}</span>
                        <span className="text-2xl font-bold text-gray-800">{statValue}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`bg-gradient-to-r ${currentRarity.gradient} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${statValue}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Informations supplémentaires */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Informations</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">ID: </span>
                    <span className="font-mono text-gray-800">{currentCard.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Niveau: </span>
                    <span className="font-semibold text-gray-800">{currentCard.level}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-16">
        <p className="text-lg text-gray-600 mb-6">
          Crée ta propre carte légendaire comme eux !
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/form"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            🚀 Créer ma carte
          </a>
          <a
            href="/galerie"
            className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-gray-400 transition-all duration-300"
          >
            📸 Voir plus d'exemples
          </a>
        </div>
      </div>
    </section>
  );
}
