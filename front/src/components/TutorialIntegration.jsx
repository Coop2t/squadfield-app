import React, { useState } from 'react';

const TutorialIntegration = ({ onComplete, className = "" }) => {
  const [activeTab, setActiveTab] = useState('guide');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Choisis ton terrain",
      description: "Sélectionne le style de carte qui correspond à ta personnalité",
      icon: "🏟️",
      duration: "30s"
    },
    {
      id: 2,
      title: "Upload ta photo",
      description: "Une photo claire de face pour un rendu optimal",
      icon: "📸",
      duration: "10s"
    },
    {
      id: 3,
      title: "Définis tes stats",
      description: "Évalue tes compétences sur 6 critères essentiels",
      icon: "⚡",
      duration: "2min"
    },
    {
      id: 4,
      title: "Génère ta carte",
      description: "Notre IA crée ta carte personnalisée en quelques secondes",
      icon: "🎨",
      duration: "5s"
    }
  ];

  return (
    <div className={`bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl p-6 md:p-8 ${className}`}>
      {/* En-tête */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Comment créer ta carte légendaire ?
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Suis notre guide étape par étape pour réaliser des cartes qui feront de toi un chef-d'œuvre
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-700/50 rounded-xl p-1 flex">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'guide'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
            }`}
          >
            📋 Guide Complet
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'video'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
            }`}
          >
            🎬 Vidéo Exemple
          </button>
        </div>
      </div>

      {/* Contenu du guide */}
      {activeTab === 'guide' && (
        <div className="space-y-6">
          {/* Informations rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-green-400 font-semibold">3 exercices simples</div>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📍</div>
              <div className="text-blue-400 font-semibold">N'importe où</div>
            </div>
            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">⏱️</div>
              <div className="text-purple-400 font-semibold">5 minutes max</div>
            </div>
          </div>

          {/* Étapes du processus */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Le Processus</h3>
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
              >
                {/* Numéro et icône */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {step.id}
                  </div>
                </div>
                
                {/* Contenu */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{step.icon}</span>
                    <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                    <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full ml-auto">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                
                {/* Connecteur */}
                {index < steps.length - 1 && (
                  <div className="absolute left-10 mt-12 w-0.5 h-4 bg-gray-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contenu de la vidéo */}
      {activeTab === 'video' && (
        <div className="space-y-6">
          {/* Présentation de la vidéo */}
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🎬</div>
              <div>
                <h3 className="text-xl font-semibold text-white">Tutoriel Complet</h3>
                <p className="text-gray-300">Gwen te montre comment bien réaliser tes vidéos</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <span>💡 Suis ses conseils pour un résultat optimal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vidéo */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 relative">
              {!isVideoPlaying ? (
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black text-sm ml-1">▶</span>
                      </div>
                    </div>
                    <h4 className="text-white font-semibold text-lg mb-2">🎯 Tuto Gwen</h4>
                    <p className="text-gray-200 text-sm">Clique pour voir comment créer ta carte parfaite</p>
                  </div>
                  
                  {/* Badge TUTORIEL */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    TUTORIEL
                  </div>
                </div>
              ) : (
                <video 
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover"
                  poster="/api/placeholder/800/450"
                >
                  <source src="/assets/Vidéo/Tuto Gwen.MOV" type="video/mp4" />
                  Votre navigateur ne supporte pas la balise vidéo.
                </video>
              )}
            </div>
            
            {/* Description sous la vidéo */}
            <div className="p-4">
              <p className="text-gray-300 text-sm">
                Gwen te guide pas à pas pour réaliser des vidéos de qualité professionnelle avec ton smartphone.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-green-400 text-sm">🎯 Suis ses conseils pour un résultat optimal</span>
              </div>
            </div>
          </div>

          {/* Conseils rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💡</span>
                <h4 className="font-semibold text-white">Astuce Pro</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Utilise la lumière naturelle pour un rendu optimal de ta photo
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📸</span>
                <h4 className="font-semibold text-white">Photo Parfaite</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Assure-toi d'être bien centré et de regarder l'objectif
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bouton d'action */}
      <div className="text-center mt-8">
        <button
          onClick={onComplete}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          ✨ C'est parti, créons ma carte !
        </button>
        
        <p className="text-gray-400 text-sm mt-3">
          Prêt ? Le processus ne prend que quelques minutes
        </p>
      </div>
    </div>
  );
};

export default TutorialIntegration;
