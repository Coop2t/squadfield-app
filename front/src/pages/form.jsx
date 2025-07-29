import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Input } from '../components/ui/Input';
import VideoUpload from '../components/ui/VideoUpload';
import PhotoUpload from '../components/ui/PhotoUpload';
import AnalysisProgress from '../components/ui/AnalysisProgress';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';

export default function FormPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Form data
  const [playerData, setPlayerData] = useState({
    name: '',
    age: '',
    club: '',
    position: '',
  });

  // File uploads
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoMetadata, setVideoMetadata] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoMetadata, setPhotoMetadata] = useState(null);

  // Uploaded file URLs (for AI analysis)
  const [videoUrl, setVideoUrl] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [cardId, setCardId] = useState(null);

  // Error handling
  const [errors, setErrors] = useState({});
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePlayerDataChange = (field, value) => {
    setPlayerData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleVideoSelect = (file, metadata) => {
    setSelectedVideo(file);
    setVideoMetadata(metadata);
    setUploadError(null);
  };

  const handlePhotoSelect = (file, metadata) => {
    setSelectedPhoto(file);
    setPhotoMetadata(metadata);
    setUploadError(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!playerData.name.trim()) {
      newErrors.name = 'Le prénom/surnom est requis';
    }
    
    if (!playerData.age || playerData.age < 8 || playerData.age > 50) {
      newErrors.age = 'L\'âge doit être entre 8 et 50 ans';
    }

    if (!selectedVideo) {
      newErrors.video = 'Une vidéo est requise pour l\'analyse IA';
    }

    if (!selectedPhoto) {
      newErrors.photo = 'Une photo est requise pour la carte';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFileToFirebase = async (file, path) => {
    try {
      const fileRef = ref(storage, path);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Erreur lors de l\'upload du fichier');
    }
  };

  const handleAnalysisComplete = async (analysisResults) => {
    try {
      // Calculate overall rating if not provided
      let overall;
      if (analysisResults.stats.overall) {
        overall = analysisResults.stats.overall;
      } else {
        const statsValues = Object.values(analysisResults.stats).filter(val => typeof val === 'number');
        overall = Math.round(statsValues.reduce((sum, val) => sum + val, 0) / statsValues.length);
      }

      // Prepare card data for storage
      const cardData = {
        // Player info
        playerName: analysisResults.playerName,
        age: parseInt(analysisResults.age),
        club: playerData.club || 'Club indépendant',
        position: playerData.position || 'Polyvalent',
        
        // AI Analysis results
        stats: {
          ...analysisResults.stats,
          overall: overall
        },
        
        // Media URLs (already uploaded)
        mediaUrls: {
          video: videoUrl,
          photo: photoUrl,
          generatedCard: null // Will be generated later
        },
        
        // Metadata
        metadata: {
          createdAt: new Date(),
          analysisVersion: '2.0',
          videoMetadata: videoMetadata,
          photoMetadata: photoMetadata,
          userId: user?.uid || null,
          processingTime: analysisResults.metadata?.processing_time || 60,
          analysisMode: analysisResults.analysisMode || 'ai',
          ...(analysisResults.metadata || {})
        }
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, 'cards'), cardData);
      
      console.log('✅ Carte sauvegardée avec succès:', docRef.id);
      
      // Redirect to dashboard with success
      router.push(`/dashboard?newCard=${docRef.id}`);
      
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);
      setUploadError('Erreur lors de la sauvegarde. Veuillez réessayer.');
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      console.log('📤 Upload des fichiers vers Firebase...');
      
      // Generate unique ID for this card
      const newCardId = `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setCardId(newCardId);
      
      // Upload files to Firebase Storage BEFORE analysis
      const uploadPromises = [];
      
      // Upload video
      uploadPromises.push(
        uploadFileToFirebase(
          selectedVideo, 
          `users/${user?.uid || 'guest'}/cards/${newCardId}/video.${selectedVideo.name.split('.').pop()}`
        )
      );
      
      // Upload photo
      uploadPromises.push(
        uploadFileToFirebase(
          selectedPhoto, 
          `users/${user?.uid || 'guest'}/cards/${newCardId}/photo.${selectedPhoto.name.split('.').pop()}`
        )
      );

      const [uploadedVideoUrl, uploadedPhotoUrl] = await Promise.all(uploadPromises);
      
      // Store URLs for analysis
      setVideoUrl(uploadedVideoUrl);
      setPhotoUrl(uploadedPhotoUrl);
      
      console.log('✅ Fichiers uploadés:', { video: uploadedVideoUrl, photo: uploadedPhotoUrl });
      
      // Start AI analysis
      setIsUploading(false);
      setIsAnalyzing(true);
      
    } catch (error) {
      console.error('❌ Erreur upload:', error);
      setUploadError('Erreur lors de l\'upload des fichiers. Veuillez réessayer.');
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  };

  const canSubmit = playerData.name && playerData.age && selectedVideo && selectedPhoto;

  return (
    <>
      <Head>
        <title>Créer ma carte IA - SQUADFIELD</title>
        <meta name="description" content="Uploadez votre vidéo et photo pour une analyse IA automatique" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Header */}
        <nav className="relative z-10 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="font-display text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SQUADFIELD
                </span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/">
                  <button className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-700/50">
                    ← Retour
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 mb-4">
                <span className="text-blue-400">🤖</span>
                <span className="text-sm font-medium text-blue-300">Analyse IA Automatique</span>
              </div>
              
              <h1 className="font-display text-4xl font-bold text-white mb-4">
                Créer ma carte SquadField
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Uploadez votre vidéo et photo, notre IA analysera automatiquement vos performances 
                pour générer votre carte personnalisée avec des statistiques précises.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Player Information */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="font-heading text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="text-2xl">👤</span>
                  Informations du joueur
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Prénom / Surnom"
                    placeholder="ex: Kylian, Léo, Cristiano..."
                    value={playerData.name}
                    onChange={(e) => handlePlayerDataChange('name', e.target.value)}
                    error={errors.name}
                    leftIcon="✨"
                  />
                  
                  <Input
                    label="Âge"
                    type="number"
                    min="8"
                    max="50"
                    placeholder="ex: 16"
                    value={playerData.age}
                    onChange={(e) => handlePlayerDataChange('age', e.target.value)}
                    error={errors.age}
                    leftIcon="🎂"
                  />

                  <Input
                    label="Club / Équipe"
                    placeholder="ex: PSG, Real Madrid, FC Barcelone..."
                    value={playerData.club}
                    onChange={(e) => handlePlayerDataChange('club', e.target.value)}
                    error={errors.club}
                    leftIcon="⚽"
                  />
                  
                  <Input
                    label="Poste de jeu"
                    placeholder="ex: Attaquant, Milieu, Défenseur..."
                    value={playerData.position}
                    onChange={(e) => handlePlayerDataChange('position', e.target.value)}
                    error={errors.position}
                    leftIcon="🎯"
                  />
                </div>
              </div>

              {/* Media Upload Section */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="font-heading text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="text-2xl">🎬</span>
                  Médias pour l'analyse IA
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <VideoUpload 
                    onVideoSelect={handleVideoSelect}
                    error={errors.video}
                    disabled={isAnalyzing}
                  />
                  
                  <PhotoUpload 
                    onPhotoSelect={handlePhotoSelect}
                    error={errors.photo}
                    disabled={isAnalyzing}
                  />
                </div>

                {/* AI Features Info */}
                <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <span>🎯</span>
                    Que va analyser notre IA ?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-blue-200">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">⚽</span>
                      <span>Technique et contrôle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-400">💪</span>
                      <span>Physique et endurance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400">🧠</span>
                      <span>Intelligence de jeu</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">⚡</span>
                      <span>Vitesse et agilité</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">🎯</span>
                      <span>Précision des tirs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">🔄</span>
                      <span>Qualité des passes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!canSubmit || isAnalyzing}
                  className={`
                    relative overflow-hidden font-bold px-12 py-4 rounded-xl transition-all duration-300 transform 
                    ${canSubmit && !isAnalyzing
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 glow-primary'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Analyse IA en cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <span className="text-2xl">🚀</span>
                      Lancer l'analyse IA
                    </span>
                  )}
                </button>
                
                {canSubmit && !isAnalyzing && (
                  <p className="text-sm text-green-400 mt-3 flex items-center justify-center gap-2">
                    <span>✅</span>
                    Tout est prêt ! L'analyse prendra environ 60 secondes
                  </p>
                )}
                
                {!canSubmit && (
                  <p className="text-sm text-gray-400 mt-3">
                    Veuillez remplir tous les champs pour continuer
                  </p>
                )}
              </div>

              {/* Error Display */}
              {uploadError && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
                  <p className="text-red-400 flex items-center justify-center gap-2">
                    <span>⚠️</span>
                    {uploadError}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Analysis Progress Modal */}
        <AnalysisProgress 
          isAnalyzing={isAnalyzing}
          onComplete={handleAnalysisComplete}
          playerData={playerData}
          videoUrl={videoUrl}
          photoUrl={photoUrl}
        />
      </div>
    </>
  );
}
