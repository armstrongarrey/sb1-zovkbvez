import type { KeywordAnalysis } from '../../types';

export const exportToPdf = async (analysis: KeywordAnalysis) => {
  // Using browser's print functionality for PDF export
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Keyword Analysis - ${analysis.keyword}</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 2rem; }
        table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
        th, td { padding: 0.5rem; text-align: left; border-bottom: 1px solid #ddd; }
        h1, h2 { color: #1e40af; }
      </style>
    </head>
    <body>
      <h1>Keyword Analysis Report</h1>
      <h2>Main Keyword: ${analysis.keyword}</h2>
      
      <h3>Keyword Suggestions</h3>
      <table>
        <thead>
          <tr>
            <th>Keyword</th>
            <th>Search Volume</th>
            <th>Difficulty</th>
            <th>Intent</th>
          </tr>
        </thead>
        <tbody>
          ${analysis.suggestions.map(s => `
            <tr>
              <td>${s.keyword}</td>
              <td>${s.searchVolume.toLocaleString()}</td>
              <td>${s.difficulty}/100</td>
              <td>${s.intent}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <h3>Related Terms</h3>
      <ul>
        ${analysis.relatedTerms.map(term => `<li>${term}</li>`).join('')}
      </ul>
    </body>
    </html>
  `;

  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
};