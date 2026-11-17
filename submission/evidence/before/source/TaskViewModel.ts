import { useState } from 'react';

import { Task, TaskPriority } from '../../domain/models/Task';
import { initialTasks } from '../../data/repositories/initialTasks';

export type TaskFilter = 'all' | TaskPriority;

export const taskFilters: TaskFilter[] = ['all', 'high', 'medium', 'low'];

export function filterTasksByPriority(tasks: Task[], filter: TaskFilter) {
  return filter === 'all'
    ? tasks
    : tasks.filter(task => task.priority === filter);
}

export function useTaskViewModel() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedFilter, setSelectedFilter] = useState<TaskFilter>('all');

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  return {
    tasks: filterTasksByPriority(tasks, selectedFilter),
    selectedFilter,
    setSelectedFilter,
    toggleTaskCompletion,
  };
}
