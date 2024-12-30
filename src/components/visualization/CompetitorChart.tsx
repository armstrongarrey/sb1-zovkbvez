import React from 'react';
import { BarChart as BarChartIcon } from 'lucide-react';
import type { Competitor } from '../../types';

interface CompetitorChartProps {
  competitors: Competitor[];
  selectedKeyword: string;
}

export function CompetitorChart({ competitors, selectedKeyword }: CompetitorChartProps) {
  const competitorData = competitors.map(competitor => ({
    name: competitor.name,
    hasKeyword: competitor.keywords.includes(selectedKeyword),
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <BarChartIcon className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold">Competitor Keyword Usage</h3>
      </div>
      
      <div className="space-y-3">
        {competitorData.map(({ name, hasKeyword }) => (
          <div key={name} className="flex items-center gap-4">
            <span className="w-32 truncate">{name}</span>
            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${hasKeyword ? 'bg-blue-500' : 'bg-gray-200'}`}
                style={{ width: hasKeyword ? '100%' : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}