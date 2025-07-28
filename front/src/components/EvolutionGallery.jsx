import React, { useState, useEffect } from 'react';
import RankBadge, { getRankFromRating, getRankConfig } from './ui/RankBadge';
import ComparisonFilters from './ComparisonFilters';

// Cartes d'exemple organisées par rangs avec données fictives réalistes
const cardsByRank = {
  platine: [
    {
      id: 'leo-97',
      name: 'LEO',
      category: 'PROFESSIONNEL',
      level: 28,
      rating: 97,
      age: 22,
      position: 'ATT',
      club: 'FC Barcelona B',
      region: 'Catalogne',
      country: 'Espagne',
      image: '/assets/cards/GwenN88.png.png', // Utilisation temporaire
      progression: '+12 en 2 ans',
      achievement: 'Meilleur buteur Liga B'
    },
    {
      id: 'sofia-96',
      name: 'SOFIA',
      category: 'ELITE FÉMININ',
      level: 26,
      rating: 96,
      age: 20,
      position: 'DEF',
      club: 'Wolfsburg U21',
      region: 'Basse-Saxe',
      country: 'Allemagne',
      image: '/assets/cards/lucia-card.png',
      progression: '+8 en 18 mois',
      achievement: 'Défenseure de l\'année U21'
    }
  ],
  dore: [
    {
      id: 'antoine-92',
      name: 'ANTOINE',
      category: 'CENTRE FORMATION',
      level: 24,
      rating: 92,
      age: 18,
      position: 'MIL',
      club: 'OL Academy',
      region: 'Auvergne-Rhône-Alpes',
      country: 'France',
      image: '/assets/cards/MaxN82.png.png',
      progression: '+15 en 2 ans',
      achievement: 'Capitaine équipe France U18'
    },
    {
      id: 'lucas-91',
      name: 'LUCAS',
      category: 'ESPOIR PRO',
      level: 23,
      rating: 91,
      age: 19,
      position: 'ATT',
      club: 'PSG Academy',
      region: 'Île-de-France',
      country: 'France',
      image: '/assets/cards/K10.png.png',
      progression: '+10 en 15 mois',
      achievement: 'Top 3 buteurs National'
    }
  ],
  violet: [
    {
      id: 'emma-87',
      name: 'EMMA',
      category: 'ACADÉMIE ELITE',
      level: 20,
      rating: 87,
      age: 17,
      position: 'MIL',
      club: 'Clairefontaine',
      region: 'Île-de-France',
      country: 'France',
      image: '/assets/cards/GwenN76.png.png',
      progression: '+9 en 12 mois',
      achievement: 'MVP Tournoi National U17'
    },
    {
      id: 'marco-86',
      name: 'MARCO',
      category: 'TALENT CONFIRMÉ',
      level: 19,
      rating: 86,
      age: 16,
      position: 'DEF',
      club: 'AC Milan Youth',
      region: 'Lombardie',
      country: 'Italie',
      image: '/assets/cards/Alexandre.png.png',
      progression: '+7 en 10 mois',
      achievement: 'Meilleur défenseur Serie A Youth'
    }
  ],
  vert: [
    {
      id: 'marie-82',
      name: 'MARIE',
      category: 'RÉGIONAL ÉLITE',
      level: 16,
      rating: 82,
      age: 16,
      position: 'GK',
      club: 'FC Metz Féminin',
      region: 'Grand Est',
      country: 'France',
      image: '/assets/cards/Ilir.png.png',
      progression: '+12 en 18 mois',
      achievement: 'Gardienne région Grand Est'
    },
    {
      id: 'alex-81',
      name: 'ALEX',
      category: 'AMATEUR ÉLITE',
      level: 15,
      rating: 81,
      age: 15,
      position: 'MIL',
      club: 'ES Wasquehal',
      region: 'Hauts-de-France',
      country: 'France',
      image: '/assets/cards/manuka-card.png',
      progression: '+6 en 8 mois',
      achievement: 'Meilleur jeune Hauts-de-France'
    }
  ],
  jaune: [
    {
      id: 'tom-77',
      name: 'TOM',
      category: 'EN PROGRESSION',
      level: 12,
      rating: 77,
      age: 14,
      position: 'ATT',
      club: 'FC Nantes U15',
      region: 'Pays de la Loire',
      country: 'France',
      image: '/assets/cards/Elis.png.png',
      progression: '+8 en 12 mois',
      achievement: 'Révélation championnat U15'
    },
    {
      id: 'lea-76',
      name: 'LÉA',
      category: 'MONTANTE',
      level: 11,
      rating: 76,
      age: 14,
      position: 'DEF',
      club: 'Girondins U15 F',
      region: 'Nouvelle-Aquitaine',
      country: 'France',
      image: '/assets/cards/ace-card.png',
      progression: '+10 en 15 mois',
      achievement: 'Capitaine équipe régionale'
    }
  ],
  bronze: [
    {
      id: 'paul-72',
      name: 'PAUL',
      category: 'DÉBUTANT MOTIVÉ',
      level: 8,
      rating: 72,
      age: 13,
      position: 'MIL',
      club: 'AS Monaco U14',
      region: 'PACA',
      country: 'France',
      image: '/assets/cards/GwenN76.png.png',
      progression: '+15 en 18 mois',
      achievement: 'Joueur le plus progressant'
    },
    {
      id: 'julie-70',
      name: 'JULIE',
      category: 'ESPOIR',
      level: 7,
      rating: 70,
      age: 12,
      position: 'ATT',
      club: 'RC Lens U13 F',
      region: 'Hauts-de-France',
      country: 'France',
      image: '/assets/cards/lucia-card.png',
      progression: '+18 en 2 ans',
      achievement: 'Goleadora championnat U13'
    }
  ]
};

