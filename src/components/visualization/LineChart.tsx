import React from 'react';
import { LineChart as LineIcon } from 'lucide-react';
import type { KeywordHistory } from '../../types';

interface LineChartProps {
  history: KeywordHistory[];
  keyword: string;
}

export function LineChart({ history, keyword }: LineChartProps) {
  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const maxVolume = Math.max(...sortedHistory.map(h => h.searchVolume));
  const points = sortedHistory.map((h, i) => {
    const x = (i / (sortedHistory.length - 1)) * 100;
    const y = (h.searchVolume / maxVolume) * 100;
    return `${x},${100 - y}`;
  }).join(' ');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <LineIcon className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold">Search Volume Trend - {keyword}</h3>
      </div>
      
      <div className="h-64 relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-500">
          {[maxVolume, maxVolume/2, 0].map((value) => (
            <span key={value}>{Math.round(value).toLocaleString()}</span>
          ))}
        </div>
      </div>
    </div>
  );
}