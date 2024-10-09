import { TimerMinutes } from "../timerJS/Timer/Timer.js";

let numOfTasks;

const btn = document.querySelector(".btn");
const list = document.querySelector(".list");

function addListItem(e) {
  if (
    e.key === "Enter" ||
    e.pointerType === "mouse" ||
    e.pointerType === "touch"
  ) {
    const task = document.querySelector(".task");

    if (list.childNodes.length === 0) numOfTasks = 0;
    else {
      numOfTasks = Number(list.lastChild.dataset.id);
    }

    if (task.value !== "") {
      const timer = new TimerMinutes();
      const timerDiv = document.createElement("div");
      timerDiv.classList.add("timer");
      const addedTask = document.createElement("div");
      addedTask.classList.add("element");
      addedTask.dataset.id = numOfTasks + 1;
      addedTask.innerHTML = `<p class="element-title">${task.value}</p>
                            <div class="done"><i class="fa-regular fa-square-check"></i></div>
                            <div class="delete"><i class="fa-regular fa-trash-can"></i></div>`;

      addedTask.append(timerDiv);
      timer.addTimer(timerDiv);

      list.appendChild(addedTask);

      const obTask = {
        id: addedTask.dataset.id,
        value: task.value,
        timer: "---",
      };
      sendItemToBackend(obTask);
    }

    task.value = "";
  }
}

window.addEventListener("load", (e) => {
  getItemsFromBackend().then(({ todoList }) => {
    todoList.forEach((el) => {
      const timer = new TimerMinutes(el.timer);
      const timerDiv = document.createElement("div");
      timerDiv.classList.add("timer");
      const addedTask = document.createElement("div");
      addedTask.classList.add("element");

      addedTask.dataset.id = el.id;
      addedTask.innerHTML = `<p class="element-title">${el.value}</p>
                            <div class="done"><i class="fa-regular fa-square-check"></i></div>
                            <div class="delete"><i class="fa-regular fa-trash-can"></i></div>`;

      if (el.completed)
        addedTask.querySelector(".element-title").classList.add("checked");

      addedTask.append(timerDiv);
      timer.addTimer(timerDiv);

      list.appendChild(addedTask);

      const timerText = addedTask.querySelector(".timerJS-time");
      timerText.textContent = el.timer;
    });
  });
});

window.addEventListener("keydown", addListItem);
btn.addEventListener("click", addListItem);

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.closest(".element").remove();
    const removedEl = e.target.closest(".element").dataset.id;
    removeItemFromBackend(removedEl);
  }

  if (e.target.classList.contains("done")) {
    const patchedElement = e.target.closest(".element");
    const patchedText = patchedElement.querySelector(".element-title");

    if (patchedText.classList.contains("checked")) {
      patchedText.classList.remove("checked");
      patchItemToBackend({
        id: patchedElement.dataset.id,
        completed: false,
      });
    } else {
      patchedText.classList.add("checked");
      patchItemToBackend({
        id: patchedElement.dataset.id,
        completed: true,
      });
    }
  }

  if (e.target.classList.contains("timerJS-start")) {
    const patchedElement = e.target.closest(".element");
    // document.querySelector(".active").classList.remove("active");

    if (
      patchedElement.querySelector(".timerJS-start").textContent === "Start"
    ) {
      const timerText = patchedElement.querySelector(".timerJS-time");
      patchItemToBackend({
        id: patchedElement.dataset.id,
        timer: timerText.textContent,
      });
    }
  }

  if (e.target.classList.contains("timerJS-reset")) {
    const patchedElement = e.target.closest(".element");

    const timerText = patchedElement.querySelector(".timerJS-time");
    patchItemToBackend({
      id: patchedElement.dataset.id,
      timer: timerText.textContent,
    });
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
