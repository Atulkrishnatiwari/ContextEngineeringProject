import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { Task } from '../../domain/models/Task';
import { taskFilters, useTaskViewModel } from '../viewmodels/TaskViewModel';

const filterLabels = {
  all: 'All',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

function TaskItem({ task, onToggle }: { task: Task; onToggle: () => void }) {
  return (
    <Pressable
      testID={`task-${task.id}`}
      style={styles.task}
      onPress={onToggle}
    >
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, task.isCompleted && styles.completed]}>
          {task.title}
        </Text>

        <Text style={styles.priority}>
          Priority: {task.priority.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.status}>
        {task.isCompleted ? 'Completed' : 'Pending'}
      </Text>
    </Pressable>
  );
}

export default function TaskScreen() {
  const { tasks, selectedFilter, setSelectedFilter, toggleTaskCompletion } =
    useTaskViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Tasks</Text>

      <Text style={styles.subtitle}>
        Tap a task to change its completion status.
      </Text>

      <View style={styles.filters}>
        {taskFilters.map(filter => {
          const isSelected = filter === selectedFilter;
          return (
            <Pressable
              key={filter}
              testID={`filter-${filter}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              style={[styles.filter, isSelected && styles.filterSelected]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  isSelected && styles.filterTextSelected,
                ]}
              >
                {filterLabels[filter]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text testID="empty-state" style={styles.empty}>
            {selectedFilter === 'all'
              ? 'No tasks yet.'
              : `No ${filterLabels[
                  selectedFilter
                ].toLowerCase()} priority tasks.`}
          </Text>
        }
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => toggleTaskCompletion(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#172554',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    color: '#64748B',
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filter: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
  },
  filterSelected: {
    backgroundColor: '#2563EB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    color: '#64748B',
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  priority: {
    marginTop: 6,
    fontSize: 12,
    color: '#64748B',
  },
  status: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
});
