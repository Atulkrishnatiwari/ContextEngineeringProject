import { Task, TaskPriority } from '../models/Task';

export type TaskPriorityFilter = 'all' | TaskPriority;

export function filterTasksByPriority(
  tasks: Task[],
  filter: TaskPriorityFilter,
): Task[] {
  if (filter === 'all') {
    return tasks;
  }

  return tasks.filter(task => task.priority === filter);
}
