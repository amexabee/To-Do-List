import AddRemove from '../modules/add-remove';
import Lists from '../modules/lists';
import './style.css';

const addRemove = new AddRemove();
const checked = 'list-group-item d-flex align-items-center border-bottom';
const unchecked = 'list-group-item d-flex align-items-center border-bottom';

const todos = [
  { task: ' a basic todo list app' },
  { task: 'made with ❤️ by Amanuel' },
  { task: '——— enjoy 🔥 ———' },
];

const logList = () => {
  if (!JSON.parse(localStorage.getItem('ToDoList'))) {
    todos.forEach((todo) => {
      addRemove.add(new Lists(todo.task, true));
    });
  }

  const dash = document.getElementById('dashboard');
  dash.innerHTML = '';
  addRemove.items
    .sort((a, b) => a.index - b.index)
    .forEach((item) => {
      const lists = document.createElement('li');
      lists.className = item.isDone ? checked : unchecked;

      const old = { ...item };

      const child = document.createElement('input');
      child.type = 'checkbox';
      child.name = 'name';
      child.className = 'form-check-input';
      child.style.marginRight = '12px';
      child.checked = item.isDone;

      child.addEventListener('change', (event) => {
        lists.className = item.isDone ? unchecked : checked;
        event.target.nextElementSibling.className = item.isDone ? '' : 'cancel';
        item.isDone = !item.isDone;
        addRemove.edit(old, item);
      });

      const txt = document.createElement('span');
      txt.setAttribute('contenteditable', 'true');
      txt.appendChild(document.createTextNode(item.task));
      txt.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          txt.setAttribute('contenteditable', 'false');
          txt.setAttribute('contenteditable', 'true');
          item.task = txt.innerText;
          addRemove.edit(old, item);
        }
      });

      const close = document.createElement('span');
      close.className = 'fa fa-trash-o close';
      close.addEventListener('click', (e) => {
        e.preventDefault();
        addRemove.remove(item);
        logList();
      });

      const ellipsis = document.createElement('span');
      ellipsis.className = 'fas fa-ellipsis-v';
      ellipsis.addEventListener('click', (event) => {
        event.preventDefault();
        ellipsis.style = 'display:none';
        close.style = 'display: block';
      });

      lists.append(child, txt, close, ellipsis);

      dash.appendChild(lists);
    });

  document.getElementById('task').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const item = document.getElementById('task').value;
      event.preventDefault();
      if (item.length > 0) {
        addRemove.add(new Lists(item, false, 0));
        document.getElementById('task').value = '';
        logList();
      }
    }
  });

  document.getElementById('complete').addEventListener('click', (event) => {
    event.preventDefault();
    addRemove.clear();
    logList();
  });

  document.getElementById('refresh').addEventListener('click', function () {
    let element = this;
    this.classList.add('reset');
    addRemove.reset(todos);
    setTimeout(function () {
      element.classList.remove('reset');
    }, 1000);
    logList();
  });
};

logList();
