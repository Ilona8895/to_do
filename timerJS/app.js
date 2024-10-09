import Timer from "./Timer/Timer.js";

//create new timer object and insert it in html element
const timerTest = new Timer();
const divTimer = document.querySelector(".timer");
timerTest.addTimer(divTimer);

const timestampList = document.querySelector(".timestamps > ul");
const start = document.querySelector(".timerJS-start");
const reset = document.querySelector(".timerJS-reset");
let timeSArr;

start.addEventListener("click", (e) => {
  if (e.target.textContent === "Start") {
    timeSArr = timerTest.timestampArray;
    const timestamp = document.createElement("li");
    timestampList.appendChild(timestamp);
    timestamp.textContent = timeSArr[timeSArr.length - 1];
  }
});

reset.addEventListener("click", (e) => {
  const timestamps = document.querySelectorAll(".timestamps > ul > li");
  timestamps.forEach((el) => {
    el.remove();
  });
});
