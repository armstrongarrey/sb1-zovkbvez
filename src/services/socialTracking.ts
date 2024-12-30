import type { SocialMention, SocialTrackingStats } from '../types/social';

// Simulated social tracking data since we can't actually access this data
export const getSocialMentions = async (keyword: string): Promise<SocialMention[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const platforms = ['google', 'linkedin', 'facebook', 'twitter'] as const;
  const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle'];
  
  return Array.from({ length: 8 }, () => ({
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    username: `user${Math.floor(Math.random() * 1000)}`,
    profileUrl: '#', // In a real app, this would be a valid social media profile URL
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    searchTerm: keyword,
    location: locations[Math.floor(Math.random() * locations.length)],
    engagement: Math.floor(Math.random() * 100)
  }));
};

export const getSocialStats = async (keyword: string): Promise<SocialTrackingStats[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    { platform: 'Google', searchCount: Math.floor(Math.random() * 1000), trend: 'up' },
    { platform: 'LinkedIn', searchCount: Math.floor(Math.random() * 500), trend: 'stable' },
    { platform: 'Facebook', searchCount: Math.floor(Math.random() * 300), trend: 'down' },
    { platform: 'Twitter', searchCount: Math.floor(Math.random() * 200), trend: 'up' }
  ];
};