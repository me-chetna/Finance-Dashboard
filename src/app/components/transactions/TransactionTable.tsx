import React from 'react';
import { Edit2, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type{ Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/calculations';
import { categoryColors } from '../../data/mockData';
import { cn } from '../ui/utils';

interface TransactionTableProps {
  transactions: Transaction[];
  canEdit: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  canEdit,
  onEdit,
  onDelete,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="text-lg font-medium">No transactions found</p>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            {canEdit && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {formatDate(transaction.date)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'p-1.5 rounded-full',
                      transaction.type === 'income'
                        ? 'bg-green-100 dark:bg-green-900/20'
                        : 'bg-red-100 dark:bg-red-900/20'
                    )}
                  >
                    {transaction.type === 'income' ? (
                      <ArrowDownRight className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  {transaction.description}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  style={{
                    borderColor: categoryColors[transaction.category],
                    color: categoryColors[transaction.category],
                  }}
                >
                  {transaction.category}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={transaction.type === 'income' ? 'default' : 'secondary'}
                  className={cn(
                    transaction.type === 'income'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  )}
                >
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-semibold">
                <span
                  className={cn(
                    transaction.type === 'income'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  )}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
              </TableCell>
              {canEdit && (
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(transaction)}
                      className="h-8 w-8"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(transaction.id)}
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
