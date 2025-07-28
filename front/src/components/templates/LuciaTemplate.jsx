import React, { useRef, useEffect, useState } from 'react';

/**
 * Template SquadField authentique basé sur les vraies images
 * Utilise les templates selon le niveau du joueur et superpose dynamiquement les données
 */

const LuciaTemplate = ({ 
  name = "JOUEUR",
  ageCategory = "U20", 
  globalNote = 75,
  scores = {
    technique: 75,
    vitesse: 75,
    physique: 75,
    tirs: 75,
    defense: 75,
    passe: 75
  },
  photo = null,
  onImageGenerated = null
}) => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sélecteur de template basé sur la note globale
  const getTemplateByScore = (score) => {
    if (score >= 99) return '/assets/Template%20Cards/template7%20STAR.png';       // Platine STAR
    if (score >= 94) return '/assets/Template%20Cards/template6a%20(94-98).png';   // Elite
    if (score >= 90) return '/assets/Template%20Cards/template5%20(90-94).png';    // Expert
    if (score >= 85) return '/assets/Template%20Cards/template4a%20(85-89).png';   // Avancé
    if (score >= 80) return '/assets/Template%20Cards/template3%20(80-84).png';    // Intermédiaire
    if (score >= 75) return '/assets/Template%20Cards/template2%20(75-79).png';    // Débutant+
    return '/assets/Template%20Cards/template1%20(65-74).png';                     // Débutant
  };

  // Génération de la carte avec superposition
  useEffect(() => {
    const generateCard = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Dimensions fixes pour tous les templates
        canvas.width = 400;
        canvas.height = 560;

        // Charger l'image de template
        const templateImg = new Image();
        templateImg.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          templateImg.onload = resolve;
          templateImg.onerror = reject;
          templateImg.src = getTemplateByScore(globalNote);
        });

        // Dessiner le template de base
        ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

        // Superposer le nom (en haut à gauche)
        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 28px Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(name.toUpperCase(), 30, 45);

        // Superposer la catégorie d'âge (en haut à droite)
        ctx.textAlign = 'right';
        ctx.font = 'bold 20px Arial, sans-serif';
        ctx.fillText(ageCategory, canvas.width - 30, 45);

        // Zone photo (centre)
        const photoX = 50;
        const photoY = 80;
        const photoWidth = 300;
        const photoHeight = 200;

        if (photo) {
          // Charger et dessiner la photo du joueur
          const playerImg = new Image();
          playerImg.crossOrigin = 'anonymous';
          
          await new Promise((resolve, reject) => {
            playerImg.onload = resolve;
            playerImg.onerror = () => resolve(); // Continue même si la photo échoue
            playerImg.src = photo;
          });

          // Dessiner la photo en conservant les proportions
          const aspectRatio = playerImg.width / playerImg.height;
          let drawWidth = photoWidth;
          let drawHeight = photoHeight;
          let drawX = photoX;
          let drawY = photoY;

          if (aspectRatio > photoWidth / photoHeight) {
            drawHeight = photoWidth / aspectRatio;
            drawY = photoY + (photoHeight - drawHeight) / 2;
          } else {
            drawWidth = photoHeight * aspectRatio;
            drawX = photoX + (photoWidth - drawWidth) / 2;
          }

          ctx.save();
          // Créer un masque circulaire ou rectangulaire selon le template
          ctx.beginPath();
          ctx.rect(photoX, photoY, photoWidth, photoHeight);
          ctx.clip();
          ctx.drawImage(playerImg, drawX, drawY, drawWidth, drawHeight);
          ctx.restore();
        }

        // Badge niveau (sur la photo, en bas à droite)
        const badgeX = canvas.width - 70;
        const badgeY = photoY + photoHeight - 30;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.beginPath();
        ctx.arc(badgeX, badgeY, 25, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#DAA520';
        ctx.font = 'bold 8px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('NIVEAU', badgeX, badgeY - 8);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(globalNote.toString(), badgeX, badgeY + 8);

        // Stats en grille (bas de la carte)
        const statsY = 320;
        const statsData = [
          { label: 'TECHNIQUE', value: scores.technique },
          { label: 'VITESSE', value: scores.vitesse },
          { label: 'PHYSIQUE', value: scores.physique },
          { label: 'TIRS', value: scores.tirs },
          { label: 'DÉFENSE', value: scores.defense },
          { label: 'PASSE', value: scores.passe }
        ];

        // Style des stats (texte doré sur fond noir/transparent)
        ctx.font = 'bold 14px Arial';
        
        for (let i = 0; i < 6; i++) {
          const row = Math.floor(i / 2);
          const col = i % 2;
          const x = 50 + col * 150;
          const y = statsY + row * 35;

          // Label de la stat
          ctx.fillStyle = '#DAA520';
          ctx.textAlign = 'left';
          ctx.fillText(statsData[i].label, x, y);

          // Valeur de la stat
          ctx.fillStyle = '#DAA520';
          ctx.textAlign = 'right';
          ctx.fillText(statsData[i].value.toString(), x + 120, y);
        }

        // Générer l'image finale
        const imageDataUrl = canvas.toDataURL('image/png', 1.0);
        
        if (onImageGenerated) {
          onImageGenerated(imageDataUrl);
        }

        setIsLoading(false);

      } catch (err) {
        console.error('❌ Erreur génération template Lucia:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    generateCard();
  }, [name, ageCategory, globalNote, scores, photo, onImageGenerated]);

  // Export function pour usage externe
  const exportAsImage = () => {
    if (canvasRef.current) {
      return canvasRef.current.toDataURL('image/png', 1.0);
    }
    return null;
  };

  // Exposer la fonction d'export
  React.useImperativeHandle(canvasRef, () => ({
    exportAsImage
  }));

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-red-900/20 rounded-2xl border border-red-500/30">
        <div className="text-center p-4">
          <div className="text-red-400 text-3xl mb-2">⚠️</div>
          <p className="text-red-400 text-sm">Erreur template</p>
          <p className="text-red-300 text-xs mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto rounded-2xl shadow-2xl"
        style={{ 
          display: isLoading ? 'none' : 'block',
          imageRendering: 'high-quality'
        }}
      />
      
      {isLoading && (
        <div className="w-full h-96 flex items-center justify-center bg-gray-800/50 rounded-2xl border border-gray-700/50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">Génération template SquadField...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LuciaTemplate;
