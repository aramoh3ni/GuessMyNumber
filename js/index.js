"use strick";

class GMN {
  constructor() {
    this.guessed = 0;
    this.number = 0;
    this.highScore = 0;
    this.score = 0;
    this.count = 3;
    this.message = {
      toLow: "📉 Too Lower, Insert higher.",
      toHigh: "📈 Too High, Insert lower.",
      win: "🥳 WOW!!! Your Win",
      loss: "You Loss 😒, Try again! 🙂",
      rematch: "Start New Match 🦾, number bettwen 1️⃣ & 2️⃣",
      invalidInput: "Sorry! Invalid Number 💥",
      numberHigherOrLower: "Sorry! Number should be between 1️⃣ & 2️⃣",
    };
    this.background = {
      warn: "rgba(245, 241, 18, 0.904)",
      warn2: "rgba(245, 71, 18, 0.904",
      sucess: "rgba(24, 201, 68, 0.801)",
      default: "rgba(206, 206, 206, 0.904)",
    };
    this.icon = {
      wow: "🙀",
      bad: "🤕",
      default: "🤩",
    };
  }

  setMessage = (message) => {
    const msg = document.querySelector(".message-text");
    msg.textContent = message;
  };

  setBackground = (background) => {
    document.getElementById("body").style.background = background;
  };

  setScore = (number) => {
    const score = document.querySelector(".score");
    const scoreIcon = document.querySelector(".score-icon");
    if (number < 0) {
      this.score -= 1;
      scoreIcon.textContent = this.icon.bad;
    }
    if (number > 0) {
      this.score += 1;
      scoreIcon.textContent = this.icon.wow;
    }
    if (number === 0) {
      this.score = 0;
      scoreIcon.textContent = this.icon.default;
    }

    score.textContent = this.score;
  };

  setHighScore = (number) => {
    const highScore = document.querySelector(".high-score");
    if (number === 0) {
      this.highScore = 0;
      return;
    }
    this.highScore += number;
    highScore.textContent = this.highScore;
  };

  setNumber = (number) => {
    this.number = number;
  };

  genNumber = () => {
    const guess = Math.floor(Math.random() * 10) + 1;
    this.guessed = guess;
  };

  getUserInput = () => {
    const userInput = document.getElementById("input-value").value;
    return userInput;
  };

  reset = () => {
    this.setBackground(this.background.default);
    this.setNumber(0);
    this.setHighScore(0);
    this.setScore(0);
    this.genNumber();
  };

  restart = () => {
    this.genNumber();
    this.setBackground(this.background.default);
    this.setNumber(0);
    this.setScore(0);
  };

  setCounter = () => {
    this.count -= 1;

    const health = document.querySelector(".health");
    if (this.count === 1) {
      health.textContent = "❤️💛💛";
    } else if (this.count === 2) {
      health.textContent = "❤️❤️💛";
    } else if (this.count === 0) {
      health.textContent = "❤️❤️❤️";
      this.setMessage(this.message.loss);
      this.restart();
      this.count = 3;
    }
  };

  checkGuess = (number) => {
    if (number < this.guessed) {
      this.setMessage(this.message.toLow);
      this.setBackground(this.background.warn);
      this.setCounter();
      this.setScore(-1);
    } else if (number > this.guessed) {
      this.setBackground(this.background.warn2);
      this.setMessage(this.message.toHigh);
      this.setCounter();
      this.setScore(-1);
    } else {
      this.setBackground(this.background.sucess);
      document.querySelector(".hide-number").textContent = this.number;
      this.setMessage(this.message.win);
      this.setScore(1);
      this.genNumber();
      this.setHighScore(this.score);
      setTimeout(() => {
        document.querySelector(".hide-number").textContent = "?";
        this.setMessage(this.message.rematch);
        this.setScore(0);
      }, 1000);
    }
  };

  check = () => {
    let value = this.getUserInput();
    const valueType = typeof value;
    if (valueType === "string") {
      if (
        value === "" ||
        value === null ||
        value === NaN ||
        value === undefined
      ) {
        this.setMessage(this.message.invalidInput);
        this.setBackground(this.background.warn2);
        this.restart();
        return;
      } else if (parseInt(value) > 10 || parseInt(value) <= 0) {
        this.setMessage(this.message.numberHigherOrLower);
        this.setBackground(this.background.warn2);
        return;
      }

      this.number = parseInt(value);
      this.checkGuess(this.number);
    }
  };
}

const obj = new GMN();
obj.genNumber();
