import React from 'react';
import { PieChart as PieIcon } from 'lucide-react';
import type { KeywordSuggestion } from '../../types';

interface PieChartProps {
  keywords: KeywordSuggestion[];
}

export function PieChart({ keywords }: PieChartProps) {
  const total = keywords.reduce((sum, k) => sum + k.searchVolume, 0);
  let currentAngle = 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <PieIcon className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold">Search Volume Distribution</h3>
      </div>
      
      <div className="flex justify-center">
        <svg width="200" height="200" viewBox="-1 -1 2 2">
          {keywords.map((keyword) => {
            const percentage = keyword.searchVolume / total;
            const startAngle = currentAngle;
            const endAngle = currentAngle + percentage * Math.PI * 2;
            currentAngle = endAngle;

            const x1 = Math.cos(startAngle);
            const y1 = Math.sin(startAngle);
            const x2 = Math.cos(endAngle);
            const y2 = Math.sin(endAngle);

            const largeArc = percentage > 0.5 ? 1 : 0;

            return (
              <path
                key={keyword.keyword}
                d={`M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={`hsl(${(startAngle * 180) / Math.PI}, 70%, 60%)`}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            );
          })}
        </svg>
      </div>

      <div className="mt-4 space-y-2">
        {keywords.map((keyword, index) => (
          <div key={keyword.keyword} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: `hsl(${(index / keywords.length) * 360}, 70%, 60%)` }}
            />
            <span className="text-sm">
              {keyword.keyword} ({((keyword.searchVolume / total) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}