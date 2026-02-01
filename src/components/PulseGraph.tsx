import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS } from '../utils/constants';

const screenWidth = Dimensions.get('window').width;

interface Props {
  currentMonthSpending: number[];
  previousMonthSpending: number[];
  isImproving: boolean;
}

export function PulseGraph({ currentMonthSpending, previousMonthSpending, isImproving }: Props) {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: currentMonthSpending,
        color: () => isImproving ? COLORS.primary : COLORS.danger,
        strokeWidth: 3,
      },
      {
        data: previousMonthSpending,
        color: () => COLORS.textLight,
        strokeWidth: 2,
      },
    ],
    legend: ['This Month', 'Last Month'],
  };

  const chartConfig = {
    backgroundColor: COLORS.background,
    backgroundGradientFrom: COLORS.surface,
    backgroundGradientTo: COLORS.background,
    decimalPlaces: 0,
    color: (opacity = 1) => isImproving 
      ? `rgba(16, 185, 129, ${opacity})` 
      : `rgba(236, 72, 153, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: isImproving ? COLORS.primary : COLORS.danger,
    },
    fillShadowGradient: isImproving ? COLORS.primary : COLORS.danger,
    fillShadowGradientOpacity: 0.1,
  };

  return (
    <View className="bg-white rounded-xl p-4 mx-4 shadow-sm">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-neutral-800">
          Financial Heartbeat
        </Text>
        <View className={`px-3 py-1 rounded-full ${
          isImproving ? 'bg-primary-100' : 'bg-danger-100'
        }`}>
          <Text className={`text-xs font-medium ${
            isImproving ? 'text-primary-600' : 'text-danger-600'
          }`}>
            {isImproving ? '📈 Improving' : '📉 Watch Out'}
          </Text>
        </View>
      </View>
      
      <LineChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={{
          borderRadius: 12,
        }}
        withInnerLines={false}
        withOuterLines={false}
        withShadow={false}
      />
      
      <Text className="text-sm text-neutral-600 mt-3 text-center">
        {isImproving 
          ? 'Great job! You\'re spending less than last month.'
          : 'Your spending is higher than last month. Consider reviewing your budget.'
        }
      </Text>
    </View>
  );
}