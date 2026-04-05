import type{ Transaction, FilterOptions } from '../types';

export const applyFilters = (transactions: Transaction[], filters: FilterOptions): Transaction[] => {
  let filtered = [...transactions];
  
  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(t => 
      t.description.toLowerCase().includes(searchLower) ||
      t.category.toLowerCase().includes(searchLower)
    );
  }
  
  // Type filter
  if (filters.type !== 'all') {
    filtered = filtered.filter(t => t.type === filters.type);
  }
  
  // Category filter
  if (filters.category !== 'all') {
    filtered = filtered.filter(t => t.category === filters.category);
  }
  
  // Date range filter
  if (filters.dateRange !== 'all') {
    const now = new Date();
    const startDate = new Date();
    
    switch (filters.dateRange) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    filtered = filtered.filter(t => new Date(t.date) >= startDate);
  }
  
  // Sort
  filtered.sort((a, b) => {
    let comparison = 0;
    
    if (filters.sortBy === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      comparison = a.amount - b.amount;
    }
    
    return filters.sortOrder === 'asc' ? comparison : -comparison;
  });
  
  return filtered;
};
