import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MentionsLegales() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>Mentions Légales - SQUADFIELD</title>
        <meta name="description" content="Mentions légales et conditions d'utilisation de SquadField" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Header */}
        <nav className="relative z-10 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="font-display text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SQUADFIELD
                </span>
              </Link>
              <Link href="/">
                <button className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-700/50">
                  ← Retour à l'accueil
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className={`max-w-4xl mx-auto transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Mentions Légales
              </h1>
              <p className="text-lg text-gray-300">
                Conditions d'utilisation et informations légales
              </p>
            </div>

            {/* Content */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
              
              {/* Section 1: Informations générales */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">ℹ️</span>
                  Informations générales
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Nom du service :</strong> SquadField</p>
                  <p><strong>Description :</strong> Plateforme de création de cartes personnalisées de joueurs de football</p>
                  <p><strong>Siège social :</strong> [Adresse à compléter]</p>
                  <p><strong>Email de contact :</strong> contact@squadfield.com</p>
                  <p><strong>Directeur de publication :</strong> [Nom à compléter]</p>
                </div>
              </section>

              {/* Section 2: Hébergement */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-green-600">🌐</span>
                  Hébergement
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                  <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                </div>
              </section>

              {/* Section 3: Droits à l'image - IMPORTANT */}
              <section className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-lg">
                <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <span className="text-red-600">📸</span>
                  Droits à l'image - CONDITIONS OBLIGATOIRES
                </h2>
                <div className="space-y-4 text-red-800">
                  <div className="bg-red-100 p-4 rounded-lg">
                    <p className="font-bold text-lg mb-2">⚠️ ACCEPTATION OBLIGATOIRE</p>
                    <p>L'utilisation de SquadField nécessite l'acceptation explicite des droits à l'image. Cette acceptation est un pré-requis obligatoire pour créer un compte et générer des cartes.</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold">Consentement pour les mineurs</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Pour les utilisateurs de moins de 18 ans, l'autorisation parentale est obligatoire</li>
                    <li>Un parent ou tuteur légal doit donner son consentement explicite</li>
                    <li>L'email du parent/tuteur est requis lors de l'inscription</li>
                  </ul>

                  <h3 className="text-xl font-semibold">Utilisation des images</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Les photos et vidéos uploadées peuvent être utilisées pour la génération de cartes personnalisées</li>
                    <li>SquadField peut utiliser les créations (cartes générées) à des fins promotionnelles avec accord préalable</li>
                    <li>L'utilisateur conserve ses droits sur les images originales</li>
                    <li>Les données peuvent être supprimées sur demande (droit à l'oubli)</li>
                  </ul>

                  <h3 className="text-xl font-semibold">Stockage et sécurité</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Les images sont stockées de manière sécurisée et conforme RGPD</li>
                    <li>Accès limité aux données personnelles (équipe technique uniquement)</li>
                    <li>Chiffrement des données sensibles</li>
                  </ul>
                </div>
              </section>

              {/* Section 4: Protection des données RGPD */}
              <section className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
                <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">🔒</span>
                  Protection des données (RGPD)
                </h2>
                <div className="space-y-4 text-blue-800">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="font-bold text-lg mb-2">✅ CONFORMITÉ RGPD GARANTIE</p>
                    <p>SquadField respecte intégralement le Règlement Général sur la Protection des Données (RGPD) et s'engage à protéger vos données personnelles.</p>
                  </div>

                  <h3 className="text-xl font-semibold">Vos droits</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Droit d'accès :</strong> Consultez vos données personnelles</li>
                    <li><strong>Droit de rectification :</strong> Corrigez vos informations</li>
                    <li><strong>Droit à l'effacement :</strong> Supprimez vos données</li>
                    <li><strong>Droit d'opposition :</strong> Refusez certains traitements</li>
                    <li><strong>Droit à la portabilité :</strong> Récupérez vos données</li>
                  </ul>

                  <h3 className="text-xl font-semibold">Données collectées</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Nom, prénom, email (parent pour mineurs)</li>
                    <li>Photos et vidéos uploadées volontairement</li>
                    <li>Informations sportives (club, position, âge)</li>
                    <li>Adresse (optionnelle, pour livraisons)</li>
                  </ul>

                  <h3 className="text-xl font-semibold">Contact DPO</h3>
                  <p>Pour exercer vos droits : <strong>dpo@squadfield.com</strong></p>
                </div>
              </section>

              {/* Section 5: Conditions d'utilisation */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-purple-600">📋</span>
                  Conditions d'utilisation
                </h2>
                <div className="space-y-4 text-gray-700">
                  <h3 className="text-xl font-semibold">Accès au service</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Service accessible aux mineurs avec autorisation parentale</li>
                    <li>3 cartes gratuites puis 1€ par carte supplémentaire</li>
                    <li>Impression physique : lot de 5 cartes à 18,90€</li>
                  </ul>

                  <h3 className="text-xl font-semibold">Utilisation responsable</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Respectez les autres utilisateurs</li>
                    <li>Ne partagez que vos propres images</li>
                    <li>Contenu approprié uniquement</li>
                    <li>Pas d'utilisation commerciale sans accord</li>
                  </ul>
                </div>
              </section>

              {/* Section 6: Limitation de responsabilité */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-orange-600">⚖️</span>
                  Limitation de responsabilité
                </h2>
                <div className="space-y-4 text-gray-700">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SquadField ne peut garantir la disponibilité permanente du service</li>
                    <li>L'utilisateur est responsable de ses uploads et contenus</li>
                    <li>SquadField ne peut être tenu responsable des dommages indirects</li>
                    <li>Les cartes générées sont à usage personnel et sportif</li>
                  </ul>
                </div>
              </section>

              {/* Section 7: Cookies */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-yellow-600">🍪</span>
                  Politique des cookies
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>SquadField utilise des cookies pour :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Maintenir votre session connectée</li>
                    <li>Améliorer votre expérience utilisateur</li>
                    <li>Analyser l'utilisation du site (anonymisé)</li>
                  </ul>
                  <p>Vous pouvez désactiver les cookies dans votre navigateur, mais certaines fonctionnalités peuvent être limitées.</p>
                </div>
              </section>

              {/* Section 8: Contact */}
              <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">📞</span>
                  Contact
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>Pour toute question concernant ces mentions légales ou l'utilisation de SquadField :</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p><strong>Email général :</strong> contact@squadfield.com</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p><strong>Protection des données :</strong> dpo@squadfield.com</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Ces mentions légales peuvent être modifiées. Les utilisateurs seront informés des changements importants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
