import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useAppStore } from '../../src/store/useAppStore';

export default function PetScreen() {
  const { userStats, petMood } = useAppStore();

  const getCatEmoji = () => {
    switch (petMood.expression) {
      case 'rich':
        return '😎';
      case 'poor':
        return '😿';
      default:
        return '😸';
    }
  };

  const getMoodDescription = () => {
    switch (petMood.expression) {
      case 'rich':
        return 'Rich Mode - Living the dream!';
      case 'poor':
        return 'Poor Mode - Needs help with expenses';
      default:
        return 'Happy Mode - Balanced and content';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Financial Buddy</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.petSection}>
          <Text style={styles.catEmoji}>{getCatEmoji()}</Text>
          <Text style={styles.moodTitle}>
            {petMood.expression === 'rich' ? 'Rich Cat' : 
             petMood.expression === 'poor' ? 'Struggling Cat' : 'Happy Cat'}
          </Text>
          <Text style={styles.moodDescription}>
            {getMoodDescription()}
          </Text>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{userStats.streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>💰</Text>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>${userStats.currentBalance.toFixed(0)}</Text>
              <Text style={styles.statLabel}>Balance</Text>
            </View>
          </View>
        </View>

        <View style={styles.achievementSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          
          <View style={[
            styles.achievementCard,
            userStats.streak >= 7 ? styles.achievementUnlocked : styles.achievementLocked
          ]}>
            <Text style={styles.achievementEmoji}>
              {userStats.streak >= 7 ? '🏆' : '⭐'}
            </Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Week Warrior</Text>
              <Text style={styles.achievementDescription}>
                Track expenses for 7 days straight
              </Text>
            </View>
            {userStats.streak >= 7 && (
              <Text style={styles.achievementStatus}>UNLOCKED</Text>
            )}
          </View>
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
  petSection: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  catEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  moodTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  moodDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  achievementSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  achievementCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementUnlocked: {
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  achievementStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
});