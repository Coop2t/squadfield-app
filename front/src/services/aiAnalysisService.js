// Service pour l'analyse IA backend
import { generateSquadFieldCard, generateSquadFieldPreview } from '../lib/generateSquadFieldCard';

const AI_BACKEND_URL = process.env.NEXT_PUBLIC_AI_BACKEND_URL || 'http://localhost:5000';

export class AIAnalysisService {
  
  /**
   * Démarre l'analyse IA d'un joueur
   * @param {Object} analysisData - Données d'analyse
   * @param {string} analysisData.videoUrl - URL de la vidéo Firebase
   * @param {string} analysisData.photoUrl - URL de la photo Firebase
   * @param {Object} analysisData.playerData - Données du joueur
   * @returns {Promise<Object>} Résultat de l'analyse
   */
  static async startAnalysis(analysisData) {
    try {
      console.log('🤖 Démarrage de l\'analyse IA...', analysisData);
      
      const response = await fetch(`${AI_BACKEND_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'analyse');
      }

      const result = await response.json();
      console.log('✅ Analyse terminée:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Erreur analyse IA:', error);
      throw error;
    }
  }

  /**
   * Récupère le progrès d'une analyse en cours
   * @param {string} progressId - ID du progrès
   * @returns {Promise<Object>} État du progrès
   */
  static async getAnalysisProgress(progressId) {
    try {
      const response = await fetch(`${AI_BACKEND_URL}/api/progress/${progressId}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du progrès');
      }

      const progress = await response.json();
      return progress;
    } catch (error) {
      console.error('❌ Erreur récupération progrès:', error);
      throw error;
    }
  }

