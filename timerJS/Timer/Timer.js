export class Timer {
  constructor(startTime, start = "Start", reset = "Reset", timeText = "---") {
    this.startButton = document.createElement("button");
    this.resetButton = document.createElement("button");
    this.timeStartText = document.createElement("span");

    this.startButton.textContent = start;
    this.startButton.classList.add("timerJS-start");

    this.resetButton.textContent = reset;
    this.resetButton.classList.add("timerJS-reset");

    this.timeStartText.textContent = timeText;
    this.timeStartText.classList.add("timerJS-time");

    if (startTime !== undefined && startTime.includes(".")) {
      this.startTime = startTime.split(".");
      this.storedSec = Number(this.startTime[0]);
      this.storedmiliSec = Number(this.startTime[1]);
    } else {
      this.storedSec = 0;
      this.storedmiliSec = 0;
    }

    this.timestampArray = [];
    this.#launchTimer();
  }

  addTimer(htmlElement) {
    htmlElement.appendChild(this.startButton);
    htmlElement.appendChild(this.resetButton);
    htmlElement.appendChild(this.timeStartText);
  }

  #launchTimer() {
    let counterSec = this.storedSec;
    let counterMilisec = this.storedmiliSec;

    let timer;

    function startTimer(placeTimer) {
      counterSec += 0.01;

      if (counterMilisec === 99) counterMilisec = 0;
      counterMilisec++;

      if (counterMilisec < 10) counterMilisec = "0" + counterMilisec;
      placeTimer.textContent = `${parseInt(counterSec)}.${counterMilisec}`;
    }

    this.startButton.addEventListener("click", (e) => {
      if (e.target.classList.contains("active")) {
        e.target.classList.remove("active");
        e.target.textContent = "Start";
        this.timestampArray.push(this.timeStartText.textContent);
        clearInterval(timer);
      } else {
        e.target.classList.add("active");
        e.target.textContent = "Stop";

        timer = setInterval(startTimer, 10, this.timeStartText);
      }
    });

    this.resetButton.addEventListener("click", (e) => {
      this.timeStartText.textContent = "---";
      this.startButton.classList.remove("active");
      clearInterval(timer);
      counterSec = 0;
      counterMilisec = 0;
      this.timestampArray.length = 0;
    });
  }
}

export class TimerMinutes extends Timer {
  constructor(startTime, start = "Start", reset = "Reset", timeText = "---") {
    super(startTime, start, reset, timeText);

    this.startButton = document.createElement("button");
    this.resetButton = document.createElement("button");
    this.timeStartText = document.createElement("span");

    this.startButton.textContent = start;
    this.startButton.classList.add("timerJS-start");

    this.resetButton.textContent = reset;
    this.resetButton.classList.add("timerJS-reset");

    this.timeStartText.textContent = timeText;
    this.timeStartText.classList.add("timerJS-time");

    if (startTime !== undefined && startTime.includes(":")) {
      this.startTime = startTime;
      this.startTime = this.#convertStartTime(startTime);
    } else {
      this.startTime = 0;
    }

    this.timestampArray = [];
    this.#launchTimer();
  }

  #convertStartTime(time) {
    const splitMinutes = time.split(":");
    let minutes = splitMinutes[0] * 60000;
    let seconds = splitMinutes[1] * 1000;

    return minutes + seconds;
  }

  #launchTimer() {
    let initialTime = Date.now();
    let timer;

    function checkTime(placeTimer, startTime) {
      let timeDifference = Date.now() + startTime - initialTime;
      let formatted = convertTime(timeDifference);
      placeTimer.textContent = "" + formatted;
    }

    function convertTime(miliseconds) {
      let totalSeconds = Math.floor(miliseconds / 1000);
      let minutes = Math.floor(totalSeconds / 60);
      if (minutes < 10) minutes = "0" + minutes;
      let seconds = totalSeconds - minutes * 60;
      if (seconds < 10) seconds = "0" + seconds;
      return minutes + ":" + seconds;
    }

    this.startButton.addEventListener("click", (e) => {
      if (e.target.classList.contains("active")) {
        e.target.classList.remove("active");
        e.target.textContent = "Start";
        this.timestampArray.push(this.timeStartText.textContent);
        clearInterval(timer);
      } else {
        e.target.classList.add("active");
        e.target.textContent = "Stop";
        timer = setInterval(checkTime, 10, this.timeStartText, this.startTime);
      }
    });

    this.resetButton.addEventListener("click", (e) => {
      this.timeStartText.textContent = "---";
      this.startButton.classList.remove("active");
      clearInterval(timer);
      initialTime = Date.now();
      this.timestampArray.length = 0;
    });
  }
}
