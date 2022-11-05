import AddRemove from './add-remove';

export default class Updates {
  constructor() {
    this.addRemove = new AddRemove();
  }

  update(event, item) {
    if (event.currentTarget.checked) item.done(true);
    else item.done(false);
    this.addRemove.edit(item);
  }
}
