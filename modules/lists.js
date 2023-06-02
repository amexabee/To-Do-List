import { v4 as uuidv4 } from 'uuid';

export default class Lists {
  constructor(task, isDone) {
    this.task = task;
    this.isDone = isDone;
    this.id = uuidv4();
  }
}
