import { useMemo, useState } from 'react';

import { Task } from '../../domain/models/Task';
import {
  filterTasksByPriority,
  TaskPriorityFilter,
} from '../../domain/usecases/filterTasksByPriority';
import { initialTasks } from '../../data/repositories/initialTasks';

export function useTaskViewModel() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedFilter, setSelectedFilter] =
    useState<TaskPriorityFilter>('all');

  const filteredTasks = useMemo(
    () => filterTasksByPriority(tasks, selectedFilter),
    [tasks, selectedFilter],
  );

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  return {
    tasks: filteredTasks,
    selectedFilter,
    setSelectedFilter,
    toggleTaskCompletion,
  };
}
