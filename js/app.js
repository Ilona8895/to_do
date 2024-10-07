let numOfTasks;

const btn = document.querySelector(".btn");
const list = document.querySelector(".list");

function addListItem(e) {
  // console.log(e);
  if (e.key === "Enter" || e.pointerType === "mouse") {
    const task = document.querySelector(".task");

    if (list.childNodes.length === 0) numOfTasks = 0;
    else {
      numOfTasks = Number(list.lastChild.dataset.id);
    }

    if (task.value !== "") {
      const addedTask = document.createElement("div");
      addedTask.classList.add("element");
      addedTask.dataset.id = numOfTasks + 1;
      addedTask.innerHTML = `<p class="element-title">${task.value}</p>
              <button class="delete">Delete</button>
              <button class="done">Done</button>`;

      list.appendChild(addedTask);

      const obTask = { id: addedTask.dataset.id, value: task.value };
      sendItemToBackend(obTask);
    }

    task.value = "";
  }
}

function addListItemMobile(e) {
  // console.log(e);

  const task = document.querySelector(".task");

  if (list.childNodes.length === 0) numOfTasks = 0;
  else {
    numOfTasks = Number(list.lastChild.dataset.id);
  }

  if (task.value !== "") {
    const addedTask = document.createElement("div");
    addedTask.classList.add("element");
    addedTask.dataset.id = numOfTasks + 1;
    addedTask.innerHTML = `<p class="element-title">${task.value}</p>
              <button class="delete">Delete</button>
              <button class="done">Done</button>`;

    list.appendChild(addedTask);

    const obTask = { id: addedTask.dataset.id, value: task.value };
    sendItemToBackend(obTask);
  }

  task.value = "";
}

window.addEventListener("load", (e) => {
  getItemsFromBackend().then(({ todoList }) => {
    // console.log(todoList);

    todoList.forEach((el) => {
      const addedTask = document.createElement("div");
      addedTask.classList.add("element");
      if (el.completed) addedTask.classList.add("checked");
      addedTask.dataset.id = el.id;
      addedTask.innerHTML = `<p class="element-title">${el.value}</p>
		<button class="delete">Delete</button>
    <button class="done">Done</button>`;
      list.appendChild(addedTask);
    });
  });
});

window.addEventListener("keydown", addListItem);
btn.addEventListener("click", addListItem);
btn.addEventListener("touchend", addListItemMobile);

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.closest(".element").remove();
    const removedEl = e.target.closest(".element").dataset.id;
    removeItemFromBackend(removedEl);
  }

  if (e.target.classList.contains("done")) {
    const patchedElement = e.target.closest(".element");
    if (patchedElement.classList.contains("checked")) {
      patchedElement.classList.remove("checked");
      patchItemToBackend({
        id: patchedElement.dataset.id,
        completed: false,
      });
    } else {
      patchedElement.classList.add("checked");
      patchItemToBackend({
        id: patchedElement.dataset.id,
        completed: true,
      });
    }
  }
});

list.addEventListener("dblclick", (e) => {
  if (e.target.classList.contains("element-title")) {
    e.target.style.display = "none";
    const editElement = document.createElement("input");
    editElement.value = e.target.textContent;
    editElement.classList.add("edit");
    editElement.classList.add("element-title");
    editElement.classList.add("focus");

    e.target.after(editElement);
    editElement.focus();
  }
});

window.addEventListener("click", (e) => {
  if (!e.target.classList.contains("edit")) {
    const editTask = document.querySelector(".edit");
    if (editTask) {
      const patchedElement = editTask.closest(".element").dataset.id;
      patchItemToBackend({ id: patchedElement, value: editTask.value });
      editTask.previousElementSibling.textContent = editTask.value;
      editTask.previousElementSibling.style.display = "block";
      editTask.remove();
    }
  }
});
