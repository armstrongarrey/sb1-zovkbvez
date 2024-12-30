import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  errors: string[];
}

export function ErrorMessage({ errors }: ErrorMessageProps) {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
      <div className="flex items-center gap-2 text-red-700">
        <AlertCircle size={18} />
        <span className="font-medium">Please fix the following errors:</span>
      </div>
      <ul className="mt-2 list-disc list-inside text-red-600">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
}