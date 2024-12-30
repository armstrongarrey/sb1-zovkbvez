import React from 'react';
import { Scale } from 'lucide-react';
import type { KeywordSuggestion } from '../../types';

interface KeywordComparisonProps {
  keywords: KeywordSuggestion[];
}

export function KeywordComparison({ keywords }: KeywordComparisonProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Scale className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold">Keyword Comparison</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Keyword</th>
              <th className="text-right py-2">Volume</th>
              <th className="text-right py-2">Difficulty</th>
              <th className="text-right py-2">Intent</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((keyword) => (
              <tr key={keyword.keyword} className="border-b">
                <td className="py-2">{keyword.keyword}</td>
                <td className="text-right">{keyword.searchVolume.toLocaleString()}</td>
                <td className="text-right">{keyword.difficulty}/100</td>
                <td className="text-right capitalize">{keyword.intent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}