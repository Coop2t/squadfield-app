import React, { useState } from 'react';
import LuciaTemplate from '../components/templates/LuciaTemplate';

export default function TestTemplates() {
  const [selectedScore, setSelectedScore] = useState(73);

  // Données de test pour différents niveaux
  const testPlayers = [
    {
      name: "ALEXANDRE",
      ageCategory: "U8",
      globalNote: 73,
      scores: {
        technique: 74,
        vitesse: 76,
        physique: 70,
        tirs: 71,
        defense: 74,
        passe: 75
      }
    },
    {
      name: "LUCIA",
      ageCategory: "CADETTE",
      globalNote: 99,
      scores: {
        technique: 99,
        vitesse: 94,
        physique: 94,
        tirs: 97,
        defense: 89,
        passe: 93
      }
    },
    {
      name: "GWEN",
      ageCategory: "U14",
      globalNote: 88,
      scores: {
        technique: 90,
        vitesse: 85,
        physique: 82,
        tirs: 88,
        defense: 80,
        passe: 91
      }
    },
    {
      name: "KYLIAN",
      ageCategory: "SENIOR",
      globalNote: 95,
      scores: {
        technique: 96,
        vitesse: 98,
        physique: 92,
        tirs: 95,
        defense: 85,
        passe: 94
      }
    }
  ];

  const [currentPlayer, setCurrentPlayer] = useState(testPlayers[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🎨 Test Templates SquadField Authentiques
          </h1>
          <p className="text-gray-300 text-lg">
            Système de templates basé sur les vraies images SquadField
          </p>
        </div>

        {/* Contrôles */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">🎮 Contrôles de test</h2>
          
          {/* Sélection du joueur */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {testPlayers.map((player, index) => (
              <button
                key={index}
                onClick={() => setCurrentPlayer(player)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  currentPlayer.name === player.name
                    ? 'border-blue-400 bg-blue-500/20 text-blue-300'
                    : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="font-bold">{player.name}</div>
                <div className="text-sm opacity-80">{player.ageCategory}</div>
                <div className="text-xs mt-1">Note: {player.globalNote}</div>
              </button>
            ))}
          </div>

          {/* Slider de score personnalisé */}
          <div className="mb-4">
            <label className="block text-white font-medium mb-2">
              Score global personnalisé: {selectedScore}
            </label>
            <input
              type="range"
              min="65"
              max="99"
              value={selectedScore}
              onChange={(e) => {
                const score = parseInt(e.target.value);
                setSelectedScore(score);
                setCurrentPlayer({
                  ...currentPlayer,
                  globalNote: score
                });
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>65 (Débutant)</span>
              <span>75 (Débutant+)</span>
              <span>80 (Inter)</span>
              <span>85 (Avancé)</span>
              <span>90 (Expert)</span>
              <span>94 (Elite)</span>
              <span>99 (STAR)</span>
            </div>
          </div>

          {/* Informations du template */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-white mb-2">📊 Template sélectionné</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Nom:</span>
                <span className="text-white ml-2">{currentPlayer.name}</span>
              </div>
              <div>
                <span className="text-gray-400">Catégorie:</span>
                <span className="text-white ml-2">{currentPlayer.ageCategory}</span>
              </div>
              <div>
                <span className="text-gray-400">Note globale:</span>
                <span className="text-white ml-2">{currentPlayer.globalNote}</span>
              </div>
              <div>
                <span className="text-gray-400">Template:</span>
                <span className="text-white ml-2">
                  {currentPlayer.globalNote >= 99 ? 'STAR' :
                   currentPlayer.globalNote >= 94 ? 'Elite (94-98)' :
                   currentPlayer.globalNote >= 90 ? 'Expert (90-94)' :
                   currentPlayer.globalNote >= 85 ? 'Avancé (85-89)' :
                   currentPlayer.globalNote >= 80 ? 'Intermédiaire (80-84)' :
                   currentPlayer.globalNote >= 75 ? 'Débutant+ (75-79)' :
                   'Débutant (65-74)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Affichage de la carte */}
        <div className="flex justify-center">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              🃏 Carte Générée
            </h2>
            
            <div className="flex justify-center">
              <LuciaTemplate 
                name={currentPlayer.name}
                ageCategory={currentPlayer.ageCategory}
                globalNote={currentPlayer.globalNote}
                scores={currentPlayer.scores}
                photo={null}
                onImageGenerated={(imageUrl) => {
                  console.log('✅ Template généré:', currentPlayer.name, currentPlayer.globalNote);
                }}
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Le template change automatiquement selon le score global
              </p>
            </div>
          </div>
        </div>

        {/* Légende */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">📋 Système de Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-700/30 p-3 rounded-lg">
              <div className="font-bold text-yellow-400">⭐ STAR (99)</div>
              <div className="text-gray-300">Template Platine</div>
            </div>
            <div className="bg-gray-700/30 p-3 rounded-lg">
              <div className="font-bold text-purple-400">💎 Elite (94-98)</div>
              <div className="text-gray-300">Template Premium</div>
            </div>
            <div className="bg-gray-700/30 p-3 rounded-lg">
              <div className="font-bold text-blue-400">🏆 Expert (90-94)</div>
              <div className="text-gray-300">Template Avancé</div>
            </div>
            <div className="bg-gray-700/30 p-3 rounded-lg">
              <div className="font-bold text-green-400">🎯 Autres (65-89)</div>
              <div className="text-gray-300">Templates standards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
