import { useState } from 'react';
import { Transaction, TransactionCategory } from '../types';
import { AI_RESPONSES, CATEGORY_CONFIGS } from '../utils/constants';

interface ParsedTransaction {
  title: string;
  amount: number;
  category: TransactionCategory;
  type: 'income' | 'expense';
}

export const useMockAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const parseMessage = async (message: string): Promise<{
    response: string;
    transaction?: ParsedTransaction;
  }> => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerMessage = message.toLowerCase();
    
    // Extract amount using regex
    const amountMatch = message.match(/\$?(\d+(?:\.\d{2})?)/);
    const amount = amountMatch ? parseFloat(amountMatch[1]) : 0;

    // Determine if it's income or expense
    const incomeKeywords = ['earned', 'received', 'got paid', 'salary', 'bonus', 'freelance', 'income'];
    const isIncome = incomeKeywords.some(keyword => lowerMessage.includes(keyword));

    // Extract category based on keywords
    let category: TransactionCategory = 'other';
    
    const categoryKeywords = {
      food: ['food', 'coffee', 'restaurant', 'lunch', 'dinner', 'breakfast', 'groceries', 'ate', 'bought food'],
      transport: ['gas', 'fuel', 'uber', 'taxi', 'bus', 'train', 'transport', 'car', 'parking'],
      shopping: ['bought', 'shopping', 'clothes', 'amazon', 'store', 'purchase'],
      entertainment: ['movie', 'cinema', 'concert', 'game', 'entertainment', 'netflix', 'spotify'],
      bills: ['rent', 'electricity', 'water', 'internet', 'phone', 'bill', 'utility'],
      health: ['doctor', 'medicine', 'pharmacy', 'gym', 'health', 'medical'],
      income: ['salary', 'freelance', 'bonus', 'earned', 'income', 'paid'],
    };

    // Find matching category
    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        category = cat as TransactionCategory;
        break;
      }
    }

    // If it's income, set category to income
    if (isIncome) {
      category = 'income';
    }

    // Extract title - try to get meaningful part of the message
    let title = message;
    if (amountMatch) {
      title = message.replace(amountMatch[0], '').trim();
      title = title.replace(/^(bought|spent|paid|earned|received|got)\s*/i, '');
      title = title || CATEGORY_CONFIGS[category].name;
    }

    // Capitalize first letter
    title = title.charAt(0).toUpperCase() + title.slice(1);

    const transaction: ParsedTransaction = {
      title,
      amount,
      category,
      type: isIncome ? 'income' : 'expense',
    };

    const response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];

    setIsLoading(false);

    return {
      response,
      transaction: amount > 0 ? transaction : undefined,
    };
  };

  return {
    parseMessage,
    isLoading,
  };
};

export default useMockAI;