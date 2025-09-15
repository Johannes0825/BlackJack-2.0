import {
  resetGame,
  firstDeal,
  hit,
  stand,
  doubleDown,
} from "./components/game.js";
import { dom } from "./components/ui.js";
import { state } from "./components/state.js";

dom.startBtn.addEventListener("click", startGame);

dom.betInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") startGame();
});

dom.hitBtn.addEventListener("click", hit);
dom.standBtn.addEventListener("click", stand);
dom.doubleBtn.addEventListener("click", doubleDown);

export function startGame() {
  const betValue = Number(dom.betInput.value);

  if (isNaN(betValue) || betValue <= 0) {
    alert("Please enter a valid bet amount");
    return;
  }

  if (betValue > state.balance) {
    alert("You dont have enough money, get a job!");
    return;
  }

  state.bet = betValue;
  console.log("Bet set to:", state.bet);

  state.balance -= state.bet;

  resetGame();
  firstDeal();
}
