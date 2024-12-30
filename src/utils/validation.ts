export const validateKeyword = (keyword: string): string[] => {
  const errors: string[] = [];
  
  if (!keyword.trim()) {
    errors.push('Keyword is required');
  }
  
  if (keyword.length < 3) {
    errors.push('Keyword must be at least 3 characters long');
  }
  
  if (keyword.length > 100) {
    errors.push('Keyword must be less than 100 characters');
  }
  
  return errors;
};