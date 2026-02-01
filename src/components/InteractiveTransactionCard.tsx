import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Check, X, ChevronDown } from 'lucide-react-native';
import { Transaction, TransactionCategory } from '../types';
import { CATEGORY_CONFIGS, COLORS } from '../utils/constants';
import { useAppStore } from '../store/useAppStore';

interface Props {
  initialData?: Partial<Transaction>;
  onConfirm?: (transaction: Transaction) => void;
  onDelete?: () => void;
  isLocked?: boolean;
}

export function InteractiveTransactionCard({ 
  initialData, 
  onConfirm, 
  onDelete,
  isLocked = false 
}: Props) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [amount, setAmount] = useState(initialData?.amount?.toString() || '');
  const [category, setCategory] = useState<TransactionCategory>(
    initialData?.category || 'other'
  );
  const [type, setType] = useState<'income' | 'expense'>(
    initialData?.type || 'expense'
  );
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const addTransaction = useAppStore((state) => state.addTransaction);

  const categoryConfig = CATEGORY_CONFIGS[category];
  const categories = Object.entries(CATEGORY_CONFIGS);

  const handleConfirm = () => {
    if (!title.trim() || !amount || parseFloat(amount) <= 0) return;

    const transaction: Transaction = {
      id: initialData?.id || '',
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      type,
      date: new Date(),
      isConfirmed: true,
    };

    if (onConfirm) {
      onConfirm(transaction);
    } else {
      addTransaction(transaction);
    }
  };

  const isValid = title.trim() && amount && parseFloat(amount) > 0;

  if (isLocked) {
    return (
      <View className="bg-neutral-100 rounded-xl p-4 mx-4 my-2 opacity-75">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Text className="text-2xl mr-3">{categoryConfig.icon}</Text>
            <View className="flex-1">
              <Text className="font-semibold text-neutral-800">{title}</Text>
              <Text className="text-sm text-neutral-600">
                {categoryConfig.name}
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Text 
              className={`text-lg font-bold ${
                type === 'income' ? 'text-primary-600' : 'text-danger-600'
              }`}
            >
              {type === 'income' ? '+' : '-'}${amount}
            </Text>
            <View className="bg-primary-100 rounded-full px-2 py-1 mt-1">
              <Text className="text-primary-600 text-xs font-medium">
                Confirmed ✓
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-xl p-4 mx-4 my-2 shadow-md border border-neutral-200">
      {/* Header with Icon and Type Toggle */}
      <View className="flex-row items-center justify-between mb-3">
        <TouchableOpacity
          onPress={() => setShowCategoryModal(true)}
          className="flex-row items-center bg-neutral-50 rounded-lg px-3 py-2"
        >
          <Text className="text-xl mr-2">{categoryConfig.icon}</Text>
          <Text className="text-sm text-neutral-600 mr-1">
            {categoryConfig.name}
          </Text>
          <ChevronDown size={16} color={COLORS.textSecondary} />
        </TouchableOpacity>

        {/* Income/Expense Toggle */}
        <View className="flex-row bg-neutral-100 rounded-lg p-1">
          <TouchableOpacity
            onPress={() => setType('expense')}
            className={`px-3 py-1 rounded-md ${
              type === 'expense' ? 'bg-danger-500' : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                type === 'expense' ? 'text-white' : 'text-neutral-600'
              }`}
            >
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setType('income')}
            className={`px-3 py-1 rounded-md ${
              type === 'income' ? 'bg-primary-500' : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                type === 'income' ? 'text-white' : 'text-neutral-600'
              }`}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Title Input */}
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="What did you buy?"
        className="bg-neutral-50 rounded-lg px-3 py-3 text-base text-neutral-800 mb-3"
        placeholderTextColor={COLORS.textSecondary}
      />

      {/* Amount Input */}
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        keyboardType="numeric"
        className="bg-neutral-50 rounded-lg px-3 py-3 text-base text-neutral-800 mb-4"
        placeholderTextColor={COLORS.textSecondary}
      />

      {/* Action Buttons */}
      <View className="flex-row space-x-3">
        <TouchableOpacity
          onPress={handleConfirm}
          disabled={!isValid}
          className={`flex-1 rounded-lg py-3 flex-row items-center justify-center ${
            isValid ? 'bg-primary-500' : 'bg-neutral-200'
          }`}
        >
          <Check size={18} color={isValid ? 'white' : COLORS.textSecondary} />
          <Text
            className={`ml-2 font-semibold ${
              isValid ? 'text-white' : 'text-neutral-400'
            }`}
          >
            Confirm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDelete}
          className="bg-danger-500 rounded-lg py-3 px-4 items-center justify-center"
        >
          <X size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-xl p-6 max-h-96">
            <Text className="text-lg font-bold text-neutral-800 mb-4">
              Select Category
            </Text>
            <FlatList
              data={categories}
              keyExtractor={([key]) => key}
              renderItem={({ item: [key, config] }) => (
                <TouchableOpacity
                  onPress={() => {
                    setCategory(key as TransactionCategory);
                    setShowCategoryModal(false);
                  }}
                  className={`flex-row items-center py-3 px-4 rounded-lg mb-2 ${
                    category === key ? 'bg-primary-50' : 'bg-neutral-50'
                  }`}
                >
                  <Text className="text-xl mr-3">{config.icon}</Text>
                  <Text
                    className={`flex-1 text-base ${
                      category === key ? 'text-primary-600 font-medium' : 'text-neutral-800'
                    }`}
                  >
                    {config.name}
                  </Text>
                  {category === key && (
                    <Check size={20} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}