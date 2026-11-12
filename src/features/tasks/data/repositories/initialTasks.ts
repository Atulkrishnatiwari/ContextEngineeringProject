import { Task } from '../../domain/models/Task';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project setup',
    priority: 'high',
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Review documentation',
    priority: 'medium',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Update app theme',
    priority: 'low',
    isCompleted: true,
  },
  {
    id: '4',
    title: 'Write unit tests',
    priority: 'high',
    isCompleted: false,
  },
];
