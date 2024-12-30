import React from 'react';
import { KeywordCard } from './KeywordCard';
import type { KeywordSuggestion } from '../types';

interface ResultsSectionProps {
  suggestions: KeywordSuggestion[];
  relatedTerms: string[];
}

export function ResultsSection({ suggestions, relatedTerms }: ResultsSectionProps) {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion, index) => (
          <KeywordCard key={index} suggestion={suggestion} />
        ))}
      </div>
      
      {relatedTerms.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Terms</h3>
          <div className="flex flex-wrap gap-2">
            {relatedTerms.map((term, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}