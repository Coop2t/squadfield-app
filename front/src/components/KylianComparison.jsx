import { useState, useEffect } from 'react';

export default function KylianComparison() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentView, setCurrentView] = useState('young'); // 'young' or 'adult'

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView(prev => prev === 'young' ? 'adult' : 'young');
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const kylianYoung = {
    name: "KYLIAN",
    age: "10 ANS",
    rating: 45,
    category: "ROOKIE",
    image: "/assets/cards/Kylian jeune.png.png",
    stats: {
      technique: 35,
      vitesse: 60,
      physique: 25,
      tirs: 40,
      defense: 30,
      passe: 38
    }
  };

  const kylianAdult = {
    name: "KYLIAN",
    age: "MAINTENANT",
    rating: 99,
    category: "SUPERSTAR",
    image: "/assets/cards/Kylian Adulte.png.png",
    stats: {
      technique: 99,
      vitesse: 99,
      physique: 88,
      tirs: 96,
      defense: 65,
      passe: 92
    }
  };

  const currentKylian = currentView === 'young' ? kylianYoung : kylianAdult;

  return (
    <section className="relative z-10 container-fluid py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-yellow-900/20 rounded-3xl"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
            <span className="gradient-text">L'Évolution</span>{' '}
            <span className="gradient-text-gold">d'un Champion</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-sport leading-relaxed">
            Découvrez comment une passion devient légende
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            
            {/* Left Card - Kylian Young */}
            <div className={`transform transition-all duration-1000 ${currentView === 'young' ? 'scale-105 glow-primary' : 'scale-95 opacity-75'}`}>
              <div className="relative">
                {/* Card Container */}
                <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-1 rounded-2xl shadow-2xl">
                  <div className="bg-white rounded-xl overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white relative">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold">{kylianYoung.name}</h3>
                          <p className="text-lg opacity-90">{kylianYoung.age}</p>
                          <p className="text-sm opacity-75">{kylianYoung.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm opacity-90">⭐ POTENTIEL</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card Image */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img 
                        src={kylianYoung.image}
                        alt="Kylian Jeune"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='533' viewBox='0 0 400 533'%3E%3Crect width='400' height='533' fill='%23f3f4f6'/%3E%3Ctext x='200' y='266' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3EKylian Jeune%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-blue-500/90 backdrop-blur-sm rounded-lg p-3 text-white">
                          <div className="text-center font-bold">DÉBUTANT PROMETTEUR</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
                  🌟 ROOKIE
                </div>
              </div>
            </div>

            {/* Center Arrow/VS */}
            <div className="flex items-center justify-center lg:col-span-2 lg:order-3 lg:col-start-1 lg:col-end-3 my-8 lg:my-0">
              <div className="relative">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                  
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                      <div className="text-white font-black text-2xl transform rotate-12">VS</div>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-yellow-400 font-bold text-sm">ÉVOLUTION</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-16 h-1 bg-gradient-to-l from-yellow-500 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Right Card - Kylian Adult */}
            <div className={`transform transition-all duration-1000 lg:order-2 ${currentView === 'adult' ? 'scale-105 glow-secondary' : 'scale-95 opacity-75'}`}>
              <div className="relative">
                {/* Card Container */}
                <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-1 rounded-2xl shadow-2xl">
                  <div className="bg-white rounded-xl overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white relative">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold">{kylianAdult.name}</h3>
                          <p className="text-lg opacity-90">{kylianAdult.age}</p>
                          <p className="text-sm opacity-75">{kylianAdult.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm opacity-90">🔥 LÉGENDE</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card Image */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img 
                        src={kylianAdult.image}
                        alt="Kylian Adulte"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='533' viewBox='0 0 400 533'%3E%3Crect width='400' height='533' fill='%23f3f4f6'/%3E%3Ctext x='200' y='266' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3EKylian Adulte%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-yellow-500/90 backdrop-blur-sm rounded-lg p-3 text-white">
                          <div className="text-center font-bold">SUPERSTAR MONDIALE</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-yellow-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce delay-500">
                  🏆 STAR
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl border border-purple-500/30">
              <span className="text-2xl animate-pulse">🚀</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold">
                <span className="gradient-text-gold">From Rookie to Star.</span>{' '}
                <span className="gradient-text">Own your game.</span>
              </h3>
              <span className="text-2xl animate-pulse delay-500">⭐</span>
            </div>
            
            <p className="text-lg text-gray-300 mt-6 max-w-2xl mx-auto font-sport">
              Chaque champion a commencé quelque part. 
              <span className="gradient-text-gold font-semibold"> Quelle sera ton évolution ?</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
