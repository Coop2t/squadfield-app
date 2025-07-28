import React, { useState, useEffect } from 'react';
import { generateCardPreview } from '../lib/generateCardImage';
import { analyzeCardStrengths, generatePlayerDescription } from '../utils/simulateAI';

const CardPreview = ({ 
  cardData, 
  playerImage = null, 
  showStats = true, 
  showAnalysis = false,
  onImageGenerated = null,
  className = ''
}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [description, setDescription] = useState('');

  // Generate card preview when cardData changes
  useEffect(() => {
    if (cardData) {
      generatePreview();
      if (showAnalysis) {
        setAnalysis(analyzeCardStrengths(cardData));
        setDescription(generatePlayerDescription(
          cardData.playerName,
          cardData.position,
          cardData.sport,
          cardData.stats
        ));
      }
    }
  }, [cardData, playerImage, showAnalysis]);

  const generatePreview = async () => {
    if (!cardData) return;
    
    setLoading(true);
    try {
      const imageDataUrl = await generateCardPreview(cardData, playerImage);
      setPreviewImage(imageDataUrl);
      
      if (onImageGenerated) {
        onImageGenerated(imageDataUrl);
      }
    } catch (error) {
      console.error('Error generating card preview:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity) => {
    const colors = {
      'Common': 'text-gray-400 bg-gray-100',
      'Uncommon': 'text-green-600 bg-green-100',
      'Rare': 'text-blue-600 bg-blue-100',
      'Epic': 'text-purple-600 bg-purple-100',
      'Legendary': 'text-yellow-600 bg-yellow-100'
    };
    return colors[rarity] || colors['Common'];
  };

  const getOverallColor = (overall) => {
    if (overall >= 90) return 'text-yellow-500';
    if (overall >= 80) return 'text-green-500';
    if (overall >= 70) return 'text-blue-500';
    return 'text-gray-500';
  };

  if (!cardData) {
    return (
      <div className={`card p-6 text-center ${className}`}>
        <div className="h-64 flex items-center justify-center bg-secondary-50 rounded-lg">
          <div className="text-secondary-400">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">No card data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Card Image Preview */}
      <div className="card p-4">
        <div className="flex flex-col items-center">
          {loading ? (
            <div className="w-48 h-64 bg-secondary-100 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : previewImage ? (
            <img 
              src={previewImage} 
              alt={`${cardData.playerName} card`}
              className="w-48 h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-48 h-64 bg-secondary-100 rounded-lg flex items-center justify-center">
              <span className="text-secondary-400">Preview not available</span>
            </div>
          )}
          
          {/* Card Info */}
          <div className="mt-4 text-center">
            <h3 className="text-lg font-heading font-semibold text-secondary-800">
              {cardData.playerName}
            </h3>
            <p className="text-sm text-secondary-600">
              {cardData.position} • {cardData.sport.charAt(0).toUpperCase() + cardData.sport.slice(1)}
            </p>
            <div className="flex items-center justify-center mt-2 space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(cardData.rarity.name)}`}>
                {cardData.rarity.name}
              </span>
              <span className={`text-2xl font-bold ${getOverallColor(cardData.stats.overall)}`}>
                {cardData.stats.overall}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Display */}
      {showStats && (
        <div className="card p-4">
          <h4 className="font-heading font-semibold text-secondary-800 mb-3">Player Stats</h4>
          <div className="space-y-2">
            {Object.entries(cardData.stats).map(([stat, value]) => {
              if (stat === 'overall') return null;
              
              return (
                <div key={stat} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-secondary-700 w-20 capitalize">
                    {stat}:
                  </span>
                  <div className="flex-1 bg-secondary-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-secondary-800 w-8">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Analysis */}
      {showAnalysis && analysis && (
        <div className="card p-4">
          <h4 className="font-heading font-semibold text-secondary-800 mb-3">AI Analysis</h4>
          
          {/* Player Description */}
          {description && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-secondary-700 mb-2">Player Profile</h5>
              <p className="text-sm text-secondary-600 italic">{description}</p>
            </div>
          )}

          {/* Strengths */}
          {analysis.strengths.length > 0 && (
            <div className="mb-3">
              <h5 className="text-sm font-medium text-green-700 mb-2">Strengths</h5>
              <ul className="space-y-1">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-green-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Weaknesses */}
          {analysis.weaknesses.length > 0 && (
            <div className="mb-3">
              <h5 className="text-sm font-medium text-orange-700 mb-2">Areas for Improvement</h5>
              <ul className="space-y-1">
                {analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-sm text-orange-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-blue-700 mb-2">Recommendations</h5>
              <ul className="space-y-1">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-sm text-blue-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardPreview;
