/**
 * @format
 */

import React from 'react';
import ReactTestRenderer, {
  ReactTestRenderer as Renderer,
} from 'react-test-renderer';

import TaskScreen from '../../../src/features/tasks/presentation/screens/TaskScreen';

// Replace the seed data with high priority tasks only so the other filters
// have no matching tasks.
jest.mock('../../../src/features/tasks/data/repositories/initialTasks', () => ({
  initialTasks: [
    { id: '1', title: 'Only high task', priority: 'high', isCompleted: false },
  ],
}));

let mounted: Renderer[] = [];

async function renderScreen(): Promise<Renderer> {
  let renderer: Renderer | undefined;
  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<TaskScreen />);
  });
  mounted.push(renderer!);
  return renderer!;
}

// Unmount so FlatList's deferred render timers don't fire after the test ends.
afterEach(async () => {
  await ReactTestRenderer.act(() => {
    mounted.forEach(renderer => renderer.unmount());
  });
  mounted = [];
});

async function selectFilter(renderer: Renderer, filter: string) {
  await ReactTestRenderer.act(() => {
    renderer.root
      .find(
        node =>
          node.props.testID === `priority-filter-${filter}` &&
          typeof node.props.onPress === 'function',
      )
      .props.onPress();
  });
}

function emptyStateText(renderer: Renderer): string | undefined {
  const matches = renderer.root.findAll(
    node =>
      typeof node.type === 'string' && node.props.testID === 'task-list-empty',
  );
  return matches.length ? matches[0].props.children : undefined;
}

function visibleTaskCount(renderer: Renderer): number {
  return renderer.root.findAll(
    node =>
      typeof node.type === 'string' &&
      typeof node.props.testID === 'string' &&
      node.props.testID.startsWith('task-item-'),
  ).length;
}

describe('TaskScreen empty state', () => {
  it('shows an empty state message when no tasks match the selected filter', async () => {
    const renderer = await renderScreen();

    await selectFilter(renderer, 'low');

    expect(visibleTaskCount(renderer)).toBe(0);
    expect(emptyStateText(renderer)).toBe('No Low priority tasks found.');

    await selectFilter(renderer, 'medium');

    expect(visibleTaskCount(renderer)).toBe(0);
    expect(emptyStateText(renderer)).toBe('No Medium priority tasks found.');
  });

  it('hides the empty state again when switching to a filter with matches', async () => {
    const renderer = await renderScreen();

    await selectFilter(renderer, 'low');
    await selectFilter(renderer, 'high');

    expect(visibleTaskCount(renderer)).toBe(1);
    expect(emptyStateText(renderer)).toBeUndefined();
  });
});
