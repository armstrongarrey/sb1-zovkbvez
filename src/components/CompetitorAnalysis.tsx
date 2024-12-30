import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Competitor } from '../types';
import { supabase } from '../utils/supabase';

interface CompetitorAnalysisProps {
  competitors: Competitor[];
  onUpdate: () => void;
}

export function CompetitorAnalysis({ competitors, onUpdate }: CompetitorAnalysisProps) {
  const [newCompetitor, setNewCompetitor] = useState({ name: '', website: '' });

  const addCompetitor = async () => {
    if (!newCompetitor.name || !newCompetitor.website) return;

    const { error } = await supabase
      .from('competitors')
      .insert([{ ...newCompetitor, keywords: [] }]);

    if (!error) {
      setNewCompetitor({ name: '', website: '' });
      onUpdate();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Competitor Analysis</h3>
      
      <div className="space-y-4">
        {competitors.map((competitor) => (
          <div key={competitor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">{competitor.name}</h4>
              <a
                href={competitor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {competitor.website}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {competitor.keywords.length} keywords tracked
              </span>
              <button
                onClick={() => {/* Implement delete */}}
                className="text-red-600 hover:text-red-800"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ))}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Competitor name"
            value={newCompetitor.name}
            onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
            className="flex-1 rounded-md border-gray-300"
          />
          <input
            type="url"
            placeholder="Website URL"
            value={newCompetitor.website}
            onChange={(e) => setNewCompetitor({ ...newCompetitor, website: e.target.value })}
            className="flex-1 rounded-md border-gray-300"
          />
          <button
            onClick={addCompetitor}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}