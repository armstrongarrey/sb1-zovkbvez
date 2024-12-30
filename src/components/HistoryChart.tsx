import React from 'react';
import type { KeywordHistory } from '../types';

interface HistoryChartProps {
  history: KeywordHistory[];
}

export function HistoryChart({ history }: HistoryChartProps) {
  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Keyword History</h3>
      <div className="h-64 flex items-end space-x-2">
        {sortedHistory.map((item, index) => (
          <div
            key={item.id}
            className="flex-1 bg-blue-500 hover:bg-blue-600 transition-colors relative group"
            style={{ height: `${(item.searchVolume / 1000)}%` }}
          >
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.keyword}: {item.searchVolume.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}