  /**
   * Vérifie si le backend IA est disponible
   * @returns {Promise<boolean>} True si disponible
   */
  static async checkBackendHealth() {
    try {
      const response = await fetch(`${AI_BACKEND_URL}/api/health`, {
        method: 'GET',
        timeout: 5000
      });
      
      if (response.ok) {
        const health = await response.json();
        console.log('🏥 Backend IA disponible:', health);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('⚠️ Backend IA indisponible:', error.message);
      console.warn('🔧 Solutions possibles:');
      console.warn('1. Installer Python: https://python.org/downloads');
      console.warn('2. Démarrer le backend: cd backend && python app.py');
      console.warn('3. Vérifier que le port 5000 est libre');
      console.warn('💡 Mode simulation activé automatiquement');
      return false;
    }
  }

  /**
   * Simulation de fallback si le backend n'est pas disponible
   * @param {Object} playerData - Données du joueur
   * @returns {Promise<Object>} Statistiques simulées
   */
  static async simulateAnalysis(playerData) {
    console.log('🎭 Mode simulation activé pour:', playerData);
    
    // Simulation avec progression réaliste
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats = {
          technique: Math.floor(Math.random() * 30) + 60, // 60-90
          physique: Math.floor(Math.random() * 30) + 60,
          mental: Math.floor(Math.random() * 30) + 60,
          vitesse: Math.floor(Math.random() * 30) + 60,
          tir: Math.floor(Math.random() * 30) + 60,
          passe: Math.floor(Math.random() * 30) + 60,
        };

        // Calcul de l'overall
        const overall = Math.round(
          (stats.technique + stats.physique + stats.mental + 
           stats.vitesse + stats.tir + stats.passe) / 6
        );

        resolve({
          success: true,
          stats: { ...stats, overall },
          analysis_metadata: {
            video_duration: 15,
            frames_analyzed: 450,
            processing_time: 60,
            analysis_version: '2.0.0-simulation',
            timestamp: new Date().toISOString(),
            mode: 'simulation'
          }
        });
      }, 60000); // 60 secondes comme la simulation originale
    });
  }

  /**
   * Analyse complète avec fallback automatique
   * @param {Object} analysisData - Données d'analyse complètes
   * @param {Function} progressCallback - Callback pour le progrès
   * @returns {Promise<Object>} Résultat de l'analyse
   */
  static async performCompleteAnalysis(analysisData, progressCallback = null) {
    // Vérifier d'abord si le backend est disponible
    const backendAvailable = await this.checkBackendHealth();
    
    if (!backendAvailable) {
      console.log('🎭 Backend indisponible, passage en mode simulation');
      
      // Simulation du progrès si callback fourni
      if (progressCallback) {
        const steps = [
          { progress: 0, message: "Initialisation (mode simulation)" },
          { progress: 20, message: "Analyse de la vidéo" },
          { progress: 40, message: "Détection des mouvements" },
          { progress: 60, message: "Évaluation technique" },
          { progress: 80, message: "Analyse physique" },
          { progress: 100, message: "Génération des statistiques" }
        ];

        for (const step of steps) {
          progressCallback(step);
          await new Promise(resolve => setTimeout(resolve, 10000)); // 10s par étape
        }
      }
      
      return await this.simulateAnalysis(analysisData.playerData);
    }

    // Utiliser le vrai backend
    console.log('🤖 Utilisation du backend IA réel');
    
    try {
      const result = await this.startAnalysis(analysisData);
      
      // Si un callback de progrès est fourni, polling du progrès
      if (progressCallback && result.progress_id) {
        await this.pollProgress(result.progress_id, progressCallback);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Erreur backend, fallback simulation:', error);
      
      // Fallback vers simulation en cas d'erreur
      if (progressCallback) {
        progressCallback({ progress: 0, message: "Erreur backend, mode simulation activé" });
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      return await this.simulateAnalysis(analysisData.playerData);
    }
  }

  /**
   * Polling du progrès d'analyse
   * @param {string} progressId - ID du progrès
   * @param {Function} progressCallback - Callback pour les mises à jour
   */
  static async pollProgress(progressId, progressCallback) {
    const maxAttempts = 120; // 2 minutes max (polling toutes les secondes)
    let attempts = 0;

    const poll = async () => {
      try {
        const progress = await this.getAnalysisProgress(progressId);
        
        progressCallback({
          progress: progress.progress,
          message: progress.message,
          status: progress.status
        });

        if (progress.status === 'completed' || progress.progress >= 100) {
          return;
        }

        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 1000); // Poll every second
        } else {
          throw new Error('Timeout: analyse trop longue');
        }
      } catch (error) {
        console.error('Erreur polling progrès:', error);
        progressCallback({
          progress: 100,
          message: "Erreur de suivi, finalisation...",
          status: 'error'
        });
      }
    };

    poll();
  }

  /**
   * Génère l'image de carte SquadField finale
   * @param {Object} cardData - Données de la carte
   * @param {Object} mediaUrls - URLs des médias (photo, vidéo)
   * @returns {Promise<string>} URL base64 de l'image générée
   */
  static async generateFinalCard(cardData, mediaUrls) {
    try {
      console.log('🎨 Génération de la carte SquadField...');
      
      // Préparer les données pour le générateur
      const squadFieldData = {
        playerName: cardData.playerName || 'Joueur',
        age: cardData.age || 20,
        club: cardData.club || 'Club indépendant',
        position: cardData.position || 'Polyvalent',
        stats: cardData.stats || {},
        mediaUrls: mediaUrls || {}
      };

      // Générer l'image de carte avec le nouveau format SquadField
      const cardImageUrl = await generateSquadFieldCard(squadFieldData);
      
      console.log('✅ Carte SquadField générée avec succès');
      return cardImageUrl;
      
    } catch (error) {
      console.error('❌ Erreur génération carte:', error);
      
      // Fallback : générer sans photo en cas d'erreur
      try {
        const fallbackData = { ...cardData, mediaUrls: {} };
        return await generateSquadFieldCard(fallbackData);
      } catch (fallbackError) {
        console.error('❌ Erreur génération carte fallback:', fallbackError);
        throw new Error('Impossible de générer la carte');
      }
    }
  }

  /**
   * Génère une preview de carte pour le dashboard
   * @param {Object} cardData - Données de la carte
   * @param {Object} mediaUrls - URLs des médias
   * @returns {Promise<string>} URL base64 de la preview
   */
  static async generateCardPreview(cardData, mediaUrls) {
    try {
      const squadFieldData = {
        playerName: cardData.playerName || 'Joueur',
        age: cardData.age || 20,
        stats: cardData.stats || {},
        mediaUrls: mediaUrls || {}
      };

      return await generateSquadFieldPreview(squadFieldData);
    } catch (error) {
      console.error('❌ Erreur génération preview:', error);
      throw error;
    }
  }

  /**
   * Transforme les statistiques backend au format frontend
   * @param {Object} backendStats - Stats du backend
   * @returns {Object} Stats formatées pour le frontend
   */
  static formatStatsForFrontend(backendStats) {
    if (backendStats.stats) {
      return {
        playerName: backendStats.playerName || 'Joueur',
        age: backendStats.age || 20,
        stats: backendStats.stats,
        metadata: backendStats.analysis_metadata || {}
      };
    }
    
    // Format déjà correct ou fallback
    return backendStats;
  }
}

export default AIAnalysisService;
