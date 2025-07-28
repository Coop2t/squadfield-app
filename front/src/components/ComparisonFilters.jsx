import React, { useState } from 'react';
import RankBadge from './ui/RankBadge';

// Données fictives pour la démonstration
const mockData = {
  club: {
    name: "FC Paris U18",
    totalPlayers: 25,
    averageRating: 78,
    topPlayer: { name: "LUCAS", rating: 92, position: "ATT" },
    userRank: 3
  },
  region: {
    name: "Île-de-France",
    totalPlayers: 1250,
    averageRating: 74,
    topPlayer: { name: "SARAH", rating: 96, position: "MIL" },
    userRank: 47
  },
  france: {
    name: "France",
    totalPlayers: 15400,
    averageRating: 71,
    topPlayer: { name: "ANTOINE", rating: 98, position: "ATT" },
    userRank: 284
  },
  europe: {
    name: "Europe",
    totalPlayers: 89600,
    averageRating: 69,
    topPlayer: { name: "SOFIA", rating: 99, position: "DEF" },
    userRank: 1847
  }
};

// Composant de statistique individuelle
const StatCard = ({ icon, label, value, subtext, color = "blue" }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
        <span className="text-lg">{icon}</span>
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
        {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
      </div>
    </div>
  </div>
);

// Composant de classement avec podium
const RankingCard = ({ data, scope, userRating = 85, isUserCard = false }) => {
  const getBadgeColor = (rank) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500";
    if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-600";
    return "bg-gradient-to-r from-blue-400 to-blue-600";
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "🏅";
  };

  return (
    <div className={`rounded-xl p-6 transition-all duration-300 ${
      isUserCard 
        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg' 
        : 'bg-white shadow-md hover:shadow-lg'
    }`}>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{data.name}</h3>
        {isUserCard && (
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            Votre position
          </span>
        )}
      </div>

      {/* Rang et badge */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full ${getBadgeColor(data.userRank)} flex items-center justify-center text-white font-bold shadow-lg`}>
          {data.userRank <= 3 ? getRankIcon(data.userRank) : data.userRank}
        </div>
        <div>
          <p className="text-sm text-gray-600">Votre rang {scope}</p>
          <p className="text-xl font-bold text-gray-900">#{data.userRank}</p>
          <p className="text-xs text-gray-500">sur {data.totalPlayers.toLocaleString()}</p>
        </div>
      </div>

      {/* Badge de niveau */}
      <div className="mb-4">
        <RankBadge rating={userRating} size="sm" showDescription={true} />
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard 
          icon="📊" 
          label="Moy. générale" 
          value={`${data.averageRating}/100`}
          color="gray"
        />
        <StatCard 
          icon="👑" 
          label="Leader" 
          value={data.topPlayer.name}
          subtext={`${data.topPlayer.rating}/100`}
          color="yellow"
        />
      </div>

      {/* Barre de progression vs moyenne */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">vs Moyenne {scope}</span>
          <span className={`text-sm font-semibold ${
            userRating > data.averageRating ? 'text-green-600' : 'text-orange-600'
          }`}>
            {userRating > data.averageRating ? '+' : ''}{userRating - data.averageRating} pts
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              userRating > data.averageRating 
                ? 'bg-gradient-to-r from-green-400 to-green-600' 
                : 'bg-gradient-to-r from-orange-400 to-orange-600'
            }`}
            style={{ 
              width: `${Math.min(100, Math.max(10, (userRating / Math.max(userRating, data.averageRating)) * 100))}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Composant principal
const ComparisonFilters = ({ userRating = 85, userPosition = "MIL", userAge = 17 }) => {
  const [activeScope, setActiveScope] = useState('club');
  
  const scopes = [
    { 
      key: 'club', 
      label: 'Mon Club', 
      icon: '🏟️', 
      description: 'Compare-toi aux joueurs de ton club',
      color: 'blue'
    },
    { 
      key: 'region', 
      label: 'Ma Région', 
      icon: '🌍', 
      description: 'Vois ta position dans ta région',
      color: 'green'
    },
    { 
      key: 'france', 
      label: 'France', 
      icon: '🇫🇷', 
      description: 'Ton rang parmi tous les français',
      color: 'red'
    },
    { 
      key: 'europe', 
      label: 'Europe', 
      icon: '🇪🇺', 
      description: 'Ta position à l\'échelle européenne',
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête avec sélecteur */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Compare-toi aux Autres Joueurs
        </h3>
        <p className="text-gray-600 mb-6">
          Découvre ta position parmi tes pairs selon différents critères
        </p>
        
        {/* Sélecteur de scope */}
        <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-100 rounded-xl max-w-2xl mx-auto">
          {scopes.map((scope) => (
            <button
              key={scope.key}
              onClick={() => setActiveScope(scope.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeScope === scope.key
                  ? 'bg-white shadow-md text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <span>{scope.icon}</span>
              <span className="hidden sm:inline">{scope.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Description du scope actuel */}
      <div className="text-center">
        <p className="text-gray-600 max-w-lg mx-auto">
          {scopes.find(s => s.key === activeScope)?.description}
        </p>
      </div>

      {/* Carte de classement */}
      <div className="max-w-lg mx-auto">
        <RankingCard 
          data={mockData[activeScope]}
          scope={scopes.find(s => s.key === activeScope)?.label}
          userRating={userRating}
          isUserCard={true}
        />
      </div>

      {/* Conseils d'amélioration */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 max-w-2xl mx-auto">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-lg">💡</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Comment améliorer ton classement ?
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Travaille régulièrement tes points faibles</li>
              <li>• Participe à plus de matchs et d'entraînements</li>
              <li>• Observe et apprends des meilleurs joueurs</li>
              <li>• Maintiens une condition physique optimale</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Objectifs suggérés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🎯</span>
            <h4 className="font-semibold text-gray-900">Objectif Court Terme</h4>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Atteindre le top 30 de ton club
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
            </div>
            <span className="text-xs text-gray-500">60%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🏆</span>
            <h4 className="font-semibold text-gray-900">Objectif Long Terme</h4>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Intégrer le top 100 régional
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '25%'}}></div>
            </div>
            <span className="text-xs text-gray-500">25%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonFilters;
