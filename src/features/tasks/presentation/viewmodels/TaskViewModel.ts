import { useState } from 'react';

import { Task } from '../../domain/models/Task';
import { initialTasks } from '../../data/repositories/initialTasks';

export function useTaskViewModel() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  return {
    tasks,
    toggleTaskCompletion,
  };
}
