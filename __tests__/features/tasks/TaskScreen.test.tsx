/**
 * @format
 */

import React from 'react';
import ReactTestRenderer, {
  ReactTestInstance,
  ReactTestRenderer as Renderer,
} from 'react-test-renderer';

import TaskScreen from '../../../src/features/tasks/presentation/screens/TaskScreen';

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

// Host (string-typed) nodes are rendered once per element, so they give an
// accurate count of what is on screen.
function visibleTaskIds(renderer: Renderer): string[] {
  return renderer.root
    .findAll(
      node =>
        typeof node.type === 'string' &&
        typeof node.props.testID === 'string' &&
        node.props.testID.startsWith('task-item-'),
    )
    .map(node => node.props.testID.replace('task-item-', ''));
}

function findPressable(renderer: Renderer, testID: string): ReactTestInstance {
  return renderer.root.find(
    node =>
      node.props.testID === testID && typeof node.props.onPress === 'function',
  );
}

async function press(renderer: Renderer, testID: string) {
  await ReactTestRenderer.act(() => {
    findPressable(renderer, testID).props.onPress();
  });
}

function taskStatus(renderer: Renderer, taskId: string): string {
  const item = findPressable(renderer, `task-item-${taskId}`);
  const texts = item
    .findAll(node => String(node.type) === 'Text')
    .map(node => node.props.children);
  return texts[texts.length - 1];
}

function isFilterSelected(renderer: Renderer, filter: string): boolean {
  return Boolean(
    findPressable(renderer, `priority-filter-${filter}`).props
      .accessibilityState?.selected,
  );
}

describe('TaskScreen priority filtering', () => {
  it('shows every task with the "All" filter selected by default', async () => {
    const renderer = await renderScreen();

    expect(isFilterSelected(renderer, 'all')).toBe(true);
    expect(visibleTaskIds(renderer)).toEqual(['1', '2', '3', '4']);
  });

  it('shows only high priority tasks when "High" is selected', async () => {
    const renderer = await renderScreen();

    await press(renderer, 'priority-filter-high');

    expect(isFilterSelected(renderer, 'high')).toBe(true);
    expect(visibleTaskIds(renderer)).toEqual(['1', '4']);
  });

  it('shows only medium priority tasks when "Medium" is selected', async () => {
    const renderer = await renderScreen();

    await press(renderer, 'priority-filter-medium');

    expect(isFilterSelected(renderer, 'medium')).toBe(true);
    expect(visibleTaskIds(renderer)).toEqual(['2']);
  });

  it('shows only low priority tasks when "Low" is selected', async () => {
    const renderer = await renderScreen();

    await press(renderer, 'priority-filter-low');

    expect(isFilterSelected(renderer, 'low')).toBe(true);
    expect(visibleTaskIds(renderer)).toEqual(['3']);
  });

  it('lets the user switch between filters and back to "All"', async () => {
    const renderer = await renderScreen();

    await press(renderer, 'priority-filter-low');
    expect(visibleTaskIds(renderer)).toEqual(['3']);

    await press(renderer, 'priority-filter-high');
    expect(visibleTaskIds(renderer)).toEqual(['1', '4']);
    expect(isFilterSelected(renderer, 'low')).toBe(false);

    await press(renderer, 'priority-filter-all');
    expect(visibleTaskIds(renderer)).toEqual(['1', '2', '3', '4']);
  });

  it('does not show the empty state when tasks match the filter', async () => {
    const renderer = await renderScreen();

    expect(
      renderer.root.findAll(node => node.props.testID === 'task-list-empty'),
    ).toHaveLength(0);
  });
});

describe('TaskScreen task completion', () => {
  it('toggles completion when a task is tapped', async () => {
    const renderer = await renderScreen();

    expect(taskStatus(renderer, '1')).toBe('Pending');

    await press(renderer, 'task-item-1');
    expect(taskStatus(renderer, '1')).toBe('Completed');

    await press(renderer, 'task-item-1');
    expect(taskStatus(renderer, '1')).toBe('Pending');
  });

  it('toggles completion while a filter is active and keeps it after switching filters', async () => {
    const renderer = await renderScreen();

    await press(renderer, 'priority-filter-low');
    expect(taskStatus(renderer, '3')).toBe('Completed');

    await press(renderer, 'task-item-3');
    expect(taskStatus(renderer, '3')).toBe('Pending');
    expect(visibleTaskIds(renderer)).toEqual(['3']);

    await press(renderer, 'priority-filter-all');
    expect(taskStatus(renderer, '3')).toBe('Pending');
    expect(taskStatus(renderer, '1')).toBe('Pending');
  });
});
