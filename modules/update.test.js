import Updates from './updates';
import Lists from './lists';

const update = new Updates();

describe('test', () => {
  it('testing edit', () => {
    const event = { currentTarget: { checked: false } };
    const item = new Lists('task1', false, 0);
    const newItem = new Lists('task2', false, 0);
    update.addRemove.add(item);
    update.update(event, newItem);
    expect(update.addRemove.items[0].task).toBe('task2');
  });

  it('testing clear all', () => {
    const item = new Lists('task3', true, 1);
    update.addRemove.add(item);
    update.addRemove.clear();
    expect(update.addRemove.items).toHaveLength(1);
  });

  it('testing status', () => {
    update.addRemove.items[0].done(true);
    expect(update.addRemove.items[0].isDone).toBe(true);
  });
});
