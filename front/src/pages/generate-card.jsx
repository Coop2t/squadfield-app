'use client'
import { useState } from 'react'

export default function GenerateCard() {
  const [form, setForm] = useState({ prenom: '', age: '', sport: '' })
  const [photo, setPhoto] = useState(null)
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = new FormData()
      data.append('prenom', form.prenom)
      data.append('age', form.age)
      data.append('sport', form.sport)
      if (photo) data.append('photo', photo)
      if (video) data.append('video', video)

      const res = await fetch('/api/generate', {
        method: 'POST',
        body: data,
      })

      const responseData = await res.json()
      
      if (res.ok) {
        setResult(responseData)
        if (responseData.imageUrl) {
          window.open(responseData.imageUrl, '_blank') // Ouvre la carte générée
        }
      } else {
        setError(responseData.error || 'Erreur de génération')
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Générer ma carte SquadField
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom *
            </label>
            <input 
              type="text" 
              placeholder="Entrez votre prénom" 
              value={form.prenom}
              onChange={e => setForm({ ...form, prenom: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Âge *
            </label>
            <input 
              type="number" 
              placeholder="Entrez votre âge" 
              value={form.age}
              onChange={e => setForm({ ...form, age: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="5"
              max="99"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sport *
            </label>
            <input 
              type="text" 
              placeholder="Ex: Football, Basketball..." 
              value={form.sport}
              onChange={e => setForm({ ...form, sport: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo (JPG, PNG) *
            </label>
            <input 
              type="file" 
              accept="image/jpeg,image/png,image/jpg" 
              onChange={e => setPhoto(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {photo && (
              <p className="text-sm text-green-600 mt-1">✓ {photo.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vidéo (MP4, MOV) *
            </label>
            <input 
              type="file" 
              accept="video/mp4,video/mov,video/quicktime" 
              onChange={e => setVideo(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {video && (
              <p className="text-sm text-green-600 mt-1">✓ {video.name}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading || !form.prenom || !form.age || !form.sport || !photo || !video}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? '🔄 Génération en cours...' : '🚀 Générer ma carte IA'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            ❌ {error}
          </div>
        )}

        {result && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            <h3 className="font-medium">✅ Carte générée avec succès !</h3>
            {result.imageUrl && (
              <p className="text-sm mt-1">
                <a 
                  href={result.imageUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  🔗 Voir la carte générée
                </a>
              </p>
            )}
            {result.firebase_url && (
              <p className="text-sm mt-1">
                <a 
                  href={result.firebase_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  ☁️ Version Firebase
                </a>
              </p>
            )}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            🏃‍♂️ Propulsé par l'IA SquadField
          </p>
        </div>
      </div>
    </div>
  )
}
