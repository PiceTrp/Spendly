import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Transaction, ChatMessage, UserStats, PetMood } from '../types';

interface AppStore extends AppState {
  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  confirmTransaction: (id: string) => void;
  
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  
  updateBalance: (amount: number, type: 'add' | 'subtract') => void;
  updateStreak: () => void;
  
  updatePetMood: () => void;
  
  // Persistence
  saveToStorage: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
  
  // Computed getters
  getMoneyLeftToSpend: () => number;
  getCurrentMonthExpenses: () => number;
  getRecentTransactions: (limit?: number) => Transaction[];
  getTodayTransactions: () => Transaction[];
}

const initialUserStats: UserStats = {
  currentBalance: 0,
  monthlyBudget: 3000, // Default budget
  totalExpenses: 0,
  totalIncome: 0,
  streak: 0,
  lastActivityDate: null,
};

const initialPetMood: PetMood = {
  expression: 'neutral',
  accessories: [],
};

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const calculatePetMood = (stats: UserStats): PetMood => {
  const spendingRatio = stats.totalExpenses / (stats.totalIncome || 1);
  
  if (stats.totalIncome > stats.totalExpenses && stats.currentBalance > stats.monthlyBudget * 0.5) {
    return {
      expression: 'rich',
      accessories: ['sunglasses', 'gold-chain'],
    };
  } else if (spendingRatio > 0.8 || stats.currentBalance < stats.monthlyBudget * 0.1) {
    return {
      expression: 'poor',
      accessories: ['begging-bowl'],
    };
  } else {
    return {
      expression: 'neutral',
      accessories: [],
    };
  }
};

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  userStats: initialUserStats,
  transactions: [],
  chatHistory: [],
  petMood: initialPetMood,

  // Actions
  addTransaction: (transactionData) => {
    const transaction: Transaction = {
      ...transactionData,
      id: generateId(),
    };

    set((state) => {
      const newTransactions = [...state.transactions, transaction];
      const newStats = { ...state.userStats };

      if (transaction.isConfirmed) {
        if (transaction.type === 'income') {
          newStats.totalIncome += transaction.amount;
          newStats.currentBalance += transaction.amount;
        } else {
          newStats.totalExpenses += transaction.amount;
          newStats.currentBalance -= transaction.amount;
        }
      }

      return {
        transactions: newTransactions,
        userStats: newStats,
        petMood: calculatePetMood(newStats),
      };
    });

    get().saveToStorage();
  },

  updateTransaction: (id, updates) => {
    set((state) => {
      const newTransactions = state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      );
      return { transactions: newTransactions };
    });
    
    get().saveToStorage();
  },

  deleteTransaction: (id) => {
    set((state) => {
      const transactionToDelete = state.transactions.find(t => t.id === id);
      const newTransactions = state.transactions.filter((t) => t.id !== id);
      
      let newStats = { ...state.userStats };
      
      if (transactionToDelete?.isConfirmed) {
        if (transactionToDelete.type === 'income') {
          newStats.totalIncome -= transactionToDelete.amount;
          newStats.currentBalance -= transactionToDelete.amount;
        } else {
          newStats.totalExpenses -= transactionToDelete.amount;
          newStats.currentBalance += transactionToDelete.amount;
        }
      }
      
      return {
        transactions: newTransactions,
        userStats: newStats,
        petMood: calculatePetMood(newStats),
      };
    });
    
    get().saveToStorage();
  },

  confirmTransaction: (id) => {
    set((state) => {
      const transaction = state.transactions.find(t => t.id === id);
      if (!transaction || transaction.isConfirmed) return state;

      const newTransactions = state.transactions.map((t) =>
        t.id === id ? { ...t, isConfirmed: true } : t
      );

      const newStats = { ...state.userStats };
      
      if (transaction.type === 'income') {
        newStats.totalIncome += transaction.amount;
        newStats.currentBalance += transaction.amount;
      } else {
        newStats.totalExpenses += transaction.amount;
        newStats.currentBalance -= transaction.amount;
      }

      return {
        transactions: newTransactions,
        userStats: newStats,
        petMood: calculatePetMood(newStats),
      };
    });

    get().updateStreak();
    get().saveToStorage();
  },

  addChatMessage: (messageData) => {
    const message: ChatMessage = {
      ...messageData,
      id: generateId(),
      timestamp: new Date(),
    };

    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    }));
    
    get().saveToStorage();
  },

  updateBalance: (amount, type) => {
    set((state) => ({
      userStats: {
        ...state.userStats,
        currentBalance: type === 'add' 
          ? state.userStats.currentBalance + amount 
          : state.userStats.currentBalance - amount,
      },
    }));
  },

  updateStreak: () => {
    set((state) => {
      const today = new Date();
      const lastActivity = state.userStats.lastActivityDate;
      let newStreak = state.userStats.streak;

      if (lastActivity) {
        const daysDiff = Math.floor(
          (today.getTime() - lastActivity.getTime()) / (1000 * 3600 * 24)
        );
        
        if (daysDiff === 1) {
          newStreak += 1;
        } else if (daysDiff > 1) {
          newStreak = 1; // Reset streak if more than 1 day gap
        }
      } else {
        newStreak = 1; // First activity
      }

      return {
        userStats: {
          ...state.userStats,
          streak: newStreak,
          lastActivityDate: today,
        },
      };
    });
  },

  updatePetMood: () => {
    set((state) => ({
      petMood: calculatePetMood(state.userStats),
    }));
  },

  // Persistence
  saveToStorage: async () => {
    try {
      const state = get();
      const dataToSave = {
        userStats: state.userStats,
        transactions: state.transactions,
        chatHistory: state.chatHistory,
        petMood: state.petMood,
      };
      await AsyncStorage.setItem('@chat-to-rich-data', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  },

  loadFromStorage: async () => {
    try {
      const data = await AsyncStorage.getItem('@chat-to-rich-data');
      if (data) {
        const parsedData = JSON.parse(data);
        
        // Convert date strings back to Date objects
        const transactions = parsedData.transactions.map((t: any) => ({
          ...t,
          date: new Date(t.date),
        }));
        
        const chatHistory = parsedData.chatHistory.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));

        const userStats = {
          ...parsedData.userStats,
          lastActivityDate: parsedData.userStats.lastActivityDate 
            ? new Date(parsedData.userStats.lastActivityDate) 
            : null,
        };

        set({
          userStats,
          transactions,
          chatHistory,
          petMood: parsedData.petMood,
        });
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  },

  // Computed getters
  getMoneyLeftToSpend: () => {
    const state = get();
    return state.userStats.monthlyBudget - state.userStats.totalExpenses;
  },

  getCurrentMonthExpenses: () => {
    const state = get();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return state.transactions
      .filter(t => 
        t.type === 'expense' && 
        t.isConfirmed && 
        t.date.getMonth() === currentMonth &&
        t.date.getFullYear() === currentYear
      )
      .reduce((total, t) => total + t.amount, 0);
  },

  getRecentTransactions: (limit = 5) => {
    const state = get();
    return state.transactions
      .filter(t => t.isConfirmed)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  },

  getTodayTransactions: () => {
    const state = get();
    const today = new Date();
    
    return state.transactions.filter(t => 
      t.date.toDateString() === today.toDateString()
    );
  },
}));