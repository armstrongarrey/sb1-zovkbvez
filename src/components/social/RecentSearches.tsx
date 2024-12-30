import React from 'react';
import type { SocialMention } from '../../types/social';

interface RecentSearchesProps {
  mentions: SocialMention[];
}

export function RecentSearches({ mentions }: RecentSearchesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Searchers</h3>
      <div className="space-y-4">
        {mentions.map((mention, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">{mention.username}</div>
              <div className="text-sm text-gray-600">
                via {mention.platform} • {mention.location}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(mention.timestamp).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}