import { KeywordAnalysis, KeywordSuggestion } from '../types';

// Common real estate modifiers
const MODIFIERS = [
  'for sale',
  'for rent',
  'near me',
  'price',
  'luxury',
  'cheap',
  'new',
  'with pool',
  'with garage',
  'oceanfront',
  'downtown'
];

// Intent patterns
const INTENT_PATTERNS = {
  commercial: ['price', 'cost', 'buy', 'rent', 'for sale', 'for rent'],
  informational: ['how', 'what', 'guide', 'tips', 'best'],
  navigational: ['near', 'in', 'location', 'map', 'where']
};

function generateSearchVolume(): number {
  // Generate realistic-looking search volumes
  const base = Math.floor(Math.random() * 15000) + 1000;
  return Math.round(base / 100) * 100; // Round to nearest hundred
}

function calculateDifficulty(searchVolume: number): number {
  // Higher search volume generally means higher difficulty
  const baseDifficulty = (searchVolume / 15000) * 60;
  const variation = Math.random() * 20 - 10; // +/- 10
  return Math.min(Math.max(Math.round(baseDifficulty + variation), 5), 95);
}

function determineIntent(keyword: string): 'commercial' | 'informational' | 'navigational' {
  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    if (patterns.some(pattern => keyword.toLowerCase().includes(pattern))) {
      return intent as 'commercial' | 'informational' | 'navigational';
    }
  }
  return 'informational'; // Default intent
}

function calculateRelevance(originalKeyword: string, suggestion: string): number {
  const words = originalKeyword.toLowerCase().split(' ');
  const suggestionWords = suggestion.toLowerCase().split(' ');
  
  // Calculate word overlap
  const commonWords = words.filter(word => suggestionWords.includes(word));
  const overlapScore = (commonWords.length / Math.max(words.length, suggestionWords.length)) * 100;
  
  // Add some variation
  const variation = Math.random() * 10 - 5; // +/- 5
  return Math.min(Math.max(Math.round(overlapScore + variation), 60), 100);
}

function generateRelatedTerms(keyword: string): string[] {
  const words = keyword.toLowerCase().split(' ');
  const baseWord = words[words.length - 1]; // Use the last word as base
  
  return [
    `luxury ${baseWord}`,
    `affordable ${baseWord}`,
    `${baseWord} investment`,
    `${baseWord} market trends`,
    `best ${baseWord} areas`,
    `${baseWord} prices`,
    `${baseWord} listings`,
    `new ${baseWord} developments`
  ];
}

export async function analyzeKeyword(keyword: string): Promise<KeywordAnalysis> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const suggestions: KeywordSuggestion[] = MODIFIERS.map(modifier => {
    const suggestedKeyword = `${keyword} ${modifier}`;
    const searchVolume = generateSearchVolume();
    
    return {
      keyword: suggestedKeyword,
      searchVolume,
      difficulty: calculateDifficulty(searchVolume),
      intent: determineIntent(suggestedKeyword),
      relevance: calculateRelevance(keyword, suggestedKeyword)
    };
  });

  // Sort by search volume descending
  suggestions.sort((a, b) => b.searchVolume - a.searchVolume);

  return {
    keyword,
    suggestions: suggestions.slice(0, 5), // Return top 5 suggestions
    relatedTerms: generateRelatedTerms(keyword)
  };
}