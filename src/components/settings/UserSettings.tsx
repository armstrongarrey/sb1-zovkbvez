import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import { supabase } from '../../utils/supabase';

interface UserPreferences {
  defaultExportFormat: 'excel' | 'csv' | 'pdf';
  emailNotifications: boolean;
  darkMode: boolean;
}

export function UserSettings() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    defaultExportFormat: 'excel',
    emailNotifications: true,
    darkMode: false,
  });

  const savePreferences = async () => {
    const { error } = await supabase
      .from('user_preferences')
      .upsert([{ 
        user_id: (await supabase.auth.getUser()).data.user?.id,
        preferences 
      }]);

    if (!error) {
      // Show success message
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold">User Preferences</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Export Format
          </label>
          <select
            value={preferences.defaultExportFormat}
            onChange={(e) => setPreferences({
              ...preferences,
              defaultExportFormat: e.target.value as UserPreferences['defaultExportFormat']
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={preferences.emailNotifications}
            onChange={(e) => setPreferences({
              ...preferences,
              emailNotifications: e.target.checked
            })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="emailNotifications" className="text-sm text-gray-700">
            Enable email notifications
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="darkMode"
            checked={preferences.darkMode}
            onChange={(e) => setPreferences({
              ...preferences,
              darkMode: e.target.checked
            })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="darkMode" className="text-sm text-gray-700">
            Enable dark mode
          </label>
        </div>

        <button
          onClick={savePreferences}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Save size={16} />
          Save Preferences
        </button>
      </div>
    </div>
  );
}