// Composant pour une carte individuelle
const EvolutionCard = ({ card, isSelected, onClick, showProgression = true }) => {
  const rank = getRankFromRating(card.rating);
  const rankConfig = getRankConfig(rank);

  return (
    <div
      className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-500 scale-105' : ''
      }`}
      onClick={() => onClick(card)}
    >
      <div className={`relative bg-gradient-to-br ${rankConfig.gradient} p-1 rounded-xl ${rankConfig.shadow} ${rankConfig.glow}`}>
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Image de la carte */}
          <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
            {card.image ? (
              <div className="relative w-full h-full">
                <img 
                  src={card.image}
                  alt={`Carte ${card.name}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Effets spéciaux selon le rang */}
                {rank === 'platine' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 via-transparent to-cyan-400/20 animate-pulse"></div>
                    <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 right-2 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-500"></div>
                  </>
                )}
                {rank === 'dore' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 via-transparent to-yellow-400/20"></div>
                )}
                
                {/* Badge de rang */}
                <div className="absolute top-2 right-2">
                  <RankBadge rating={card.rating} size="xs" animated={false} />
                </div>

                {/* Badge de progression */}
                {showProgression && (
                  <div className="absolute bottom-2 left-2">
                    <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      {card.progression}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-2 bg-gradient-to-br ${rankConfig.gradient} rounded-full flex items-center justify-center shadow-md`}>
                    <span className="text-lg text-white">{rankConfig.icon}</span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{card.name}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Infos de la carte */}
          <div className="p-3">
            <p className="text-xs text-gray-600 truncate font-semibold">{card.category}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-500">
                <span>{card.position} • {card.age} ans</span>
              </div>
              <span className="text-xs text-gray-500">{card.club}</span>
            </div>
            {/* Achievement */}
            <div className="mt-2 bg-blue-50 rounded-lg p-2">
              <p className="text-xs text-blue-800 font-medium truncate">
                🏆 {card.achievement}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant principal
const EvolutionGallery = () => {
  const [selectedRank, setSelectedRank] = useState('all');
  const [selectedCard, setSelectedCard] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const ranks = [
    { key: 'all', label: 'Tous les Rangs', icon: '🌟' },
    { key: 'platine', label: 'Platine', icon: '🟦' },
    { key: 'dore', label: 'Doré', icon: '🟨' },
    { key: 'violet', label: 'Violet', icon: '🟪' },
    { key: 'vert', label: 'Vert', icon: '🟩' },
    { key: 'jaune', label: 'Jaune', icon: '🟨' },
    { key: 'bronze', label: 'Bronze', icon: '⬜' }
  ];

  // Obtenir les cartes selon le filtre
  const getFilteredCards = () => {
    if (selectedRank === 'all') {
      return Object.values(cardsByRank).flat();
    }
    return cardsByRank[selectedRank] || [];
  };

  const filteredCards = getFilteredCards();

  return (
    <section className="relative z-10 container-fluid py-20 overflow-hidden" data-section="evolution-gallery">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-3xl"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
            <span className="gradient-text">Découvre ton</span>{' '}
            <span className="gradient-text-gold">Potentiel d'Évolution</span>
          </h2>
          
          {/* Nouveau texte avec style identique à KylianComparison */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-8">
              <p className="text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-tight mb-4">
                <span className="gradient-text">Exprime ton talent</span>{' '}
                <span className="gradient-text-gold">et vise l'excellence.</span>
              </p>
              <p className="text-xl text-gray-200 font-sport leading-relaxed">
                Chaque champion a commencé quelque part…
              </p>
            </div>
          </div>
        </div>
        
        {/* Statistiques inspirantes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">2,847</div>
            <div className="text-xs text-gray-600">Joueurs actifs</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-green-600">+156</div>
            <div className="text-xs text-gray-600">Progressions ce mois</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">47</div>
            <div className="text-xs text-gray-600">Nouveaux Platine</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-orange-600">92%</div>
            <div className="text-xs text-gray-600">Satisfaction</div>
          </div>
        </div>

        {/* Bouton d'action principal */}
        <div className="flex justify-center mb-8">
          <a
            href="/form"
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 glow-primary"
          >
            🚀 Créer ta carte et vise l'excellence
          </a>
        </div>

        {/* Bouton masqué pour déclencher la comparaison via la navigation */}
        <button
          onClick={() => setShowComparison(!showComparison)}
          data-action="toggle-comparison"
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {/* Section de comparaison */}
      {showComparison && (
        <div className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
          <ComparisonFilters userRating={85} userPosition="MIL" userAge={17} />
        </div>
      )}

      {/* Filtres par rang avec notes intégrées */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 p-2 bg-white rounded-xl shadow-sm max-w-5xl mx-auto">
        {ranks.map((rank) => {
          const getRangeText = (key) => {
            switch(key) {
              case 'platine': return '(95-99)';
              case 'dore': return '(90-94)';
              case 'violet': return '(85-89)';
              case 'vert': return '(80-84)';
              case 'jaune': return '(75-79)';
              case 'bronze': return '(0-74)';
              default: return '';
            }
          };
          
          return (
            <button
              key={rank.key}
              onClick={() => setSelectedRank(rank.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedRank === rank.key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <span>{rank.icon}</span>
              <div className="flex flex-col items-center">
                <span className="hidden sm:inline text-sm">{rank.label}</span>
                {rank.key !== 'all' && (
                  <span className="text-xs opacity-75">{getRangeText(rank.key)}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Message motivant selon le rang sélectionné */}
      {selectedRank !== 'all' && (
        <div className="text-center mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm max-w-2xl mx-auto">
            <RankBadge rating={getRankConfig(selectedRank).range[1]} showDescription={true} />
            <p className="text-sm text-gray-600 mt-2">
              {selectedRank === 'platine' && "L'élite mondiale ! Ces joueurs sont des modèles d'excellence."}
              {selectedRank === 'dore' && "Niveau professionnel confirmé. Ils montrent la voie vers le sommet."}
              {selectedRank === 'violet' && "Talents exceptionnels avec un potentiel énorme."}
              {selectedRank === 'vert' && "Solides bases et progression constante vers l'excellence."}
              {selectedRank === 'jaune' && "En pleine progression ! Chaque entraînement compte."}
              {selectedRank === 'bronze' && "Le début d'une grande aventure ! Tout est possible."}
            </p>
          </div>
        </div>
      )}

      {/* Grille des cartes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
        {filteredCards.map((card) => (
          <EvolutionCard
            key={card.id}
            card={card}
            isSelected={selectedCard?.id === card.id}
            onClick={setSelectedCard}
          />
        ))}
      </div>

      {/* Message si aucune carte */}
      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚽</div>
          <p className="text-gray-500">Aucune carte disponible pour ce rang.</p>
        </div>
      )}

      {/* Section d'inspiration Success Stories (conservée sans les CTA) */}
      <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Success Stories SquadField
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl mb-2">📈</div>
            <h4 className="font-semibold text-gray-900">Marie, 16 ans</h4>
            <p className="text-sm text-gray-600">Bronze → Vert en 18 mois</p>
            <p className="text-xs text-gray-500 mt-2">"SquadField m'a motivée à m'améliorer chaque jour"</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="font-semibold text-gray-900">Antoine, 18 ans</h4>
            <p className="text-sm text-gray-600">Vert → Doré en 2 ans</p>
            <p className="text-xs text-gray-500 mt-2">"Maintenant capitaine de l'équipe France U18"</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-3xl mb-2">⭐</div>
            <h4 className="font-semibold text-gray-900">Sofia, 20 ans</h4>
            <p className="text-sm text-gray-600">Violet → Platine en 3 ans</p>
            <p className="text-xs text-gray-500 mt-2">"Signée en équipe professionnelle !"</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvolutionGallery;
