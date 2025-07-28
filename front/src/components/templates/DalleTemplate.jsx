import React, { useState, useEffect } from 'react';
import dalleService from '../../services/dalleService';

/**
 * Template DALL-E moderne - Remplace l'ancien système Canvas défaillant
 * Génère des portraits cartoon de qualité professionnelle via DALL-E
 */

const DalleTemplate = ({ 
  name = "JOUEUR",
  ageCategory = "U20", 
  globalNote = 75,
  scores = {
    technique: 75,
    vitesse: 75,
    physique: 75,
    tirs: 75,
    defense: 75,
    passe: 75
  },
  photo = null,
  onImageGenerated = null
}) => {
  const [state, setState] = useState({
    status: 'idle', // idle, generating, success, error, fallback
    progress: 0,
    message: '',
    portraitUrl: null,
    error: null,
    budgetWarning: false
  });

  // Génération du portrait DALL-E
  useEffect(() => {
    const generatePortrait = async () => {
      if (!photo) {
        setState(prev => ({
          ...prev,
          status: 'error',
          error: 'Aucune photo fournie pour la génération DALL-E'
        }));
        return;
      }

      try {
        setState(prev => ({ ...prev, status: 'generating', progress: 0 }));

        // Préparer les données joueur
        const playerData = {
          name: name,
          age: parseInt(ageCategory.replace('U', '')) || 12,
          position: 'football player',
          overall: globalNote,
          stats: scores
        };

        // Callback de progrès
        const progressCallback = (progress, message) => {
          setState(prev => ({
            ...prev,
            progress,
            message: message || 'Génération en cours...'
          }));
        };

        // Appel au service DALL-E
        const result = await dalleService.generateCartoonPortrait(
          playerData, 
          photo, 
          progressCallback
        );

        if (result.success) {
          setState(prev => ({
            ...prev,
            status: 'success',
            progress: 100,
            message: 'Portrait cartoon généré avec succès',
            portraitUrl: result.cartoon_portrait_url,
            budgetWarning: result.generation_metadata?.budget_warning || false
          }));

          // Notifier le parent
          if (onImageGenerated) {
            onImageGenerated(result.cartoon_portrait_url);
          }

        } else if (result.fallback_required) {
          // Fallback automatique
          setState(prev => ({
            ...prev,
            status: 'fallback',
            progress: 100,
            message: 'Mode fallback activé',
            error: result.error
          }));

        } else {
          setState(prev => ({
            ...prev,
            status: 'error',
            error: result.error || 'Erreur de génération DALL-E'
          }));
        }

      } catch (error) {
        console.error('❌ Erreur DalleTemplate:', error);
        setState(prev => ({
          ...prev,
          status: 'error',
          error: error.message || 'Erreur inattendue'
        }));
      }
    };

    generatePortrait();
  }, [name, ageCategory, globalNote, photo, scores, onImageGenerated]);

  // État de chargement
  if (state.status === 'idle' || state.status === 'generating') {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/30">
        <div className="text-center max-w-xs">
          {/* Animation de génération DALL-E */}
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Titre et progrès */}
          <h3 className="text-purple-300 font-bold text-lg mb-2">
            🎨 Génération DALL-E
          </h3>
          
          <p className="text-purple-200 text-sm mb-4">
            {state.message || 'Création du portrait cartoon...'}
          </p>

          {/* Barre de progrès */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${state.progress}%` }}
            ></div>
          </div>

          <p className="text-purple-400 text-xs">
            {state.progress}% terminé
          </p>

          {/* Info joueur pendant génération */}
          <div className="mt-4 p-3 bg-black/30 rounded-lg">
            <p className="text-white font-semibold">{name}</p>
            <p className="text-purple-300 text-sm">{ageCategory} • Note: {globalNote}</p>
          </div>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (state.status === 'error') {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl border border-red-500/30">
        <div className="text-center p-6 max-w-sm">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h3 className="text-red-300 font-bold text-lg mb-2">
            Erreur DALL-E
          </h3>
          <p className="text-red-200 text-sm mb-4">
            {state.error}
          </p>
          
          {/* Informations joueur */}
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-white font-semibold">{name}</p>
            <p className="text-red-300 text-sm">{ageCategory} • Note: {globalNote}</p>
          </div>
          
          <p className="text-red-400 text-xs mt-4">
            💡 Vérifiez la connexion backend et le budget DALL-E
          </p>
        </div>
      </div>
    );
  }

  // État fallback (photo originale traitée)
  if (state.status === 'fallback') {
    return (
      <div className="relative w-full max-w-sm mx-auto">
        {/* Image fallback avec effet */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={photo}
            alt={`Portrait ${name}`}
            className="w-full h-96 object-cover"
          />
          
          {/* Overlay gradient SquadField */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-purple-500/20"></div>
          
          {/* Badge fallback */}
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            FALLBACK
          </div>
          
          {/* Info joueur overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm opacity-90">{ageCategory} • Note: {globalNote}</p>
            
            {/* Stats rapides */}
            <div className="flex gap-2 mt-2 text-xs">
              <span className="bg-white/20 px-2 py-1 rounded">TEC {scores.technique}</span>
              <span className="bg-white/20 px-2 py-1 rounded">VIT {scores.vitesse}</span>
              <span className="bg-white/20 px-2 py-1 rounded">TIR {scores.tirs}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // État de succès - Portrait DALL-E généré
  if (state.status === 'success' && state.portraitUrl) {
    return (
      <div className="relative w-full max-w-sm mx-auto">
        {/* Portrait cartoon DALL-E */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={state.portraitUrl}
            alt={`Portrait cartoon ${name}`}
            className="w-full h-96 object-cover"
            onLoad={() => console.log('✅ Portrait DALL-E chargé avec succès')}
            onError={() => {
              console.error('❌ Erreur chargement portrait DALL-E');
              setState(prev => ({ ...prev, status: 'error', error: 'Erreur de chargement image' }));
            }}
          />
          
          {/* Badge DALL-E */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            🎨 DALL-E
          </div>
          
          {/* Warning budget si nécessaire */}
          {state.budgetWarning && (
            <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              ⚠️ BUDGET
            </div>
          )}
          
          {/* Overlay gradient SquadField */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {/* Info joueur overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-bold text-lg drop-shadow-lg">{name}</h3>
            <p className="text-sm opacity-90 drop-shadow">{ageCategory} • Note: {globalNote}</p>
            
            {/* Stats en grille */}
            <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
              <div className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-center">
                <div className="text-yellow-400 font-bold">{scores.technique}</div>
                <div className="text-xs opacity-80">TEC</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-center">
                <div className="text-green-400 font-bold">{scores.vitesse}</div>
                <div className="text-xs opacity-80">VIT</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-center">
                <div className="text-red-400 font-bold">{scores.tirs}</div>
                <div className="text-xs opacity-80">TIR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Effet de brillance carte premium */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse opacity-50"></div>
      </div>
    );
  }

  // État par défaut
  return (
    <div className="w-full h-96 flex items-center justify-center bg-gray-800/50 rounded-2xl border border-gray-700/50">
      <div className="text-center">
        <div className="text-gray-400 text-3xl mb-2">🎯</div>
        <p className="text-gray-400 text-sm">Template DALL-E initialisé</p>
      </div>
    </div>
  );
};

export default DalleTemplate;
