import AddRemove from './add-remove';
import Lists from './lists';
const addRemove = new AddRemove();

describe('test add-remove', () => {
  const item = new Lists('task1', false, 0);
  it('testing add', () => {
    addRemove.add(item);
    expect(addRemove.items).toHaveLength(1);
  });

  it('testing remove', () => {
    addRemove.remove(item);
    expect(addRemove.items).toHaveLength(0);
  });
});
