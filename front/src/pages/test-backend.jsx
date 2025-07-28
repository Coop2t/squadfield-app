import { useState, useEffect } from 'react';
import AIAnalysisService from '../services/aiAnalysisService';

export default function TestBackend() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [healthData, setHealthData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [testResults, setTestResults] = useState({});

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
  };

  const checkBackendHealth = async () => {
    addLog('🔍 Vérification du backend IA...', 'info');
    setBackendStatus('checking');
    
    try {
      const isHealthy = await AIAnalysisService.checkBackendHealth();
      
      if (isHealthy) {
        setBackendStatus('healthy');
        addLog('✅ Backend IA disponible et fonctionnel', 'success');
        
        // Récupérer les détails de santé
        const response = await fetch('http://localhost:5000/api/health');
        if (response.ok) {
          const health = await response.json();
          setHealthData(health);
          addLog(`📊 Services: ${JSON.stringify(health.services)}`, 'info');
        }
      } else {
        setBackendStatus('unavailable');
        addLog('❌ Backend IA indisponible', 'error');
        addLog('🎭 Mode simulation sera utilisé automatiquement', 'warning');
      }
    } catch (error) {
      setBackendStatus('error');
      addLog(`❌ Erreur: ${error.message}`, 'error');
    }
  };

  const testSimulation = async () => {
    addLog('🎭 Test du mode simulation...', 'info');
    
    try {
      const testData = {
        playerName: 'Test Player',
        age: 20,
        position: 'Milieu'
      };
      
      addLog('⏳ Démarrage de l\'analyse simulée...', 'info');
      const result = await AIAnalysisService.simulateAnalysis(testData);
      
      addLog('✅ Simulation réussie!', 'success');
      addLog(`📈 Stats générées: Overall ${result.stats.overall}`, 'success');
      setTestResults(prev => ({ ...prev, simulation: result }));
      
    } catch (error) {
      addLog(`❌ Erreur simulation: ${error.message}`, 'error');
    }
  };

  const testCompleteAnalysis = async () => {
    addLog('🤖 Test de l\'analyse complète...', 'info');
    
    try {
      const analysisData = {
        videoUrl: 'test://fake-video-url',
        photoUrl: 'test://fake-photo-url',
        playerData: {
          playerName: 'Test Player Complete',
          age: 22,
          position: 'Attaquant',
          club: 'Test Club'
        }
      };
      
      let progressCount = 0;
      const progressCallback = (progress) => {
        progressCount++;
        addLog(`📊 Progrès ${progress.progress}%: ${progress.message}`, 'info');
      };
      
      const result = await AIAnalysisService.performCompleteAnalysis(analysisData, progressCallback);
      
      addLog('✅ Analyse complète terminée!', 'success');
      addLog(`🎯 Mode: ${result.analysis_metadata?.mode || 'backend'}`, 'success');
      setTestResults(prev => ({ ...prev, complete: result }));
      
    } catch (error) {
      addLog(`❌ Erreur analyse complète: ${error.message}`, 'error');
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'unavailable': return 'text-orange-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'warning': return 'text-orange-600';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          🔧 Test du Backend IA SquadField
        </h1>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">État du Backend</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-600">Status:</span>
            <span className={`font-semibold ${getStatusColor(backendStatus)}`}>
              {backendStatus === 'checking' && '🔍 Vérification...'}
              {backendStatus === 'healthy' && '✅ Fonctionnel'}
              {backendStatus === 'unavailable' && '⚠️ Indisponible'}
              {backendStatus === 'error' && '❌ Erreur'}
            </span>
          </div>
          
          {healthData && (
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Détails de santé:</h3>
              <pre className="text-sm text-gray-700">
                {JSON.stringify(healthData, null, 2)}
              </pre>
            </div>
          )}
          
          <button
            onClick={checkBackendHealth}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            🔄 Revérifier
          </button>
        </div>

        {/* Test Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Tests Disponibles</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <button
              onClick={testSimulation}
              className="bg-purple-600 text-white px-4 py-3 rounded hover:bg-purple-700"
            >
              🎭 Tester la Simulation
            </button>
            <button
              onClick={testCompleteAnalysis}
              className="bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700"
            >
              🤖 Tester l'Analyse Complète
            </button>
          </div>
        </div>

        {/* Logs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Logs de Test</h2>
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">Aucun log disponible...</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className={getLogColor(log.type)}>
                  <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => setLogs([])}
            className="mt-2 bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
          >
            🧹 Vider les logs
          </button>
        </div>

        {/* Test Results */}
        {Object.keys(testResults).length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Résultats des Tests</h2>
            {Object.entries(testResults).map(([testName, result]) => (
              <div key={testName} className="mb-4">
                <h3 className="font-semibold capitalize mb-2">Test {testName}:</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <pre className="text-sm text-gray-700 overflow-x-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">
            📋 Instructions d'Installation
          </h2>
          <div className="text-yellow-700 space-y-2">
            <p><strong>Si le backend est indisponible:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Naviguer vers le dossier <code className="bg-yellow-100 px-1 rounded">backend/</code></li>
              <li>Double-cliquer sur <code className="bg-yellow-100 px-1 rounded">install_backend.bat</code></li>
              <li>Suivre les instructions d'installation de Python</li>
              <li>Double-cliquer sur <code className="bg-yellow-100 px-1 rounded">start_backend.bat</code></li>
              <li>Revenir ici et cliquer sur "🔄 Revérifier"</li>
            </ol>
            <p className="mt-4">
              <strong>Note:</strong> Le mode simulation fonctionne automatiquement même sans backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
