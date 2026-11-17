import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TaskPriorityFilter } from '../../domain/usecases/filterTasksByPriority';

export const PRIORITY_FILTER_OPTIONS: {
  value: TaskPriorityFilter;
  label: string;
}[] = [
  { value: 'all', label: 'All' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

interface PriorityFilterProps {
  selectedFilter: TaskPriorityFilter;
  onSelectFilter: (filter: TaskPriorityFilter) => void;
}

export function PriorityFilter({
  selectedFilter,
  onSelectFilter,
}: PriorityFilterProps) {
  return (
    <View style={styles.container}>
      {PRIORITY_FILTER_OPTIONS.map(option => {
        const isSelected = option.value === selectedFilter;

        return (
          <Pressable
            key={option.value}
            testID={`priority-filter-${option.value}`}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            style={[styles.option, isSelected && styles.selectedOption]}
            onPress={() => onSelectFilter(option.value)}
          >
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
  },
  selectedOption: {
    backgroundColor: '#2563EB',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
});
