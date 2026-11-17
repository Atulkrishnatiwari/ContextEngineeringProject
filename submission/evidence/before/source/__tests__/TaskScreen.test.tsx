/**
 * @format
 */

import React from 'react';
import ReactTestRenderer, { ReactTestInstance } from 'react-test-renderer';
import TaskScreen from '../src/features/tasks/presentation/screens/TaskScreen';

let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  ReactTestRenderer.act(() => {
    renderer?.unmount();
  });
  renderer = undefined;
  jest.useRealTimers();
});

function renderScreen() {
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<TaskScreen />);
  });
  return renderer!.root;
}

function hostNodes(root: ReactTestInstance, prefix: string) {
  return root.findAll(
    node =>
      typeof node.type === 'string' &&
      typeof node.props.testID === 'string' &&
      node.props.testID.startsWith(prefix),
  );
}

function visibleTaskIds(root: ReactTestInstance) {
  return hostNodes(root, 'task-').map(node => node.props.testID);
}

function press(root: ReactTestInstance, testID: string) {
  const [node] = root.findAll(
    n => n.props.testID === testID && typeof n.props.onPress === 'function',
  );
  ReactTestRenderer.act(() => {
    node.props.onPress();
  });
}

function textOf(node: ReactTestInstance): string {
  return node.children
    .map(child => (typeof child === 'string' ? child : textOf(child)))
    .join('');
}

describe('TaskScreen priority filtering', () => {
  test('shows all tasks by default', () => {
    const root = renderScreen();
    expect(visibleTaskIds(root)).toEqual([
      'task-1',
      'task-2',
      'task-3',
      'task-4',
    ]);
  });

  test('switches between filters', () => {
    const root = renderScreen();

    press(root, 'filter-high');
    expect(visibleTaskIds(root)).toEqual(['task-1', 'task-4']);

    press(root, 'filter-medium');
    expect(visibleTaskIds(root)).toEqual(['task-2']);

    press(root, 'filter-low');
    expect(visibleTaskIds(root)).toEqual(['task-3']);

    press(root, 'filter-all');
    expect(visibleTaskIds(root)).toEqual([
      'task-1',
      'task-2',
      'task-3',
      'task-4',
    ]);
    expect(hostNodes(root, 'empty-state')).toHaveLength(0);
  });

  test('toggles task completion while a filter is active', () => {
    const root = renderScreen();

    press(root, 'filter-high');
    const [task] = hostNodes(root, 'task-1');
    expect(textOf(task)).toContain('Pending');

    press(root, 'task-1');
    expect(textOf(hostNodes(root, 'task-1')[0])).toContain('Completed');

    press(root, 'filter-all');
    expect(textOf(hostNodes(root, 'task-1')[0])).toContain('Completed');

    press(root, 'task-1');
    expect(textOf(hostNodes(root, 'task-1')[0])).toContain('Pending');
  });
});
