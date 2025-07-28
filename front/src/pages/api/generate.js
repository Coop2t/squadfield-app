import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

// Configuration Next.js pour désactiver le body parser par défaut
export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Parse des données multipart avec formidable
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'temp'),
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024, // 50MB max
      multiples: false
    })

    // Créer le dossier temp s'il n'existe pas
    const tempDir = path.join(process.cwd(), 'temp')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        else resolve([fields, files])
      })
    })

    // Extraction des champs
    const prenom = Array.isArray(fields.prenom) ? fields.prenom[0] : fields.prenom
    const age = Array.isArray(fields.age) ? fields.age[0] : fields.age
    const sport = Array.isArray(fields.sport) ? fields.sport[0] : fields.sport

    // Validation des champs requis
    if (!prenom || !age || !sport) {
      return res.status(400).json({ 
        error: 'Champs requis manquants: prénom, âge et sport sont obligatoires' 
      })
    }

    // Validation des fichiers
    const photo = Array.isArray(files.photo) ? files.photo[0] : files.photo
    const video = Array.isArray(files.video) ? files.video[0] : files.video

    if (!photo || !video) {
      return res.status(400).json({ 
        error: 'Fichiers requis manquants: photo et vidéo sont obligatoires' 
      })
    }

    // Validation des types de fichiers
    const photoMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']
    const videoMimeTypes = ['video/mp4', 'video/mov', 'video/quicktime']

    if (!photoMimeTypes.includes(photo.mimetype)) {
      return res.status(400).json({ 
        error: 'Format de photo invalide. Formats acceptés: JPG, PNG' 
      })
    }

    if (!videoMimeTypes.includes(video.mimetype)) {
      return res.status(400).json({ 
        error: 'Format de vidéo invalide. Formats acceptés: MP4, MOV' 
      })
    }

    console.log('📝 Données reçues:', { prenom, age, sport })
    console.log('📸 Photo:', photo.originalFilename, photo.mimetype)
    console.log('🎥 Vidéo:', video.originalFilename, video.mimetype)

    // Préparer les données pour le backend Python
    const formData = new FormData()
    formData.append('prenom', prenom)
    formData.append('age', age)
    formData.append('sport', sport)

    // Ajouter les fichiers
    formData.append('photo', fs.createReadStream(photo.filepath), {
      filename: photo.originalFilename,
      contentType: photo.mimetype
    })
    
    formData.append('video', fs.createReadStream(video.filepath), {
      filename: video.originalFilename,
      contentType: video.mimetype
    })

    // URL du backend Python (ai_card_generator)
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000'
    console.log('🔗 Connexion au backend:', `${backendUrl}/generate`)

    // Appel au backend Python
    const response = await fetch(`${backendUrl}/generate`, {
      method: 'POST',
      body: formData,
      headers: {
        // Ne pas définir Content-Type, laissons fetch le faire automatiquement avec boundary
      }
    })

    // Nettoyage des fichiers temporaires
    try {
      fs.unlinkSync(photo.filepath)
      fs.unlinkSync(video.filepath)
    } catch (cleanupError) {
      console.warn('⚠️ Erreur de nettoyage des fichiers temporaires:', cleanupError)
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erreur backend:', response.status, errorText)
      return res.status(response.status).json({ 
        error: `Erreur du backend (${response.status}): ${errorText}` 
      })
    }

    const data = await response.json()
    console.log('✅ Réponse du backend:', data)

    // Retourner la réponse avec les URLs d'images
    return res.status(200).json({
      success: true,
      imageUrl: data.dalle_url || data.image_url,
      firebase_url: data.firebase_url,
      player: data.player,
      card_color: data.card_color,
      overall_score: data.overall_score,
      message: 'Carte générée avec succès'
    })

  } catch (error) {
    console.error('💥 Erreur serveur:', error)
    
    // Nettoyage en cas d'erreur
    try {
      const tempDir = path.join(process.cwd(), 'temp')
      if (fs.existsSync(tempDir)) {
        const files = fs.readdirSync(tempDir)
        files.forEach(file => {
          try {
            fs.unlinkSync(path.join(tempDir, file))
          } catch (e) {
            // Ignore cleanup errors
          }
        })
      }
    } catch (cleanupError) {
      console.warn('⚠️ Erreur de nettoyage:', cleanupError)
    }

    return res.status(500).json({ 
      error: 'Erreur interne du serveur: ' + error.message 
    })
  }
}
