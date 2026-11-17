/**
 * @format
 */

import React from 'react';
import ReactTestRenderer, { ReactTestInstance } from 'react-test-renderer';
import TaskScreen from '../src/features/tasks/presentation/screens/TaskScreen';

jest.mock('../src/features/tasks/data/repositories/initialTasks', () => ({
  initialTasks: [
    { id: '1', title: 'High task', priority: 'high', isCompleted: false },
  ],
}));

function findHost(root: ReactTestInstance, testID: string) {
  return root.findAll(
    node => typeof node.type === 'string' && node.props.testID === testID,
  );
}

function textOf(node: ReactTestInstance): string {
  return node.children
    .map(child => (typeof child === 'string' ? child : textOf(child)))
    .join('');
}

test('shows an empty state when no tasks match the selected filter', () => {
  jest.useFakeTimers();
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<TaskScreen />);
  });
  const root = renderer.root;

  expect(findHost(root, 'empty-state')).toHaveLength(0);

  ReactTestRenderer.act(() => {
    root
      .findAll(n => n.props.testID === 'filter-low' && n.props.onPress)[0]
      .props.onPress();
  });

  expect(findHost(root, 'task-1')).toHaveLength(0);
  const [empty] = findHost(root, 'empty-state');
  expect(textOf(empty)).toBe('No low priority tasks.');

  ReactTestRenderer.act(() => {
    renderer.unmount();
  });
  jest.useRealTimers();
});
