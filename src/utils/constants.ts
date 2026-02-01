import { TransactionCategory, CategoryConfig } from '../types';

export const CATEGORY_CONFIGS: Record<TransactionCategory, CategoryConfig> = {
  food: {
    name: 'Food & Dining',
    icon: '🍽️',
    color: '#f59e0b', // amber
  },
  transport: {
    name: 'Transport',
    icon: '🚗',
    color: '#3b82f6', // blue
  },
  shopping: {
    name: 'Shopping',
    icon: '🛍️',
    color: '#ec4899', // pink
  },
  entertainment: {
    name: 'Entertainment',
    icon: '🎬',
    color: '#8b5cf6', // violet
  },
  bills: {
    name: 'Bills & Utilities',
    icon: '📄',
    color: '#ef4444', // red
  },
  health: {
    name: 'Health & Fitness',
    icon: '💊',
    color: '#10b981', // emerald
  },
  income: {
    name: 'Income',
    icon: '💰',
    color: '#10b981', // emerald
  },
  other: {
    name: 'Other',
    icon: '📦',
    color: '#64748b', // slate
  },
};

export const PET_EXPRESSIONS = {
  rich: {
    emoji: '😎',
    description: 'Rich Mode - Wearing sunglasses and gold chain',
    accessories: ['🕶️', '🔗'],
  },
  poor: {
    emoji: '😿',
    description: 'Poor Mode - Looking sad with begging bowl',
    accessories: ['🥣'],
  },
  neutral: {
    emoji: '😸',
    description: 'Neutral Mode - Happy and content',
    accessories: [],
  },
};

export const COLORS = {
  primary: '#10b981', // emerald-500
  primaryLight: '#d1fae5', // emerald-100
  primaryDark: '#047857', // emerald-700
  
  danger: '#ec4899', // rose-500
  dangerLight: '#fce7f3', // rose-100
  dangerDark: '#be185d', // rose-700
  
  accent: '#f59e0b', // amber-500
  accentLight: '#fef3c7', // amber-100
  accentDark: '#d97706', // amber-600
  
  neutral: '#64748b', // slate-500
  neutralLight: '#f1f5f9', // slate-100
  neutralDark: '#1e293b', // slate-800
  
  background: '#ffffff',
  surface: '#f8fafc', // slate-50
  border: '#e2e8f0', // slate-200
  text: '#1e293b', // slate-800
  textSecondary: '#64748b', // slate-500
  textLight: '#94a3b8', // slate-400
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const BORDER_RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  xxxxl: 36,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const CHAT_PROMPTS = [
  "Bought coffee for $5",
  "Spent $50 on groceries",
  "Paid rent $1200",
  "Earned $100 from freelance",
  "Gas station $40",
  "Movie ticket $15",
];

export const AI_RESPONSES = [
  "Got it! Let me create a transaction for that.",
  "Perfect! I'll help you track this expense.",
  "Nice! Adding that to your records.",
  "Understood! Creating your transaction card.",
  "Great! Let me process that for you.",
];