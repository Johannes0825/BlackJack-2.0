import { state } from "./state.js";
import { adjustAceValue } from "./deck.js";

export const dom = {
  hitBtn: document.getElementById("hit-btn"),
  standBtn: document.getElementById("stand-btn"),
  doubleBtn: document.getElementById("double-btn"),
  messageEl: document.getElementById("message-el"),
  playerSumEl: document.getElementById("player-sum-el"),
  dealerSumEl: document.getElementById("dealer-sum-el"),
  startBtn: document.getElementById("start-btn"),
  balanceEl: document.getElementById("balance-el"),
  betInput: document.getElementById("bet-input"),
  playerCards: document.getElementById("player-cards"),
  dealerCards: document.getElementById("dealer-cards"),
};

export function renderUI() {
  state.playerSum = adjustAceValue(state.playerHand, state.playerSum);
  state.dealerSum = adjustAceValue(state.dealerHand, state.dealerSum);
  //sum
  dom.playerSumEl.textContent = state.playerSum;
  dom.balanceEl.textContent = state.balance;
  //vis dealer-sum bare når fase er !== player
  console.log("Player cards:", state.playerSum);
  console.log("Dealer cards:", state.dealerSum);
  console.log("phase:", state.phase);

  dom.dealerSumEl.textContent =
    state.phase === "PLAYER" ? state.dealerHand[0].value : state.dealerSum;

  dom.balanceEl.textContent = "Balance: $" + state.balance;

  let msg = "";
  if (state.phase === "BET") msg = "Place your bets";
  else if (state.phase === "PLAYER") msg = "Hit or Stand?";
  else if (state.phase === "SETTLE") {
    switch (state.result) {
      case "WIN":
        msg = "You win!";
        dom.messageEl.classList.add("blink-won");
        break;
      case "LOSS":
        msg = "You lose…";
        dom.messageEl.classList.add("blink-loss");
        break;
      case "PUSH":
        msg = "Push.";
        dom.messageEl.classList.add("blink-push");
        break;
      case "BJ":
        msg = "Blackjack!";
        dom.messageEl.classList.add("blink-won");
        break;
    }
  }

  dom.messageEl.textContent = msg;

  renderHands();
}

export function renderHands() {
  dom.playerCards.innerHTML = "";
  dom.dealerCards.innerHTML = "";

  for (let card of state.playerHand) {
    const cardImg = document.createElement("img");
    cardImg.src = `./cards/${card.rank}_of_${card.suit}.png`;
    cardImg.classList.add("card");
    dom.playerCards.appendChild(cardImg);
  }

  //dealer
  if (state.phase === "PLAYER") {
    // vis 1 kort
    const [first] = state.dealerHand;
    const cardImg1 = document.createElement("img");
    cardImg1.src = `./cards/${first.rank}_of_${first.suit}.png`;
    cardImg1.classList.add("card");
    dom.dealerCards.appendChild(cardImg1);

    const back = document.createElement("img");
    back.src = "./cards/card-back.png";
    back.classList.add("card");
    dom.dealerCards.appendChild(back);
  } else {
    //vis alle kort
    for (let card of state.dealerHand) {
      const cardImg = document.createElement("img");
      cardImg.src = `./cards/${card.rank}_of_${card.suit}.png`;
      cardImg.classList.add("card");
      dom.dealerCards.appendChild(cardImg);
    }
  }
}
