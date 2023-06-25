import AddRemove from './add-remove';
import Lists from './lists';

const addRemove = new AddRemove();

describe('test add-remove', () => {
  const item = new Lists('task1', false);
  it('testing add', () => {
    addRemove.add(item);
    expect(addRemove.items).toHaveLength(1);
  });

  it('testing remove', () => {
    addRemove.remove(item);
    expect(addRemove.items).toHaveLength(0);
  });

  test('should add an item to the items array and store it in local storage', () => {
    const item = new Lists('My task', false);
    addRemove.add(item);

    expect(addRemove.items.length).toBe(1);
    expect(addRemove.items[0]).toEqual(item);

    const storedItems = JSON.parse(localStorage.getItem('ToDoList'));
    expect(storedItems.length).toBe(1);
    expect(storedItems[0]).toEqual(item);
  });

  test('should edit an item in the items array and update it in local storage', () => {
    const item1 = new Lists('Task 1', false);
    const item2 = new Lists('Task 2', true);
    addRemove.items = [item1, item2];
    addRemove.edit(item1, new Lists('Updated Task', true));

    expect(addRemove.items.length).toBe(2);
    expect(addRemove.items[0].task).toBe('Updated Task');

    const storedItems = JSON.parse(localStorage.getItem('ToDoList'));
    expect(storedItems.length).toBe(2);
    expect(storedItems[0].task).toBe('Updated Task');
  });

  test('should clear completed items from the items array and update local storage', () => {
    const item1 = new Lists('Task 1', true);
    const item2 = new Lists('Task 2', false);
    const item3 = new Lists('Task 3', true);
    addRemove.items = [item1, item2, item3];
    addRemove.clear();

    expect(addRemove.items.length).toBe(1);
    expect(addRemove.items[0]).toEqual(item2);

    const storedItems = JSON.parse(localStorage.getItem('ToDoList'));
    expect(storedItems.length).toBe(1);
    expect(storedItems[0]).toEqual(item2);
  });

  test('should reset items array with new tasks and update local storage', () => {
    const todos = [{ task: 'Task 1' }, { task: 'Task 2' }, { task: 'Task 3' }];
    addRemove.reset(todos);

    expect(addRemove.items.length).toBe(3);
    expect(addRemove.items[0].task).toBe('Task 1');
    expect(addRemove.items[1].task).toBe('Task 2');
    expect(addRemove.items[2].task).toBe('Task 3');

    const storedItems = JSON.parse(localStorage.getItem('ToDoList'));
    expect(storedItems.length).toBe(3);
    expect(storedItems[0].task).toBe('Task 1');
    expect(storedItems[1].task).toBe('Task 2');
    expect(storedItems[2].task).toBe('Task 3');
  });

  test('should remove an item from the items array and update local storage', () => {
    const item1 = new Lists('Task 1', false);
    const item2 = new Lists('Task 2', false);
    const item3 = new Lists('Task 3', false);
    addRemove.items = [item1, item2, item3];
    addRemove.remove(item2);

    expect(addRemove.items.length).toBe(2);
    expect(addRemove.items[0]).toEqual(item1);
    expect(addRemove.items[1]).toEqual(item3);

    const storedItems = JSON.parse(localStorage.getItem('ToDoList'));
    expect(storedItems.length).toBe(2);
    expect(storedItems[0]).toEqual(item1);
    expect(storedItems[1]).toEqual(item3);
  });

  test('should swap the positions of two items in the items array and update local storage', () => {
    const item1 = new Lists('Task 1', false);
    const item2 = new Lists('Task 2', false);
    const item3 = new Lists('Task 3', false);
    addRemove.items = [item1, item2, item3];
    addRemove.order(0, 2);

    expect(addRemove.items.length).toBe(3);
    expect(addRemove.items[0]).toEqual(item3);
    expect(addRemove.items[2]).toEqual(item1);

    const storedItems = JSON.parse(localStorage.getItem('ToDoList'));
    expect(storedItems.length).toBe(3);
    expect(storedItems[0]).toEqual(item3);
    expect(storedItems[2]).toEqual(item1);
  });

  test('should store the items array in local storage', () => {
    const item1 = new Lists('Task 1', false);
    const item2 = new Lists('Task 2', false);
    addRemove.items = [item1, item2];
    addRemove.store();

    const storedItems = JSON.parse(localStorage.getItem('ToDoList'));
    expect(storedItems.length).toBe(2);
    expect(storedItems[0]).toEqual(item1);
    expect(storedItems[1]).toEqual(item2);
  });
});
