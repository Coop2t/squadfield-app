import { useState, useEffect } from 'react';

export default function HowToSection({ onComplete }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      number: '01',
      icon: '🎬',
      title: 'Réalise ta vidéo',
      subtitle: 'Suis l\'exemple de Gwen',
      description: 'Filme-toi en action avec les 3 exercices : sprint, dribble et tir. Gwen te montre exactement comment faire dans la vidéo ci-dessous.',
      features: ['Format paysage', 'Bonne luminosité', '3 exercices simples', '15 secondes / vidéo'],
      color: 'from-blue-500 to-purple-600',
      bgColor: 'from-blue-900/20 to-purple-900/20'
    },
    {
      number: '02',
      icon: '📤',
      title: 'Upload ta création',
      subtitle: 'Vidéo + Photo de profil',
      description: 'Télécharge ta vidéo d\'exercices et ajoute une belle photo de profil. Notre système intelligent analysera automatiquement tes performances.',
      features: ['Vidéo d\'exercices', 'Photo de face', 'Analyse automatique', 'Sécurisé et rapide'],
      color: 'from-green-500 to-blue-600',
      bgColor: 'from-green-900/20 to-blue-900/20'
    },
    {
      number: '03',
      icon: '🤖',
      title: 'L\'IA génère ta carte',
      subtitle: 'Magie en 2 minutes',
      description: 'Notre intelligence artificielle analyse tes vidéos, évalue tes compétences et crée ta carte personnalisée avec design professionnel.',
      features: ['Analyse IA avancée', 'Design automatique', 'Stats personnalisées', 'Résultat en 2 min'],
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-900/20 to-pink-900/20'
    },
    {
      number: '04',
      icon: '🏆',
      title: 'Récupère et améliore',
      subtitle: 'Ton profil de champion',
      description: 'Retrouve ta carte dans ton profil, compare-toi aux autres joueurs et améliore tes performances. 3 cartes gratuites, puis 1€ par carte.',
      features: ['3 cartes offertes', 'Comparaison gratuite', 'Suivi progression', '1€ par carte suivante'],
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-900/20 to-orange-900/20'
    },
    {
      number: '05',
      icon: '🎨',
      title: 'Personnalise et imprime',
      subtitle: 'Carte physique premium',
      description: 'Customise ta carte avec des designs exclusifs et commande ton lot de 5 cartes physiques premium depuis ton espace personnel.',
      features: ['Designs exclusifs', 'Impression premium', 'Lot de 5 cartes', 'Livraison rapide'],
      color: 'from-pink-500 to-red-600',
      bgColor: 'from-pink-900/20 to-red-900/20'
    }
  ];

  return (
    <section className="relative z-10 container-fluid py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10 rounded-3xl"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-green-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
            <span className="gradient-text">Comment créer</span>{' '}
            <span className="gradient-text-gold">ta carte légendaire ?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto font-sport leading-relaxed mb-8">
            Suis notre guide étape par étape pour réaliser des vidéos qui feront de ta carte un chef-d'œuvre
          </p>
          
          {/* Quick stats */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm text-gray-400 font-sport">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>3 exercices simples</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></span>
              <span>N'importe où</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></span>
              <span>réalisée en 5 minutes</span>
            </div>
          </div>
        </div>

        {/* Main Content - 5 Steps Process */}
        <div className="max-w-6xl mx-auto">
          {/* Pricing Banner */}
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 mb-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">🎯 Offre de Lancement</h3>
            <p className="text-green-400 text-lg font-semibold">3 cartes gratuites puis 1€ par carte</p>
            <p className="text-gray-300 text-sm mt-2">Profite de cette offre exceptionnelle pour démarrer ton aventure SquadField</p>
          </div>

          {/* Steps Grid */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative ${index === 0 ? 'mb-12' : ''}`}
                onClick={() => setActiveStep(activeStep === step.number ? null : step.number)}
              >
                <div className={`bg-gradient-to-r ${step.bgColor} backdrop-blur-sm rounded-2xl border border-gray-700/30 overflow-hidden cursor-pointer transition-all duration-500 hover:border-gray-600/50 ${
                  activeStep === step.number ? 'ring-2 ring-blue-500/30' : ''
                }`}>
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      {/* Step Number */}
                      <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-2xl`}>
                        {step.number}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-4xl">{step.icon}</span>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                            <p className="text-gray-300 font-medium">{step.subtitle}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-200 text-lg leading-relaxed mb-6">
                          {step.description}
                        </p>
                        
                        {/* Features */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {step.features.map((feature) => (
                            <div key={feature} className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                              <span className="text-white text-sm font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Expand Arrow */}
                      <div className="flex-shrink-0 text-gray-400 transition-transform duration-300">
                        <svg 
                          className={`w-6 h-6 transform ${activeStep === step.number ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Expanded Content for Step 1 */}
                    {activeStep === step.number && step.number === '01' && (
                      <div className="mt-8 pt-8 border-t border-gray-600/30">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Video Tutorial */}
                          <div>
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                              🎬 Exemple de Gwen
                            </h4>
                            <div className="bg-gray-800/50 rounded-xl overflow-hidden">
                              <div className="aspect-video relative">
                                <video 
                                  controls 
                                  className="w-full h-full object-cover"
                                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' fill='%23374151'/%3E%3Ctext x='320' y='180' text-anchor='middle' font-family='Arial' font-size='24' fill='%23ffffff'%3E🎬 Tuto Gwen%3C/text%3E%3C/svg%3E"
                                >
                                  <source src="/assets/Vidéo/Tuto Gwen.MOV" type="video/quicktime" />
                                  <source src="/assets/Vidéo/Tuto Gwen.MOV" type="video/mp4" />
                                  Votre navigateur ne supporte pas les vidéos HTML5.
                                </video>
                                <div className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-bold">
                                  EXEMPLE
                                </div>
                              </div>
                              <div className="p-4">
                                <p className="text-gray-300 text-sm">
                                  🎯 Suis exactement cet exemple pour réussir ta vidéo
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Instructions */}
                          <div>
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                              📋 Les 3 exercices
                            </h4>
                            <div className="space-y-4">
                              <div className="bg-blue-800/30 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-2xl">🏃‍♂️</span>
                                  <h5 className="font-bold text-white">Sprint</h5>
                                </div>
                                <p className="text-gray-300 text-sm">Course rapide sur 20 mètres</p>
                              </div>
                              
                              <div className="bg-green-800/30 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-2xl">⚽</span>
                                  <h5 className="font-bold text-white">Dribble</h5>
                                </div>
                                <p className="text-gray-300 text-sm">Slalom autour d'obstacles</p>
                              </div>
                              
                              <div className="bg-red-800/30 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-2xl">🥅</span>
                                  <h5 className="font-bold text-white">Tir</h5>
                                </div>
                                <p className="text-gray-300 text-sm">Frappe puissante au but</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-6 mb-2">
                    <div className="w-1 h-12 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl border border-green-500/30 mb-8">
            <span className="text-2xl animate-pulse">⚡</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold">
              <span className="gradient-text">Prêt à créer</span>{' '}
              <span className="gradient-text-gold">ta légende ?</span>
            </h3>
            <span className="text-2xl animate-pulse delay-500">🏆</span>
          </div>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-sport">
            Avec ces étapes simples, tu as tout ce qu'il faut pour créer une carte qui te ressemble vraiment
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => onComplete && onComplete()}
              className="btn-primary text-lg font-bold px-8 py-4 glow-primary"
            >
              🚀 Commencer ma carte
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
