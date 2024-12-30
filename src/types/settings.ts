export interface UserPreferences {
  defaultExportFormat: 'excel' | 'csv' | 'pdf';
  emailNotifications: boolean;
  darkMode: boolean;
}

export interface UserSettings {
  id: string;
  userId: string;
  preferences: UserPreferences;
  updatedAt: string;
}