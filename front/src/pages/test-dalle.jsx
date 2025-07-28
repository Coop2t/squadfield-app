import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import SquadFieldCardDisplay from '../components/ui/SquadFieldCardDisplay';
import PhotoUpload from '../components/ui/PhotoUpload';
import dalleService from '../services/dalleService';

export default function TestDalle() {
  const [playerData, setPlayerData] = useState({
    name: 'GWEN',
    ageCategory: 'U16',
    overall: 82,
    technique: 88,
    vitesse: 85,
    physique: 78,
    tirs: 91,
    defense: 79,
    passe: 86,
    photo: null
  });

  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [backendStatus, setBackendStatus] = useState(null);
  const [budgetStats, setBudgetStats] = useState(null);
  const [testResults, setTestResults] = useState([]);

  // Vérifier le statut DALL-E au chargement
  useEffect(() => {
    checkDalleStatus();
    getBudgetStats();
  }, []);

  const checkDalleStatus = async () => {
    try {
      const status = await dalleService.checkBackendStatus();
      setBackendStatus(status);
    } catch (error) {
      setBackendStatus({ available: false, error: error.message });
    }
  };

  const getBudgetStats = async () => {
    try {
      const stats = await dalleService.getBudgetStats();
      setBudgetStats(stats);
    } catch (error) {
      console.error('Erreur récupération budget:', error);
    }
  };

  const handlePhotoUpload = (photoUrl) => {
    setUploadedPhoto(photoUrl);
    setPlayerData(prev => ({ ...prev, photo: photoUrl }));
  };

  const testDirectDalle = async () => {
    if (!uploadedPhoto) {
      alert('Veuillez uploader une photo d\'abord');
      return;
    }

    const testResult = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      status: 'testing',
      player: { ...playerData }
    };

    setTestResults(prev => [testResult, ...prev]);

    try {
      const result = await dalleService.generateCartoonPortrait(
        playerData,
        uploadedPhoto,
        (progress, message) => {
          setTestResults(prev => 
            prev.map(test => 
              test.id === testResult.id 
                ? { ...test, progress, message }
                : test
            )
          );
        }
      );

      setTestResults(prev => 
        prev.map(test => 
          test.id === testResult.id 
            ? { ...test, status: result.success ? 'success' : 'error', result }
            : test
        )
      );

      // Mettre à jour les stats budget après le test
      getBudgetStats();

    } catch (error) {
      setTestResults(prev => 
        prev.map(test => 
          test.id === testResult.id 
            ? { ...test, status: 'error', error: error.message }
            : test
        )
      );
    }
  };

  return (
    <>
      <Head>
        <title>Test DALL-E - SquadField</title>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              🎨 Test Intégration DALL-E
            </h1>
            <p className="text-purple-200 text-lg">
              Interface de test pour la génération de portraits cartoon via DALL-E
            </p>
          </div>

          {/* Status Dashboard */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* Statut Backend */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <h3 className="text-white font-bold mb-2">🔧 Backend Status</h3>
              {backendStatus ? (
                <div>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                    backendStatus.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {backendStatus.available ? 'DISPONIBLE' : 'INDISPONIBLE'}
                  </div>
                  {backendStatus.error && (
                    <p className="text-red-300 text-xs mt-1">{backendStatus.error}</p>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 text-sm">Vérification...</div>
              )}
            </div>

            {/* Budget DALL-E */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <h3 className="text-white font-bold mb-2">💰 Budget DALL-E</h3>
              {budgetStats ? (
                <div>
                  <div className="text-sm text-gray-300">
                    {budgetStats.current_cost.toFixed(2)}$ / {budgetStats.max_budget}$
                  </div>
                  <div className="text-xs text-gray-400">
                    {budgetStats.generations_count} générations ce mois
                  </div>
                  <div className={`text-xs mt-1 ${
                    budgetStats.warning_level ? 'text-orange-400' : 'text-green-400'
                  }`}>
                    Restant: {budgetStats.remaining_budget.toFixed(2)}$
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">Chargement...</div>
              )}
            </div>

            {/* Cache Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <h3 className="text-white font-bold mb-2">🗄️ Cache</h3>
              <div className="text-sm text-gray-300">
                {dalleService.getCacheSize()} portraits en cache
              </div>
              <button
                onClick={() => {
                  dalleService.clearCache();
                  alert('Cache nettoyé');
                }}
                className="text-xs text-blue-400 hover:text-blue-300 mt-1"
              >
                Nettoyer cache
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Panel de contrôle */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">⚙️ Configuration Test</h2>
              
              {/* Upload photo */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">
                  Photo du joueur (OBLIGATOIRE pour DALL-E)
                </label>
                <PhotoUpload
                  onPhotoUpload={handlePhotoUpload}
                  className="w-full"
                />
                {uploadedPhoto ? (
                  <div className="mt-2 text-green-400 text-sm">
                    ✅ Photo uploadée: <span className="text-xs">{uploadedPhoto.substring(0, 50)}...</span>
                  </div>
                ) : (
                  <div className="mt-2 text-orange-400 text-sm">
                    ⚠️ Aucune photo - DALL-E ne peut pas fonctionner
                  </div>
                )}
              </div>

              {/* Données joueur */}
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-1">Nom du joueur</label>
                  <input
                    type="text"
                    value={playerData.name}
                    onChange={(e) => setPlayerData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-black/30 border border-white/30 rounded-lg text-white"
                    placeholder="Ex: GWEN, KYLIAN..."
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-1">Catégorie d'âge</label>
                  <select
                    value={playerData.ageCategory}
                    onChange={(e) => setPlayerData(prev => ({ ...prev, ageCategory: e.target.value }))}
                    className="w-full px-3 py-2 bg-black/30 border border-white/30 rounded-lg text-white"
                  >
                    <option value="U10">U10</option>
                    <option value="U12">U12</option>
                    <option value="U14">U14</option>
                    <option value="U16">U16</option>
                    <option value="U18">U18</option>
                    <option value="SENIOR">SENIOR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-1">
                    Note Globale: {playerData.overall}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="99"
                    value={playerData.overall}
                    onChange={(e) => setPlayerData(prev => ({ ...prev, overall: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Détermine le template de carte utilisé
                  </div>
                </div>
              </div>

              {/* Actions de test */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={testDirectDalle}
                  disabled={!uploadedPhoto || !backendStatus?.available}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  🎨 Test Direct DALL-E
                </button>

                <button
                  onClick={checkDalleStatus}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  🔄 Vérifier Status Backend
                </button>

                <button
                  onClick={() => {
                    setPlayerData({
                      name: 'GWEN',
                      ageCategory: 'U16',
                      overall: 88,
                      technique: 85,
                      vitesse: 90,
                      physique: 78,
                      tirs: 91,
                      defense: 79,
                      passe: 84,
                      photo: uploadedPhoto
                    });
                  }}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  📊 Preset Gwen U16
                </button>
              </div>
            </div>

            {/* Prévisualisation avec nouveau système */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">🎯 Nouveau Système DALL-E</h2>
              
              <div className="flex justify-center mb-6">
                <SquadFieldCardDisplay 
                  player={playerData}
                  size="lg"
                  className="transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-white font-bold mb-2">🔍 Debug Info</h3>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>Nom: {playerData.name}</div>
                  <div>Age: {playerData.ageCategory}</div>
                  <div>Note: {playerData.overall}</div>
                  <div>Photo: {uploadedPhoto ? '✅ Disponible' : '❌ Manquante'}</div>
                  <div>Backend: {backendStatus?.available ? '✅ OK' : '❌ KO'}</div>
                  <div>Budget: {budgetStats?.remaining_budget?.toFixed(2) || '?'}$ restants</div>
                </div>
              </div>
            </div>
          </div>

          {/* Historique des tests */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">📋 Historique des Tests</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {testResults.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  Aucun test effectué. Uploadez une photo et cliquez sur "Test Direct DALL-E"
                </div>
              ) : (
                testResults.map((test) => (
                  <div key={test.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-white font-semibold">{test.player.name}</span>
                        <span className="text-gray-400 text-sm ml-2">{test.timestamp}</span>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-bold ${
                        test.status === 'success' ? 'bg-green-500 text-white' :
                        test.status === 'error' ? 'bg-red-500 text-white' :
                        'bg-yellow-500 text-black'
                      }`}>
                        {test.status === 'testing' ? 'EN COURS' :
                         test.status === 'success' ? 'SUCCÈS' : 'ERREUR'}
                      </div>
                    </div>
                    
                    {test.progress !== undefined && (
                      <div className="mb-2">
                        <div className="text-xs text-gray-400 mb-1">
                          {test.message || 'Génération en cours...'}
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${test.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {test.result && (
                      <div className="text-xs text-gray-300 mt-2">
                        {test.result.success ? (
                          <div className="text-green-400">
                            ✅ Portrait généré: {test.result.cartoon_portrait_url?.substring(0, 50)}...
                          </div>
                        ) : (
                          <div className="text-red-400">
                            ❌ Erreur: {test.result.error}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {test.error && (
                      <div className="text-xs text-red-400 mt-2">
                        ❌ {test.error}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
