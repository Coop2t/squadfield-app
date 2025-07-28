/**
 * Utility functions for generating sports cards
 */

// Generate random stats for sports cards
export const generateRandomStats = (sport = 'football') => {
  const baseStats = {
    football: {
      speed: Math.floor(Math.random() * 41) + 60, // 60-100
      strength: Math.floor(Math.random() * 41) + 60,
      accuracy: Math.floor(Math.random() * 41) + 60,
      agility: Math.floor(Math.random() * 41) + 60,
      defense: Math.floor(Math.random() * 41) + 60,
      overall: 0
    },
    basketball: {
      shooting: Math.floor(Math.random() * 41) + 60,
      dribbling: Math.floor(Math.random() * 41) + 60,
      defense: Math.floor(Math.random() * 41) + 60,
      rebounding: Math.floor(Math.random() * 41) + 60,
      passing: Math.floor(Math.random() * 41) + 60,
      overall: 0
    },
    soccer: {
      pace: Math.floor(Math.random() * 41) + 60,
      shooting: Math.floor(Math.random() * 41) + 60,
      passing: Math.floor(Math.random() * 41) + 60,
      dribbling: Math.floor(Math.random() * 41) + 60,
      defending: Math.floor(Math.random() * 41) + 60,
      physical: Math.floor(Math.random() * 41) + 60,
      overall: 0
    }
  };

  const stats = baseStats[sport] || baseStats.football;
  
  // Calculate overall rating
  const statValues = Object.values(stats).filter(val => val !== 0);
  stats.overall = Math.floor(statValues.reduce((sum, val) => sum + val, 0) / statValues.length);
  
  return stats;
};

// Generate card rarity
export const generateCardRarity = () => {
  const rarities = [
    { name: 'Common', probability: 0.5, color: '#9CA3AF' },
    { name: 'Uncommon', probability: 0.3, color: '#10B981' },
    { name: 'Rare', probability: 0.15, color: '#3B82F6' },
    { name: 'Epic', probability: 0.04, color: '#8B5CF6' },
    { name: 'Legendary', probability: 0.01, color: '#F59E0B' }
  ];

  const random = Math.random();
  let cumulativeProbability = 0;

  for (const rarity of rarities) {
    cumulativeProbability += rarity.probability;
    if (random <= cumulativeProbability) {
      return rarity;
    }
  }

  return rarities[0]; // fallback to common
};

// Generate player position based on sport
export const generatePosition = (sport = 'football') => {
  const positions = {
    football: ['QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'CB', 'S', 'K'],
    basketball: ['PG', 'SG', 'SF', 'PF', 'C'],
    soccer: ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'RW', 'ST']
  };

  const sportPositions = positions[sport] || positions.football;
  return sportPositions[Math.floor(Math.random() * sportPositions.length)];
};

// Generate card data structure
export const generateCardData = (playerName, sport = 'football', imageUrl = null) => {
  const stats = generateRandomStats(sport);
  const rarity = generateCardRarity();
  const position = generatePosition(sport);

  return {
    id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    playerName: playerName || 'Mystery Player',
    sport,
    position,
    stats,
    rarity,
    imageUrl,
    createdAt: new Date().toISOString(),
    season: new Date().getFullYear(),
    cardNumber: Math.floor(Math.random() * 1000) + 1
  };
};

// Calculate card value based on stats and rarity
export const calculateCardValue = (cardData) => {
  const baseValue = cardData.stats.overall * 10;
  const rarityMultiplier = {
    'Common': 1,
    'Uncommon': 1.5,
    'Rare': 2.5,
    'Epic': 4,
    'Legendary': 10
  };

  return Math.floor(baseValue * (rarityMultiplier[cardData.rarity.name] || 1));
};
