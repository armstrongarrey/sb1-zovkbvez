import React from 'react';
import { Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { SocialTrackingStats } from '../../types/social';

interface SocialStatsProps {
  stats: SocialTrackingStats[];
}

export function SocialStats({ stats }: SocialStatsProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="text-green-500" size={16} />;
      case 'down':
        return <TrendingDown className="text-red-500" size={16} />;
      default:
        return <Minus className="text-yellow-500" size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold">Social Media Activity</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.platform} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">{stat.platform}</span>
              {getTrendIcon(stat.trend)}
            </div>
            <div className="mt-2 text-2xl font-bold">
              {stat.searchCount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">searches</div>
          </div>
        ))}
      </div>
    </div>
  );
}