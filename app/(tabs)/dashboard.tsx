import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useAppStore } from '../../src/store/useAppStore';

export default function DashboardScreen() {
  const { userStats, getMoneyLeftToSpend } = useAppStore();
  const moneyLeft = getMoneyLeftToSpend();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Money Left to Spend</Text>
          <Text style={[
            styles.statValue, 
            { color: moneyLeft > 0 ? '#10b981' : '#ec4899' }
          ]}>
            ${moneyLeft.toFixed(0)}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Current Balance</Text>
          <Text style={styles.statValue}>
            ${userStats.currentBalance.toFixed(0)}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Monthly Budget</Text>
          <Text style={styles.statValue}>
            ${userStats.monthlyBudget.toFixed(0)}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Expenses</Text>
          <Text style={[styles.statValue, { color: '#ec4899' }]}>
            ${userStats.totalExpenses.toFixed(0)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});