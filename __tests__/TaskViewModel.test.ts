/**
 * @format
 */

import { Task } from '../src/features/tasks/domain/models/Task';
import { filterTasksByPriority } from '../src/features/tasks/presentation/viewmodels/TaskViewModel';

const tasks: Task[] = [
  { id: '1', title: 'High task', priority: 'high', isCompleted: false },
  { id: '2', title: 'Medium task', priority: 'medium', isCompleted: false },
  { id: '3', title: 'Low task', priority: 'low', isCompleted: true },
  { id: '4', title: 'Another high', priority: 'high', isCompleted: false },
];

const ids = (list: Task[]) => list.map(task => task.id);

describe('filterTasksByPriority', () => {
  test('all returns every task', () => {
    expect(ids(filterTasksByPriority(tasks, 'all'))).toEqual([
      '1',
      '2',
      '3',
      '4',
    ]);
  });

  test('high returns only high priority tasks', () => {
    expect(ids(filterTasksByPriority(tasks, 'high'))).toEqual(['1', '4']);
  });

  test('medium returns only medium priority tasks', () => {
    expect(ids(filterTasksByPriority(tasks, 'medium'))).toEqual(['2']);
  });

  test('low returns only low priority tasks', () => {
    expect(ids(filterTasksByPriority(tasks, 'low'))).toEqual(['3']);
  });

  test('returns an empty list when no task matches', () => {
    const highOnly = tasks.filter(task => task.priority === 'high');
    expect(filterTasksByPriority(highOnly, 'low')).toEqual([]);
  });
});
