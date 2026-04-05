import React, { useState } from 'react';
import { Plus, User, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { TransactionModal } from '../components/transactions/TransactionModal';
import type{ FilterOptions, Transaction } from '../types';
import { applyFilters } from '../utils/filters';
import { toast } from 'sonner';

export const TransactionsPage: React.FC = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction, userRole, setUserRole } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    type: 'all',
    category: 'all',
    dateRange: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });
  
  const filteredTransactions = applyFilters(transactions, filters);
  const canEdit = userRole === 'admin';
  
  const handleAddTransaction = () => {
    if (!canEdit) {
      toast.error('You need admin access to add transactions');
      return;
    }
    setEditingTransaction(null);
    setIsModalOpen(true);
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
    if (!canEdit) {
      toast.error('You need admin access to edit transactions');
      return;
    }
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };
  
  const handleDeleteTransaction = (id: string) => {
    if (!canEdit) {
      toast.error('You need admin access to delete transactions');
      return;
    }
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
      toast.success('Transaction deleted successfully');
    }
  };
  
  const handleSaveTransaction = (transaction: Omit<Transaction, 'id'> | Transaction) => {
    if ('id' in transaction) {
      updateTransaction(transaction.id, transaction);
      toast.success('Transaction updated successfully');
    } else {
      addTransaction(transaction);
      toast.success('Transaction added successfully');
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage and track all your financial transactions
          </p>
        </div>
        <div className="flex gap-2">
          {canEdit && (
            <Button onClick={handleAddTransaction} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          )}
        </div>
      </div>
      
      {/* Viewer Mode Notice */}
      {!canEdit && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                You are in Viewer Mode
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                Switch to Admin mode to add, edit, or delete transactions.
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setUserRole('admin')}
                className="gap-2 bg-white dark:bg-gray-800 hover:bg-yellow-50 dark:hover:bg-gray-700"
              >
                <Shield className="w-4 h-4" />
                Switch to Admin Mode
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Filters */}
      <TransactionFilters filters={filters} onFiltersChange={setFilters} />
      
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </p>
        {!canEdit && (
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            You are in viewer mode. Switch to admin to add or edit transactions.
          </p>
        )}
      </div>
      
      {/* Transactions Table */}
      <TransactionTable
        transactions={filteredTransactions}
        canEdit={canEdit}
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
      />
      
      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        transaction={editingTransaction}
      />
    </div>
  );
};