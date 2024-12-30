import React, { useEffect, useState } from 'react';
import type { SocialMention, SocialTrackingStats } from '../../types/social';
import { getSocialMentions, getSocialStats } from '../../services/socialTracking';
import { SocialStats } from './SocialStats';
import { RecentSearches } from './RecentSearches';

interface SocialTrackerProps {
  keyword: string;
}

export function SocialTracker({ keyword }: SocialTrackerProps) {
  const [mentions, setMentions] = useState<SocialMention[]>([]);
  const [stats, setStats] = useState<SocialTrackingStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [mentionsData, statsData] = await Promise.all([
          getSocialMentions(keyword),
          getSocialStats(keyword)
        ]);
        setMentions(mentionsData);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to fetch social data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [keyword]);

  if (loading) {
    return <div className="animate-pulse">Loading social data...</div>;
  }

  return (
    <div className="space-y-6">
      <SocialStats stats={stats} />
      <RecentSearches mentions={mentions} />
    </div>
  );
}