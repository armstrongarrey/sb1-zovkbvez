import React, { useState } from 'react';
import { Tags, Plus, X } from 'lucide-react';
import type { KeywordSuggestion } from '../../types';
import { supabase } from '../../utils/supabase';

interface Category {
  id: string;
  name: string;
  color: string;
  keywords: string[];
}

interface KeywordClusteringProps {
  keywords: KeywordSuggestion[];
}

export function KeywordClustering({ keywords }: KeywordClusteringProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#2563eb' });

  const addCategory = async () => {
    if (!newCategory.name) return;

    const { data, error } = await supabase
      .from('keyword_categories')
      .insert([{
        name: newCategory.name,
        color: newCategory.color,
        keywords: []
      }])
      .select()
      .single();

    if (!error && data) {
      setCategories([...categories, data]);
      setNewCategory({ name: '', color: '#2563eb' });
    }
  };

  const addKeywordToCategory = async (categoryId: string, keyword: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const { error } = await supabase
      .from('keyword_categories')
      .update({ keywords: [...category.keywords, keyword] })
      .eq('id', categoryId);

    if (!error) {
      setCategories(categories.map(c => 
        c.id === categoryId 
          ? { ...c, keywords: [...c.keywords, keyword] }
          : c
      ));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Tags className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold">Keyword Categories</h3>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h4 className="font-medium">{category.name}</h4>
              </div>
              <span className="text-sm text-gray-500">
                {category.keywords.length} keywords
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-2 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
                >
                  {keyword}
                  <button 
                    onClick={() => {/* Remove keyword */}}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New category name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="flex-1 rounded-md border-gray-300"
          />
          <input
            type="color"
            value={newCategory.color}
            onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
            className="w-12 h-10 rounded-md border-gray-300"
          />
          <button
            onClick={addCategory}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}