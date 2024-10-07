// const apiUrls = {
//   production: "https://to-do-nodejs-jih7.onrender.com",
//   development: "http://127.0.0.1:8888",
// };

function sendItemToBackend(item) {
  fetch("https://to-do-nodejs-jih7.onrender.com/todo", {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function getItemsFromBackend() {
  return fetch("https://to-do-nodejs-jih7.onrender.com/todo").then((res) =>
    res.json()
  );
}

function removeItemFromBackend(item) {
  fetch(`https://to-do-nodejs-jih7.onrender.com/todo/${item}`, {
    method: "DELETE",
  });
}

function patchItemToBackend(update) {
  fetch(`https://to-do-nodejs-jih7.onrender.com/todo/${update.id}`, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
