export const calculateKeywordScore = (searchVolume: number, difficulty: number): number => {
  // Higher search volume and lower difficulty = better score
  const volumeScore = Math.min(searchVolume / 1000, 100);
  const difficultyScore = 100 - difficulty;
  return Math.round((volumeScore + difficultyScore) / 2);
};

export const getKeywordTrend = (score: number): 'rising' | 'stable' | 'declining' => {
  if (score >= 70) return 'rising';
  if (score >= 40) return 'stable';
  return 'declining';
};