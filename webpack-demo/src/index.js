import "./style.css";

const lists = [];
const registry = () => {
  const first = { task: "Task 1", isDone: false, index: 0 };
  lists.push(first);

  const second = { task: "Task 2", isDone: false, index: 1 };
  lists.push(second);

  const third = { task: "Task 3", isDone: false, index: 2 };
  lists.push(third);
};
const order = (a, b) => a.index - b.index;

const logItems = () => {
  const myList = document.getElementById("myList");
  lists.sort(order).forEach((item) => {
    const child = document.createElement("input");
    child.type = "checkbox";
    child.name = "name";
    child.className = "form-check-input pull-left";
    child.style.marginRight = "12px";
    child.checked = item.isDone;

    const section = document.createElement("section");
    section.className = "fas fa-ellipsis-v pull-right";

    const list = document.createElement("li");
    list.className = "list-group-item d-flex justify-content-between";
    list.appendChild(child);
    list.appendChild(document.createTextNode(item.task));
    list.appendChild(section);
    myList.appendChild(list);
  });
};
registry();
logItems();
