import { Task } from '../../../src/features/tasks/domain/models/Task';
import { filterTasksByPriority } from '../../../src/features/tasks/domain/usecases/filterTasksByPriority';

const tasks: Task[] = [
  { id: '1', title: 'High A', priority: 'high', isCompleted: false },
  { id: '2', title: 'Medium A', priority: 'medium', isCompleted: true },
  { id: '3', title: 'Low A', priority: 'low', isCompleted: false },
  { id: '4', title: 'High B', priority: 'high', isCompleted: true },
];

const ids = (list: Task[]) => list.map(task => task.id);

describe('filterTasksByPriority', () => {
  it('returns every task for the "all" filter', () => {
    expect(ids(filterTasksByPriority(tasks, 'all'))).toEqual([
      '1',
      '2',
      '3',
      '4',
    ]);
  });

  it('returns only high priority tasks for the "high" filter', () => {
    expect(ids(filterTasksByPriority(tasks, 'high'))).toEqual(['1', '4']);
  });

  it('returns only medium priority tasks for the "medium" filter', () => {
    expect(ids(filterTasksByPriority(tasks, 'medium'))).toEqual(['2']);
  });

  it('returns only low priority tasks for the "low" filter', () => {
    expect(ids(filterTasksByPriority(tasks, 'low'))).toEqual(['3']);
  });

  it('returns an empty list when no task matches the filter', () => {
    const highOnly = tasks.filter(task => task.priority === 'high');

    expect(filterTasksByPriority(highOnly, 'low')).toEqual([]);
    expect(filterTasksByPriority([], 'all')).toEqual([]);
  });

  it('does not mutate the input list', () => {
    const snapshot = tasks.map(task => ({ ...task }));

    filterTasksByPriority(tasks, 'medium');

    expect(tasks).toEqual(snapshot);
  });
});
