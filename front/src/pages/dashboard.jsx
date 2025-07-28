import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../utils/firebase';
import CardPreview from '../components/CardPreview';
import SquadFieldCardDisplay from '../components/ui/SquadFieldCardDisplay';
import RankBadge from '../components/ui/RankBadge';

export default function Dashboard() {
  const router = useRouter();
  const { currentUser, userProfile, logoutUser, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [userCards, setUserCards] = useState([]);
  const [rankingHistory, setRankingHistory] = useState([]);
  const [loadingCards, setLoadingCards] = useState(false);
  const [showParentalControl, setShowParentalControl] = useState(false);
  const [parentalCode, setParentalCode] = useState('');
  const [stats, setStats] = useState({
    totalCards: 3,
    currentRank: 'Doré',
    currentRating: 89,
    weeklyProgress: '+5',
    monthlyProgress: '+12',
    achievements: ['Premier But', 'Défenseur Solide', 'Stratège']
  });

  // Données simulées pour l'évolution du classement
  const mockRankingData = [
    { week: 'S1', rating: 77, rank: 'Bronze' },
    { week: 'S2', rating: 82, rank: 'Vert' },
    { week: 'S3', rating: 85, rank: 'Vert' },
    { week: 'S4', rating: 89, rank: 'Doré' }
  ];

  const mockMonthlyData = [
    { month: 'Jan', rating: 75, rank: 'Bronze' },
    { month: 'Fév', rating: 82, rank: 'Vert' },
    { month: 'Mar', rating: 87, rank: 'Violet' },
    { month: 'Avr', rating: 89, rank: 'Doré' }
  ];

  // Modèles de cartes premium
  const premiumTemplates = [
    { id: 1, name: 'Légende Dorée', price: '4.99€', preview: '/assets/cards/template-gold.png', rarity: 'legendary' },
    { id: 2, name: 'Champion Mythique', price: '7.99€', preview: '/assets/cards/template-mythic.png', rarity: 'mythic' },
    { id: 3, name: 'Édition Platine', price: '9.99€', preview: '/assets/cards/template-platinum.png', rarity: 'legendary' },
    { id: 4, name: 'Collection Limitée', price: '12.99€', preview: '/assets/cards/template-limited.png', rarity: 'mythic' }
  ];

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleParentalControlAccess = () => {
    if (parentalCode === '1234') { // Code parental simple pour la démo
      setShowParentalControl(false);
      setActiveTab('printing');
    } else {
      alert('Code parental incorrect');
    }
  };

  const requestCardPrinting = () => {
    if (new Date().getFullYear() - 2010 < 18) { // Simulation âge
      setShowParentalControl(true);
    } else {
      setActiveTab('printing');
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Mon Compte - SQUADFIELD</title>
        <meta name="description" content="Gérez votre compte SquadField, mettez à jour votre carte et suivez votre progression." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Navigation */}
        <nav className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-display font-bold">
                  <span className="gradient-text">SQUADFIELD</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/form" className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 glow-primary">
                  🚀 Créer une carte
                </Link>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  🏠 Accueil
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">
                        {userProfile?.displayName?.charAt(0) || currentUser.email.charAt(0)}
                      </span>
                    </div>
                    <span className="hidden md:block font-medium">{userProfile?.displayName || 'Champion'}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors rounded-lg mx-2"
                      >
                        🚪 Se déconnecter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
              Bienvenue, {userProfile?.displayName || 'Champion'} ! 👋
            </h1>
            <p className="text-xl text-gray-300">
              Gérez votre carte, suivez votre progression et débloquez de nouveaux designs
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 bg-black/20 backdrop-blur-sm rounded-xl p-2 border border-white/10">
              {[
                { id: 'overview', label: '📊 Vue d\'ensemble', icon: '📊' },
                { id: 'card', label: '🎯 Ma Carte', icon: '🎯' },
                { id: 'ranking', label: '📈 Classement', icon: '📈' },
                { id: 'premium', label: '💎 Modèles Premium', icon: '💎' },
                { id: 'printing', label: '🖨️ Impression', icon: '🖨️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Cartes Créées</p>
                      <p className="text-3xl font-bold text-white">{stats.totalCards}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Rang Actuel</p>
                      <p className="text-3xl font-bold text-yellow-400">{stats.currentRank}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🏆</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Progression Semaine</p>
                      <p className="text-3xl font-bold text-green-400">{stats.weeklyProgress}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📈</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Progression Mois</p>
                      <p className="text-3xl font-bold text-purple-400">{stats.monthlyProgress}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🚀</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">🏆 Mes Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stats.achievements.map((achievement, index) => (
                    <div key={index} className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300">
                      <div className="text-3xl mb-2">🥇</div>
                      <h3 className="font-bold text-white">{achievement}</h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Galerie d'exemples */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">🎨 Galerie d'Exemples</h2>
                    <p className="text-gray-300">Découvre des créations inspirantes de la communauté SQUADFIELD</p>
                  </div>
                  <div className="text-4xl">👀</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🌟</span>
                      <div>
                        <h3 className="font-bold text-white">Cartes Populaires</h3>
                        <p className="text-blue-300 text-sm">Les créations les plus aimées</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">Explore les cartes qui font sensation dans la communauté</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-lg p-4 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🚀</span>
                      <div>
                        <h3 className="font-bold text-white">Évolutions Spectaculaires</h3>
                        <p className="text-green-300 text-sm">Les plus belles progressions</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">Découvre comment d'autres joueurs ont progressé</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Link 
                    href="/galerie" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <span>👀</span>
                    Voir plus d'exemples
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ma Carte Actuelle */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">🎯 Ma Carte Actuelle</h2>
                <div className="flex justify-center mb-6">
                  <SquadFieldCardDisplay 
                    player={{
                      name: userProfile?.displayName || 'JOUEUR',
                      age: 20,
                      position: 'MIL',
                      team: 'SQUADFIELD',
                      overall: stats.currentRating,
                      level: stats.currentRating,
                      technique: 85,
                      vitesse: 82,
                      physique: 78,
                      tirs: 88,
                      defense: 65,
                      passe: 91
                    }}
                    size="md"
                  />
                </div>
                
                {/* Options de modification */}
                <div className="space-y-4">
                  {/* Crédits restants */}
                  <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Cartes gratuites restantes</span>
                      <span className="text-green-400 font-bold text-xl">2/3</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="grid grid-cols-1 gap-3">
                    <Link 
                      href="/form" 
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                    >
                      <span>🆓</span>
                      Refaire ma carte (Gratuit)
                    </Link>
                    
                    <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                      <span>✨</span>
                      Améliorer ma carte (1€)
                    </button>
                    
                    <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                      <span>🎨</span>
                      Changer le design (1€)
                    </button>
                  </div>
                </div>
              </div>

              {/* Statistiques détaillées */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">📊 Mes Statistiques</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Note Générale</span>
                    <div className="flex items-center gap-2">
                      <RankBadge rating={stats.currentRating} size="sm" />
                      <span className="text-white font-bold">{stats.currentRating}</span>
                    </div>
                  </div>
                  
                  {[
                    { name: 'Technique', value: 85, color: 'bg-blue-500' },
                    { name: 'Vitesse', value: 82, color: 'bg-green-500' },
                    { name: 'Physique', value: 78, color: 'bg-red-500' },
                    { name: 'Tirs', value: 88, color: 'bg-purple-500' },
                    { name: 'Défense', value: 65, color: 'bg-yellow-500' },
                    { name: 'Passes', value: 91, color: 'bg-cyan-500' }
                  ].map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{stat.name}</span>
                        <span className="text-white font-bold">{stat.value}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`${stat.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${stat.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ranking' && (
            <div className="space-y-8">
              {/* Évolution par semaine */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">📈 Évolution Hebdomadaire</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockRankingData.map((data, index) => (
                    <div key={index} className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-white/10 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300">
                      <div className="text-sm text-gray-400 mb-2">{data.week}</div>
                      <div className="text-2xl font-bold text-white mb-2">{data.rating}</div>
                      <RankBadge rating={data.rating} size="xs" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Évolution par mois */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">📅 Évolution Mensuelle</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockMonthlyData.map((data, index) => (
                    <div key={index} className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-white/10 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300">
                      <div className="text-sm text-gray-400 mb-2">{data.month}</div>
                      <div className="text-2xl font-bold text-white mb-2">{data.rating}</div>
                      <RankBadge rating={data.rating} size="xs" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Objectifs */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">🎯 Mes Objectifs</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg hover:scale-105 transition-transform duration-300">
                    <div>
                      <h3 className="font-bold text-white">Atteindre le rang Platine</h3>
                      <p className="text-green-300 text-sm">Il vous reste 6 points</p>
                    </div>
                    <div className="text-2xl">🥈</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg hover:scale-105 transition-transform duration-300">
                    <div>
                      <h3 className="font-bold text-white">Améliorer la technique</h3>
                      <p className="text-blue-300 text-sm">Objectif: +5 points</p>
                    </div>
                    <div className="text-2xl">⚽</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'premium' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">💎 Modèles Premium</h2>
                <p className="text-gray-300">Personnalisez votre carte avec des designs exclusifs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {premiumTemplates.map((template) => (
                  <div key={template.id} className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-4xl">🎨</span>
                    </div>
                    <h3 className="font-bold text-white mb-2">{template.name}</h3>
                    <p className="text-2xl font-bold text-yellow-400 mb-4">{template.price}</p>
                    <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      Acheter
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'printing' && (
            <div className="space-y-8">
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">🖨️ Impression de Cartes</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Pack Famille (5 cartes)</h3>
                    <ul className="text-gray-300 space-y-2 mb-6">
                      <li>• Votre carte personnalisée</li>
                      <li>• 4 cartes pour famille/amis</li>
                      <li>• Impression haute qualité</li>
                      <li>• Livraison à domicile</li>
                      <li>• Garantie qualité</li>
                    </ul>
                    <div className="text-3xl font-bold text-yellow-400 mb-4">18,90€</div>
                    <button 
                      onClick={requestCardPrinting}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Commander le Pack
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 border border-yellow-400/30 rounded-lg p-6">
                    <h4 className="font-bold text-white mb-4">🔒 Contrôle Parental</h4>
                    <p className="text-yellow-300 text-sm mb-4">
                      Pour garantir la sécurité des enfants, l'impression de cartes nécessite une autorisation parentale pour les moins de 18 ans.
                    </p>
                    <div className="bg-yellow-900/30 border border-yellow-400/50 rounded-lg p-4">
                      <p className="text-yellow-200 text-xs">
                        ℹ️ Un code parental sera demandé lors de la commande
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Parental Control Modal */}
          {showParentalControl && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-black/90 border border-white/20 rounded-xl p-6 max-w-md w-full mx-4">
                <h3 className="text-xl font-bold text-white mb-4">🔒 Contrôle Parental</h3>
                <p className="text-gray-300 mb-6">
                  Entrez le code parental pour accéder à la section impression :
                </p>
                <input
                  type="password"
                  value={parentalCode}
                  onChange={(e) => setParentalCode(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white mb-4"
                  placeholder="Code parental"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleParentalControlAccess}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => setShowParentalControl(false)}
                    className="flex-1 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
