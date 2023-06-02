/* eslint-disable no-new */
import Sortable from 'sortablejs';
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
      txt.addEventListener('focus', () => {
        lists.classList.add('custom-bg');
      });
      txt.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          lists.classList.remove('custom-bg');
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

      const ellipsisContainer = document.createElement('span');
      ellipsisContainer.className = 'ellipsis-container';
      const ellipsis = document.createElement('i');
      ellipsis.className = 'fas fa-ellipsis-v';
      ellipsis.addEventListener('click', (event) => {
        event.preventDefault();
      });

      document.addEventListener('click', (e) => {
        const { target } = e;
        if (target !== txt && target !== lists) {
          lists.classList.remove('custom-bg');
          ellipsis.style = 'display:block';
          close.style = 'display: none';
        }
      });

      lists.addEventListener('click', () => {
        lists.classList.add('custom-bg');
        ellipsis.style = 'display:none';
        close.style = 'display: block';
      });

      ellipsisContainer.appendChild(ellipsis);

      lists.append(child, txt, close, ellipsisContainer);

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

  document
    .getElementById('refresh')
    .addEventListener('click', function reset() {
      const element = this;
      this.classList.add('reset');
      addRemove.reset(todos);
      setTimeout(() => {
        element.classList.remove('reset');
      }, 1000);
      logList();
    });

  let start;
  let end;

  new Sortable(dash, {
    handle: '.ellipsis-container',
    animation: 150,
    onStart(e) {
      const { item } = e;
      const items = Array.from(dash.children);
      start = items.indexOf(item);
    },
    onEnd(e) {
      const { item } = e;
      const items = Array.from(dash.children);
      end = items.indexOf(item);
      addRemove.order(start, end);
    },
  });
};

logList();
