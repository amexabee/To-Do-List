import Lists from './lists';

export default class AddRemove {
  constructor() {
    this.items = [];

    if (JSON.parse(localStorage.getItem('ToDoList'))) {
      JSON.parse(localStorage.getItem('ToDoList')).forEach((item) => {
        this.items.push({ ...item });
      });
    }
  }

  add(item) {
    this.items.push(item);
    this.store();
  }

  edit(old, item) {
    const index = this.items.findIndex((i) => i.id === old.id);
    this.items[index] = item;
    this.store();
  }

  clear() {
    this.items = this.items.filter((e) => !e.isDone);
    this.store();
  }

  reset(todos) {
    this.items = [];
    todos.forEach((todo) => {
      this.add(new Lists(todo.task, true));
    });
    this.store();
  }

  remove(item) {
    this.items = this.items.filter((e) => e.id !== item.id);
    this.store();
  }

  order(start, end) {
    const temp = this.items[start];
    this.items[start] = this.items[end];
    this.items[end] = temp;
    this.store();
  }

  store() {
    localStorage.setItem('ToDoList', JSON.stringify(this.items));
  }
}
