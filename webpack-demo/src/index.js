import './style.css';

const lists = [];
const registry = () => {
  const first = { task: 'Task 1', isDone: false, index: 0 };
  lists.push(first);

  const second = { task: 'Task 2', isDone: false, index: 1 };
  lists.push(second);

  const third = { task: 'Task 3', isDone: false, index: 2 };
  lists.push(third);
};
const order = (current, next) => current.index - next.index;

const logLists = () => {
  const myList = document.getElementById('myList');
  const ordered = lists.sort(order);
  ordered.forEach((list) => {
    const child = document.createElement('li');
    child.className = 'list-group-item d-flex justify-content-between';

    const myInput = document.createElement('input');
    myInput.type = 'checkbox';
    myInput.name = 'name';

    myInput.className = 'form-check-input pull-left';
    myInput.style.marginRight = '12px';
    myInput.checked = list.isDone;

    const section = document.createElement('section');
    section.className = 'fas fa-ellipsis-v pull-right';
    child.appendChild(myInput);
    child.appendChild(document.createTextNode(list.task));
    child.appendChild(section);
    myList.appendChild(child);
  });
};
registry();
logLists();
