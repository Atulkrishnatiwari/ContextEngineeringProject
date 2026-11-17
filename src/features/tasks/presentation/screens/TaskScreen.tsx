import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { Task } from '../../domain/models/Task';
import {
  PRIORITY_FILTER_OPTIONS,
  PriorityFilter,
} from '../components/PriorityFilter';
import { useTaskViewModel } from '../viewmodels/TaskViewModel';

function TaskItem({ task, onToggle }: { task: Task; onToggle: () => void }) {
  return (
    <Pressable
      testID={`task-item-${task.id}`}
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

  const selectedLabel = PRIORITY_FILTER_OPTIONS.find(
    option => option.value === selectedFilter,
  )?.label;

  const emptyMessage =
    selectedFilter === 'all'
      ? 'No tasks yet.'
      : `No ${selectedLabel} priority tasks found.`;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Tasks</Text>

      <Text style={styles.subtitle}>
        Tap a task to change its completion status.
      </Text>

      <PriorityFilter
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => toggleTaskCompletion(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text testID="task-list-empty" style={styles.emptyState}>
            {emptyMessage}
          </Text>
        }
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
  emptyState: {
    marginTop: 32,
    textAlign: 'center',
    color: '#64748B',
  },
  status: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
});
