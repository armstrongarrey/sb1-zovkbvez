import React from 'react';
import { Users, BarChart } from 'lucide-react';
import type { KeywordSuggestion } from '../types';
import { KeywordScore } from './KeywordScore';

interface KeywordCardProps {
  suggestion: KeywordSuggestion;
}

export function KeywordCard({ suggestion }: KeywordCardProps) {
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-green-600';
    if (difficulty < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{suggestion.keyword}</h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="text-blue-600" size={18} />
          <span className="text-gray-600">Search Volume:</span>
          <span className="font-medium">{suggestion.searchVolume.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <BarChart className="text-purple-600" size={18} />
          <span className="text-gray-600">Difficulty:</span>
          <span className={`font-medium ${getDifficultyColor(suggestion.difficulty)}`}>
            {suggestion.difficulty}/100
          </span>
        </div>
        
        <KeywordScore suggestion={suggestion} />
      </div>
    </div>
  );
}