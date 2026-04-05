import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import type{ Transaction, TransactionType, TransactionCategory } from '../../types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id'> | Transaction) => void;
  transaction?: Transaction | null;
}

const categories: TransactionCategory[] = [
  'Salary',
  'Freelance',
  'Investment',
  'Food & Dining',
  'Shopping',
  'Transport',
  'Entertainment',
  'Healthcare',
  'Bills & Utilities',
  'Education',
  'Other',
];

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  transaction,
}) => {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: '' as TransactionCategory | '',
    type: 'expense' as TransactionType,
    description: '',
  });
  
  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date,
        amount: transaction.amount.toString(),
        category: transaction.category,
        type: transaction.type,
        description: transaction.description,
      });
    } else {
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        date: today,
        amount: '',
        category: '',
        type: 'expense',
        description: '',
      });
    }
  }, [transaction, isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      alert('Please select a category');
      return;
    }
    
    const transactionData = {
      date: formData.date,
      amount: parseFloat(formData.amount),
      category: formData.category as TransactionCategory,
      type: formData.type,
      description: formData.description,
    };
    
    if (transaction) {
      onSave({ ...transactionData, id: transaction.id });
    } else {
      onSave(transactionData);
    }
    
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {transaction ? 'Edit Transaction' : 'Add Transaction'}
            </DialogTitle>
            <DialogDescription>
              {transaction
                ? 'Update the transaction details below.'
                : 'Fill in the details to add a new transaction.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="e.g., Coffee, Snacks, Notebooks, Rent, Salary"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: TransactionType) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: TransactionCategory) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {transaction ? 'Update' : 'Add'} Transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};