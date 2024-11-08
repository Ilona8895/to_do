const productionURL = "https://to-do-nodejs-jih7.onrender.com";
const developmentURL = "http://127.0.0.1:8888";

function sendItemToBackend(item) {
  fetch(`${productionURL}/todo`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function getItemsFromBackend() {
  return fetch(`${productionURL}/todo`).then((res) => res.json());
}

function removeItemFromBackend(item) {
  fetch(`${productionURL}/todo/${item}`, {
    method: "DELETE",
  });
}

function patchItemToBackend(update) {
  fetch(`${productionURL}/todo/${update.id}`, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
