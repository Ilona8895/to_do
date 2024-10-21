// const apiUrls = {
//   production: "https://to-do-nodejs-jih7.onrender.com",
//   development: "http://127.0.0.1:8888",
// };

function sendItemToBackend(item) {
  fetch("http://127.0.0.1:8888/todo", {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function getItemsFromBackend() {
  return fetch("http://127.0.0.1:8888/todo").then((res) => res.json());
}

function removeItemFromBackend(item) {
  fetch(`http://127.0.0.1:8888/todo/${item}`, {
    method: "DELETE",
  });
}

function patchItemToBackend(update) {
  fetch(`http://127.0.0.1:8888/todo/${update.id}`, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
