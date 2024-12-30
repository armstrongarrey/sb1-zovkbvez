import * as XLSX from 'xlsx';
import type { KeywordAnalysis } from '../types';

export const exportToExcel = (analysis: KeywordAnalysis) => {
  const workbook = XLSX.utils.book_new();
  
  // Keywords sheet
  const keywordsData = analysis.suggestions.map(s => ({
    Keyword: s.keyword,
    'Search Volume': s.searchVolume,
    Difficulty: s.difficulty,
    Intent: s.intent,
    Relevance: s.relevance
  }));
  
  const keywordsSheet = XLSX.utils.json_to_sheet(keywordsData);
  XLSX.utils.book_append_sheet(workbook, keywordsSheet, 'Keywords');
  
  // Related terms sheet
  const termsData = analysis.relatedTerms.map(term => ({ Term: term }));
  const termsSheet = XLSX.utils.json_to_sheet(termsData);
  XLSX.utils.book_append_sheet(workbook, termsSheet, 'Related Terms');
  
  XLSX.writeFile(workbook, `keyword-analysis-${analysis.keyword}.xlsx`);
};