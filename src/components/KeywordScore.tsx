import React from 'react';
import { Gauge, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { calculateKeywordScore, getKeywordTrend } from '../utils/analytics';
import type { KeywordSuggestion } from '../types';

interface KeywordScoreProps {
  suggestion: KeywordSuggestion;
}

export function KeywordScore({ suggestion }: KeywordScoreProps) {
  const score = calculateKeywordScore(suggestion.searchVolume, suggestion.difficulty);
  const trend = getKeywordTrend(score);
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="text-green-500" size={18} />;
      case 'declining':
        return <TrendingDown className="text-red-500" size={18} />;
      default:
        return <Minus className="text-yellow-500" size={18} />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Gauge className="text-indigo-600" size={18} />
      <span className="text-gray-600">Score:</span>
      <div className="flex items-center gap-1">
        <span className="font-medium">{score}/100</span>
        {getTrendIcon()}
      </div>
    </div>
  );
}