export interface KeywordSuggestion {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  intent: 'commercial' | 'informational' | 'navigational';
  relevance: number;
}

export interface KeywordAnalysis {
  keyword: string;
  suggestions: KeywordSuggestion[];
  relatedTerms: string[];
}

export interface User {
  id: string;
  email: string;
}

export interface KeywordHistory {
  id: string;
  userId: string;
  keyword: string;
  searchVolume: number;
  difficulty: number;
  createdAt: string;
}

export interface Competitor {
  id: string;
  userId: string;
  name: string;
  website: string;
  keywords: string[];
}