import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import EvolutionGallery from '../components/EvolutionGallery';
import SquadFieldLogo from '../components/ui/SquadFieldLogo';
import KylianComparison from '../components/KylianComparison';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>SquadField - Crée ta carte de légende</title>
        <meta name="description" content="Transforme ta photo en une carte personnalisée de joueur de foot comme dans FIFA, avec un design pro et unique." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
        {/* Navigation fixe */}
        <nav className="fixed top-4 right-4 z-50">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
              <span className="text-lg">👤</span>
              <span className="font-medium">Mon Compte</span>
            </Link>
          </div>
        </nav>

        {/* Background Effects - Dark Galactic Theme */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Animated Background Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-yellow-500/25 to-orange-500/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/60"></div>
        
        {/* Gaming Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-32 right-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-300"></div>
        <div className="absolute bottom-10 left-32 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-1000"></div>

        {/* Hero Section */}
        <section className="relative z-10 container-fluid pt-20 pb-32">
          <div className={`text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Logo/Title */}
            <div className="mb-12">
              {/* Logo officiel SquadField réduit */}
              <div className="mb-4">
                <SquadFieldLogo className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36" showText={false} />
              </div>
              
              {/* Titre principal */}
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black mb-3">
                <span className="gradient-text text-shadow-lg">Squad</span>
                <span className="gradient-text-gold text-shadow-lg">Field</span>
              </h1>
              
              {/* Tagline */}
              <p className="text-lg md:text-xl text-gray-300 font-sport mb-6">
                Crée ta carte de footballeur légendaire
              </p>
              
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-16 h-1 bg-gradient-primary rounded-full"></div>
                <span className="text-2xl animate-pulse-glow">⚡</span>
                <div className="w-16 h-1 bg-gradient-secondary rounded-full"></div>
              </div>
            </div>

            {/* Subtitle */}
            <div className={`max-w-4xl mx-auto mb-12 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 font-sport font-medium leading-relaxed mb-4">
                Envoie une vidéo de toi en action<br/>
                <span className="gradient-text font-gaming font-bold">on génère ta carte personnalisée</span><br/>
                avec un design unique inspiré des plus grands jeux de foot.
              </p>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto font-sport">
                Rejoins les milliers de joueurs qui ont déjà créé leur carte légendaire.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Link href="/dashboard" className="btn-primary text-lg font-bold px-8 py-4 glow-primary">
                🚀 Créer ma carte maintenant
              </Link>
            </div>
          </div>
        </section>

        {/* Evolution Gallery Section */}
        <EvolutionGallery />

        {/* Kylian Evolution Section */}
        <KylianComparison />

        {/* Features Section */}
        <section className="relative z-10 container-fluid py-20">
          <div className={`transform transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
              <span className="gradient-text">Pourquoi SquadField ?</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="card card-interactive p-8 text-center group">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center glow-primary">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Design Professionnel</h3>
                <p className="text-gray-600 leading-relaxed">
                  Templates inspirés des jeux FIFA avec des graphismes de qualité studio
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card card-interactive p-8 text-center group">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center glow-secondary">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Génération Rapide</h3>
                <p className="text-gray-600 leading-relaxed">
                  Crée ta carte en moins de 2 minutes avec notre outil intuitif
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card card-interactive p-8 text-center group">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl mx-auto mb-6 flex items-center justify-center glow-accent">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Qualité Premium</h3>
                <p className="text-gray-600 leading-relaxed">
                  Résolution HD et effets spéciaux pour un rendu exceptionnel
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative z-10 container-fluid py-20">
          <div className={`text-center transform transition-all duration-1000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                <span className="gradient-text">Prêt à devenir une légende ?</span>
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-sport">
                Rejoins la communauté SquadField et crée ta carte de joueur personnalisée dès maintenant
              </p>
              
              <Link href="/dashboard" className="btn-primary text-xl font-gaming font-bold px-12 py-5 glow-primary animate-pulse-glow-gold">
                🔥 Créer ma carte légendaire
              </Link>
              
              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400 font-sport">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  <span>Gratuit à essayer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-300"></span>
                  <span>Qualité HD garantie</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></span>
                  <span>Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 container-fluid py-12 border-t border-gray-700/50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              <span className="font-display font-bold text-xl gradient-text">SquadField</span>
              <div className="w-8 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-400 font-sport mb-4">
              © 2025 SquadField. Tous droits réservés. Créé avec passion pour les amateurs de football.
            </p>
            
            {/* Liens légaux et RGPD */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
              <Link href="/mentions-legales" className="hover:text-blue-400 transition-colors">
                Mentions Légales
              </Link>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="flex items-center gap-1">
                <span className="text-green-400">🔒</span>
                Conforme RGPD
              </span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="flex items-center gap-1">
                <span className="text-blue-400">✅</span>
                Droits à l'image sécurisés
              </span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
