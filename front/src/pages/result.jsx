import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CardShell } from '../components/ui/CardShell';

export default function ResultPage() {
  const router = useRouter();
  const [playerData, setPlayerData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    // Get data from URL params
    const { query } = router;
    
    if (Object.keys(query).length > 0) {
      const data = {
        name: query.name || 'Joueur Anonyme',
        position: query.position || 'MIL',
        club: query.club || 'Club FC',
        age: parseInt(query.age) || 20,
        technique: parseInt(query.technique) || 50,
        physique: parseInt(query.physique) || 50,
        mental: parseInt(query.mental) || 50,
        vitesse: parseInt(query.vitesse) || 50,
        tir: parseInt(query.tir) || 50,
        passe: parseInt(query.passe) || 50,
        overall: parseInt(query.overall) || 50,
      };
      
      // Simulate card generation delay
      setTimeout(() => {
        setPlayerData(data);
        setIsGenerating(false);
      }, 2000);
    } else {
      // Redirect to form if no data
      router.push('/form');
    }
  }, [router]);

  const getRarity = (overall) => {
    if (overall >= 95) return 'mythic';
    if (overall >= 90) return 'legendary';
    if (overall >= 80) return 'epic';
    if (overall >= 70) return 'rare';
    if (overall >= 60) return 'uncommon';
    return 'common';
  };

  const getRarityLabel = (rarity) => {
    const labels = {
      mythic: 'Mythique',
      legendary: 'Légendaire',
      epic: 'Épique',
      rare: 'Rare',
      uncommon: 'Peu commun',
      common: 'Commun',
    };
    return labels[rarity] || 'Commun';
  };

  const getStatColor = (value) => {
    if (value >= 90) return 'text-red-500';
    if (value >= 80) return 'text-orange-500';
    if (value >= 70) return 'text-secondary-500';
    if (value >= 60) return 'text-accent-500';
    if (value >= 50) return 'text-blue-500';
    return 'text-gray-500';
  };

  const handleDownload = () => {
    // This would implement card download functionality
    alert('Fonctionnalité de téléchargement à implémenter avec Canvas/SVG');
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Lien copié dans le presse-papier !');
  };

  if (isGenerating) {
    return (
      <>
        <Head>
          <title>Génération en cours... - SQUADFIELD</title>
        </Head>
        
        <div className="min-h-screen bg-gradient-to-br from-surface-light to-primary-50 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-32 h-32 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-gray-900">
                Génération de votre carte...
              </h2>
              <p className="text-gray-600">
                L'IA analyse les performances et crée votre carte unique
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!playerData) {
    return null;
  }

  const rarity = getRarity(playerData.overall);
  const statsArray = [
    { label: 'TEC', value: playerData.technique, icon: '⚽' },
    { label: 'PHY', value: playerData.physique, icon: '💪' },
    { label: 'MEN', value: playerData.mental, icon: '🧠' },
    { label: 'VIT', value: playerData.vitesse, icon: '⚡' },
    { label: 'TIR', value: playerData.tir, icon: '🎯' },
    { label: 'PAS', value: playerData.passe, icon: '🔄' },
  ];

  return (
    <>
      <Head>
        <title>{`Carte de ${playerData.name} - SQUADFIELD`}</title>
        <meta name="description" content={`Découvrez la carte de joueur de ${playerData.name} avec une note globale de ${playerData.overall}/100`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-surface-light to-primary-50">
        {/* Header */}
        <nav className="bg-white/80 backdrop-blur-sm shadow-soft">
          <div className="container-fluid">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="font-display text-2xl font-bold gradient-text">
                SQUADFIELD
              </Link>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  Retour
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Success Message */}
        <div className="container-fluid py-6">
          <div className="max-w-md mx-auto">
            <div className="bg-accent-50 border border-accent-200 rounded-2xl p-4 text-center">
              <div className="text-accent-600 text-2xl mb-2">🎉</div>
              <h3 className="font-semibold text-accent-800">Carte générée avec succès !</h3>
              <p className="text-sm text-accent-600 mt-1">
                Votre carte est prête à être partagée
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-fluid pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Card Display */}
              <div className="flex justify-center">
                <CardShell
                  rarity={rarity}
                  size="xl"
                  interactive={true}
                  glowEffect={true}
                  className="animate-entrance"
                >
                  {/* Player Photo Placeholder */}
                  <div className="flex-1 flex items-center justify-center mb-4">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-4xl text-white">👤</span>
                    </div>
                  </div>
                  
                  {/* Player Info */}
                  <div className="text-center text-white space-y-2">
                    <h2 className="font-display text-2xl font-bold text-shadow-lg">
                      {playerData.name}
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {playerData.position}
                      </span>
                      <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {playerData.age} ans
                      </span>
                    </div>
                    <p className="text-white/90 text-sm">{playerData.club}</p>
                  </div>
                  
                  {/* Overall Rating */}
                  <div className="text-center mt-4">
                    <div className="inline-flex items-center gap-2 bg-white/20 rounded-2xl px-4 py-2 backdrop-blur-sm">
                      <span className="text-white text-sm font-medium">Overall</span>
                      <span className="text-white text-2xl font-bold">
                        {playerData.overall}
                      </span>
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {statsArray.map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white/10 rounded-lg p-2 text-center backdrop-blur-sm"
                      >
                        <div className="text-xs text-white/80 mb-1">{stat.icon}</div>
                        <div className="text-xs text-white/80 font-medium">{stat.label}</div>
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </CardShell>
              </div>

              {/* Info & Actions */}
              <div className="space-y-8">
                {/* Card Info */}
                <div className="card p-6">
                  <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-4">
                    Informations de la carte
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rareté:</span>
                      <Badge rarity={rarity} size="md">
                        {getRarityLabel(rarity)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Note globale:</span>
                      <span className={`text-xl font-bold ${getStatColor(playerData.overall)}`}>
                        {playerData.overall}/100
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Joueur:</span>
                      <span className="font-semibold">{playerData.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Position:</span>
                      <span className="font-semibold">{playerData.position}</span>
                    </div>
                  </div>
                </div>

                {/* Stats Breakdown */}
                <div className="card p-6">
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-4">
                    Détail des statistiques
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { label: 'Technique', value: playerData.technique },
                      { label: 'Physique', value: playerData.physique },
                      { label: 'Mental', value: playerData.mental },
                      { label: 'Vitesse', value: playerData.vitesse },
                      { label: 'Tir', value: playerData.tir },
                      { label: 'Passe', value: playerData.passe },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between">
                        <span className="text-gray-600">{stat.label}:</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${stat.value}%` }}
                            />
                          </div>
                          <span className={`font-semibold ${getStatColor(stat.value)}`}>
                            {stat.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleDownload}
                    icon="💾"
                  >
                    Télécharger la carte
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onClick={handleShare}
                    icon="📤"
                  >
                    Partager
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/form">
                      <Button variant="outline" fullWidth>
                        Nouvelle carte
                      </Button>
                    </Link>
                    <Link href="/gallery">
                      <Button variant="ghost" fullWidth>
                        Voir la galerie
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="font-heading text-xl font-semibold mb-4">
                Partager votre carte
              </h3>
              
              <div className="space-y-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={copyToClipboard}
                  icon="🔗"
                >
                  Copier le lien
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="ghost" fullWidth icon="📱">
                    WhatsApp
                  </Button>
                  <Button variant="ghost" fullWidth icon="📧">
                    Email
                  </Button>
                </div>
              </div>
              
              <Button
                variant="ghost"
                fullWidth
                onClick={() => setShowShareModal(false)}
                className="mt-4"
              >
                Fermer
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
