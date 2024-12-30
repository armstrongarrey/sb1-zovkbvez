import type { KeywordAnalysis } from '../../types';

export const exportToCsv = (analysis: KeywordAnalysis) => {
  const headers = ['Keyword', 'Search Volume', 'Difficulty', 'Intent', 'Relevance'];
  const rows = analysis.suggestions.map(s => [
    s.keyword,
    s.searchVolume.toString(),
    s.difficulty.toString(),
    s.intent,
    s.relevance.toString()
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `keyword-analysis-${analysis.keyword}.csv`;
  link.click();
};