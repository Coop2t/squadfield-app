import React, { useState, useEffect } from 'react';
import AIAnalysisService from '../../services/aiAnalysisService';

const AnalysisProgress = ({ isAnalyzing, onComplete, playerData, videoUrl, photoUrl }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  const analysisSteps = [
    {
      name: "Upload en cours",
      description: "Envoi des fichiers vers notre serveur sécurisé",
      duration: 10,
      icon: "📤"
    },
    {
      name: "Analyse de la vidéo",
      description: "Extraction des frames clés et détection des mouvements",
      duration: 20,
      icon: "🎯"
    },
    {
      name: "Évaluation des compétences",
      description: "Analyse IA des performances techniques et physiques",
      duration: 15,
      icon: "🧩"
    },
    {
      name: "Génération de la carte",
      description: "Création de votre carte personnalisée SquadField",
      duration: 10,
      icon: "✨"
    },
    {
      name: "Finalisation",
      description: "Sauvegarde et préparation de votre carte légendaire",
      duration: 5,
      icon: "🎉"
    }
  ];

  useEffect(() => {
    if (!isAnalyzing || !videoUrl) return;

    let analysisAborted = false;

    const startAnalysis = async () => {
      try {
        console.log('🚀 Démarrage de l\'analyse IA avancée...');
        
        // Préparer les données d'analyse
        const analysisData = {
          videoUrl,
          photoUrl,
          playerData: {
            name: playerData.name || 'Joueur',
            age: playerData.age || 20,
            club: playerData.club || 'Club indépendant',
            position: playerData.position || 'Polyvalent'
          }
        };

        // Callback pour mettre à jour le progrès
        const progressCallback = (progressUpdate) => {
          if (analysisAborted) return;
          
          const progressValue = progressUpdate.progress || 0;
          const message = progressUpdate.message || '';
          
          // Mettre à jour l'état du progrès
          setProgress(progressValue);
          
          // Calculer l'étape actuelle basée sur le progrès
          let stepIndex = 0;
          if (progressValue >= 80) stepIndex = 4;
          else if (progressValue >= 60) stepIndex = 3;
          else if (progressValue >= 40) stepIndex = 2;
          else if (progressValue >= 20) stepIndex = 1;
          else stepIndex = 0;
          
          setCurrentStep(stepIndex);
          
          // Calculer le progrès de l'étape actuelle
          const stepRanges = [
            { min: 0, max: 20 },   // Upload
            { min: 20, max: 40 },  // Analyse vidéo
            { min: 40, max: 60 },  // Évaluation
            { min: 60, max: 80 },  // Génération
            { min: 80, max: 100 }  // Finalisation
          ];
          
          const currentRange = stepRanges[stepIndex];
          const stepProgressValue = Math.min(100, 
            ((progressValue - currentRange.min) / (currentRange.max - currentRange.min)) * 100
          );
          setStepProgress(Math.max(0, stepProgressValue));
          
          console.log(`📊 Progrès: ${progressValue}% - ${message}`);
        };

        // Lancer l'analyse complète avec le service IA
        const result = await AIAnalysisService.performCompleteAnalysis(
          analysisData, 
          progressCallback
        );

        if (analysisAborted) return;

        // Formater les résultats pour le frontend
        const formattedResult = AIAnalysisService.formatStatsForFrontend({
          playerName: analysisData.playerData.name,
          age: analysisData.playerData.age,
          stats: result.stats,
          metadata: result.analysis_metadata || {},
          analysisMode: result.analysis_metadata?.mode || 'ai'
        });

        console.log('✅ Analyse terminée:', formattedResult);

        // Étape 4: Génération de la carte SquadField (80-90%)
        setProgress(80);
        setCurrentStep(3);
        setStepProgress(0);

        try {
          console.log('🎨 Génération de la carte SquadField...');
          
          // Générer l'image de carte finale avec le nouveau format
          const cardImageUrl = await AIAnalysisService.generateFinalCard(
            {
              playerName: formattedResult.playerName,
              age: formattedResult.age,
              club: analysisData.playerData.club,
              position: analysisData.playerData.position,
              stats: formattedResult.stats
            },
            {
              photo: photoUrl,
              video: videoUrl
            }
          );

          // Ajouter l'URL de la carte générée aux résultats
          formattedResult.generatedCardUrl = cardImageUrl;
          
          console.log('✅ Carte SquadField générée avec succès!');

        } catch (cardError) {
          console.warn('⚠️ Erreur génération carte, continuant sans:', cardError);
          // Continue sans la carte générée, pas critique
        }

        // Finalisation (90-100%)
        setProgress(90);
        setCurrentStep(4);
        setStepProgress(0);

        // Animation finale
        setProgress(100);
        setStepProgress(100);

        // Délai avant de terminer pour UX
        setTimeout(() => {
          if (!analysisAborted) {
            onComplete(formattedResult);
          }
        }, 1500);

      } catch (error) {
        console.error('❌ Erreur lors de l\'analyse:', error);
        
        if (!analysisAborted) {
          // En cas d'erreur, fallback vers une analyse basique
          const fallbackResult = {
            playerName: playerData.name || 'Joueur',
            age: playerData.age || 20,
            stats: {
              technique: Math.floor(Math.random() * 30) + 60,
              physique: Math.floor(Math.random() * 30) + 60,
              mental: Math.floor(Math.random() * 30) + 60,
              vitesse: Math.floor(Math.random() * 30) + 60,
              tir: Math.floor(Math.random() * 30) + 60,
              passe: Math.floor(Math.random() * 30) + 60,
            },
            analysisMode: 'fallback',
            error: error.message
          };
          
          setProgress(100);
          setCurrentStep(4);
          setStepProgress(100);
          
          setTimeout(() => {
            onComplete(fallbackResult);
          }, 1000);
        }
      }
    };

    startAnalysis();

    // Cleanup function
    return () => {
      analysisAborted = true;
    };
  }, [isAnalyzing, videoUrl, photoUrl, playerData, onComplete]);

  if (!isAnalyzing) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl">🤖</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Analyse IA en cours
          </h2>
          <p className="text-gray-400">
            Notre intelligence artificielle analyse vos performances
          </p>
        </div>

        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-300">Progression globale</span>
            <span className="text-sm font-semibold text-blue-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl animate-pulse">
              {analysisSteps[currentStep]?.icon}
            </span>
            <div>
              <h3 className="font-semibold text-white">
                {analysisSteps[currentStep]?.name}
              </h3>
              <p className="text-sm text-gray-400">
                {analysisSteps[currentStep]?.description}
              </p>
            </div>
          </div>
          
          {/* Step Progress */}
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stepProgress}%` }}
            />
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {analysisSteps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                index < currentStep 
                  ? 'text-green-400' 
                  : index === currentStep 
                    ? 'text-white' 
                    : 'text-gray-500'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                index < currentStep 
                  ? 'bg-green-500 text-white' 
                  : index === currentStep 
                    ? 'bg-blue-500 text-white animate-pulse' 
                    : 'bg-gray-700 text-gray-400'
              }`}>
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className={index === currentStep ? 'font-medium' : ''}>
                {step.name}
              </span>
            </div>
          ))}
        </div>

        {/* Fun Facts */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <p className="text-xs text-gray-400 text-center">
            💡 <strong>Le saviez-vous ?</strong> Notre IA analyse plus de 30 points de données 
            pour évaluer vos performances avec précision !
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;
