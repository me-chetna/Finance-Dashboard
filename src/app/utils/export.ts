import type{ Transaction } from '../types';

export const exportToCSV = (transactions: Transaction[], filename: string = 'transactions.csv') => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  
  const csvContent = [
    headers.join(','),
    ...transactions.map(t => 
      [
        t.date,
        `"${t.description}"`,
        t.category,
        t.type,
        t.amount,
      ].join(',')
    ),
  ].join('\n');
  
  downloadFile(csvContent, filename, 'text/csv');
};

export const exportToJSON = (transactions: Transaction[], filename: string = 'transactions.json') => {
  const jsonContent = JSON.stringify(transactions, null, 2);
  downloadFile(jsonContent, filename, 'application/json');
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
