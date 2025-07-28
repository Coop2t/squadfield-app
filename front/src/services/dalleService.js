/**
 * Service frontend pour l'intégration DALL-E
 * Communication avec le backend Python pour génération de portraits cartoon
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class DalleService {
  constructor() {
    this.cache = new Map(); // Cache des portraits générés
    this.activeRequests = new Map(); // Prévention des doublons
  }

  /**
   * Génère un portrait cartoon DALL-E
   * @param {Object} playerData - Données du joueur
   * @param {string} photoUrl - URL de la photo Firebase
   * @param {Function} progressCallback - Callback pour le progrès
   * @returns {Promise<Object>} - Résultat avec URL du portrait
   */
  async generateCartoonPortrait(playerData, photoUrl, progressCallback = null) {
    try {
      const cacheKey = this._generateCacheKey(playerData, photoUrl);
      
      // Vérifier le cache
      if (this.cache.has(cacheKey)) {
        console.log('🎯 Portrait trouvé en cache');
        if (progressCallback) progressCallback(100, 'Portrait récupéré du cache');
        return this.cache.get(cacheKey);
      }

      // Éviter les requêtes multiples
      if (this.activeRequests.has(cacheKey)) {
        console.log('⏳ Génération en cours, attente...');
        return await this.activeRequests.get(cacheKey);
      }

      // Créer la requête
      const requestPromise = this._makeGenerationRequest(playerData, photoUrl, progressCallback);
      this.activeRequests.set(cacheKey, requestPromise);

      const result = await requestPromise;
      
      // Mettre en cache si succès
      if (result.success) {
        this.cache.set(cacheKey, result);
      }

      // Nettoyer les requêtes actives
      this.activeRequests.delete(cacheKey);

      return result;

    } catch (error) {
      console.error('❌ Erreur service DALL-E:', error);
      return {
        success: false,
        error: error.message,
        fallback_required: true
      };
    }
  }

  /**
   * Requête vers le backend DALL-E
   */
  async _makeGenerationRequest(playerData, photoUrl, progressCallback) {
    try {
      if (progressCallback) progressCallback(10, 'Préparation de la requête DALL-E');

      const requestData = {
        player_data: {
          name: playerData.name || 'Joueur',
          age: playerData.age || 12,
          position: playerData.position || 'football player',
          overall: playerData.overall || 75,
          stats: playerData.stats || {}
        },
        photo_url: photoUrl,
        style_options: {
          style: 'pokemon_sorare_fifa',
          background: 'transparent',
          quality: 'standard'
        }
      };

      if (progressCallback) progressCallback(20, 'Envoi vers DALL-E backend');

      const response = await fetch(`${API_BASE_URL}/api/generate-cartoon-portrait`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`Erreur backend: ${response.status} ${response.statusText}`);
      }

      // Streaming du progrès si supporté
      if (progressCallback && response.headers.get('Content-Type')?.includes('application/json')) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let result = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          result += chunk;

          // Essayer de parser le progrès
          try {
            const lines = chunk.split('\n').filter(line => line.trim());
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = JSON.parse(line.substring(6));
                if (data.progress !== undefined) {
                  progressCallback(data.progress, data.message);
                }
              }
            }
          } catch (e) {
            // Continuer si impossible de parser le progrès
          }
        }

        return JSON.parse(result);
      } else {
        // Requête simple sans streaming
        if (progressCallback) progressCallback(60, 'Génération DALL-E en cours...');
        const result = await response.json();
        if (progressCallback) progressCallback(100, 'Portrait terminé');
        return result;
      }

    } catch (error) {
      console.error('❌ Erreur requête DALL-E:', error);
      throw error;
    }
  }

  /**
   * Génère une clé de cache unique
   */
  _generateCacheKey(playerData, photoUrl) {
    const keyData = {
      name: playerData.name,
      age: playerData.age,
      photoHash: this._hashString(photoUrl)
    };
    return btoa(JSON.stringify(keyData));
  }

  /**
   * Hash simple pour les URLs
   */
  _hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  /**
   * Vérifie le statut du service DALL-E backend
   */
  async checkBackendStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dalle-status`);
      if (!response.ok) {
        throw new Error('Backend indisponible');
      }
      return await response.json();
    } catch (error) {
      console.error('❌ Backend DALL-E indisponible:', error);
      return {
        available: false,
        error: error.message
      };
    }
  }

  /**
   * Récupère les statistiques du budget DALL-E
   */
  async getBudgetStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dalle-budget-stats`);
      if (!response.ok) {
        throw new Error('Impossible de récupérer les stats budget');
      }
      return await response.json();
    } catch (error) {
      console.error('❌ Erreur stats budget:', error);
      return {
        current_cost: 0,
        max_budget: 50,
        generations_count: 0,
        remaining_budget: 50,
        warning_threshold: 30
      };
    }
  }

  /**
   * Nettoie le cache
   */
  clearCache() {
    this.cache.clear();
    console.log('🧹 Cache DALL-E nettoyé');
  }

  /**
   * Taille du cache actuel
   */
  getCacheSize() {
    return this.cache.size;
  }
}

// Instance singleton
const dalleService = new DalleService();

export default dalleService;

// Export pour compatibilité
export { DalleService };
