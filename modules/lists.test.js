import Lists from './lists';

describe('Lists', () => {
  let lists;
  beforeEach(() => {
    lists = new Lists('My task', false);
  });

  test('should have a task property', () => {
    expect(lists.task).toBe('My task');
  });

  test('should have an isDone property', () => {
    expect(lists.isDone).toBe(false);
  });
});
