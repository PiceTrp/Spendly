export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: TransactionCategory;
  type: 'income' | 'expense';
  date: Date;
  isConfirmed: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'system' | 'transaction-card';
  timestamp: Date;
  transaction?: Transaction;
}

export interface PetMood {
  expression: 'rich' | 'poor' | 'neutral';
  accessories: string[];
}

export interface UserStats {
  currentBalance: number;
  monthlyBudget: number;
  totalExpenses: number;
  totalIncome: number;
  streak: number;
  lastActivityDate: Date | null;
}

export interface AppState {
  userStats: UserStats;
  transactions: Transaction[];
  chatHistory: ChatMessage[];
  petMood: PetMood;
}

export type TransactionCategory = 
  | 'food' 
  | 'transport' 
  | 'shopping' 
  | 'entertainment' 
  | 'bills' 
  | 'health' 
  | 'income' 
  | 'other';

export interface CategoryConfig {
  name: string;
  icon: string;
  color: string;
}