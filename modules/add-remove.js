/* eslint-disable class-methods-use-this */
import Lists from './lists';

export default class AddRemove {
  constructor() {
    this.items = [];
    if (JSON.parse(localStorage.getItem('ToDoList'))) {
      JSON.parse(localStorage.getItem('ToDoList')).forEach((element) => {
        this.items.push(Object.assign(new Lists(), element));
      });
    }
  }

  add(item) {
    item.newIndex(this.items.length);
    this.items.push(item);
    this.store();
  }

  edit(item) {
    const index = this.items.findIndex((e) => e.id === item.id);
    this.items[index] = item;
    this.store();
  }

  clear() {
    this.items = this.items.filter((e) => !e.isDone);
    this.setIndex();
    this.store();
  }

  clearAll() {
    this.items = [];
    this.store();
  }

  remove(item) {
    this.items = this.items.filter((e) => e.id !== item.id);
    this.setIndex();
    this.store();
  }

  store() {
    localStorage.setItem('ToDoList', JSON.stringify(this.items));
  }

  // order(a, b) {
  //   return a.id - b.id;
  // }

  setIndex() {
    const sorted = this.items.sort((a, b) => a.id - b.id);
    sorted.forEach((task, index) => {
      task.index = index;
    });
    this.items = sorted;
  }
}
