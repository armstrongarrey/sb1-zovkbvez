import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { ResultsSection } from './components/ResultsSection';
import { ErrorMessage } from './components/ErrorMessage';
import { SocialTracker } from './components/social/SocialTracker';
import { validateKeyword } from './utils/validation';
import { analyzeKeyword } from './services/keywordAnalysis';
import type { KeywordAnalysis } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<KeywordAnalysis | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState<string>('');

  const handleKeywordAnalysis = async (keyword: string) => {
    const validationErrors = validateKeyword(keyword);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsLoading(true);
    setCurrentKeyword(keyword);

    try {
      const result = await analyzeKeyword(keyword);
      setAnalysis(result);
    } catch (error) {
      setErrors(['Failed to analyze keyword. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 space-y-12">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Building2 className="text-blue-600" size={40} />
            <h1 className="text-4xl font-bold text-gray-900">
              Real Estate Keyword Research
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover high-performing keywords for your real estate business. 
            Get insights on search volume, competition, and social media activity.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <SearchBar onSearch={handleKeywordAnalysis} isLoading={isLoading} />
          <ErrorMessage errors={errors} />
        </div>

        {analysis && (
          <div className="space-y-8">
            <ResultsSection 
              suggestions={analysis.suggestions}
              relatedTerms={analysis.relatedTerms}
            />
            <SocialTracker keyword={currentKeyword} />
          </div>
        )}
      </div>
    </div>
  );
}