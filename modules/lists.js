export default class Lists {
  constructor(task, isDone, index = 0) {
    this.task = task;
    this.isDone = isDone;
    this.index = index;
    this.id = new Date().getTime();
  }

  newTask(task) {
    this.task = task;
  }

  done(isDone) {
    this.isDone = isDone;
  }

  newIndex(index) {
    this.index = index;
  }
}
