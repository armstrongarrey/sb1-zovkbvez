export interface SocialMention {
  platform: 'google' | 'linkedin' | 'facebook' | 'twitter';
  username: string;
  profileUrl: string;
  timestamp: string;
  searchTerm: string;
  location?: string;
  engagement?: number;
}

export interface SocialTrackingStats {
  platform: string;
  searchCount: number;
  trend: 'up' | 'down' | 'stable';
}