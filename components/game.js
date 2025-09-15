import { dom, renderUI } from "./ui.js";
import { handleBet, state } from "./state.js";
import { drawCard, createShoe, adjustAceValue } from "./deck.js";
import { checkResult } from "./state.js";

let shoe = createShoe(state.numberOfDecks);
console.log(shoe);

export function resetGame() {
  dom.playerCards.innerHTML = "";
  dom.dealerCards.innerHTML = "";
  state.playerHand = [];
  state.dealerHand = [];
  state.phase = "BET";
  state.result = null;
  state.doubleAvailable = true;
  dom.messageEl.classList.remove("blink-won", "blink-loss", "blink-push");
}

export function firstDeal() {
  console.log("New Game");
  console.log(shoe);
  dom.startBtn.textContent = "NEW GAME";

  state.phase = "PLAYER";

  state.playerHand.push(drawCard(shoe), drawCard(shoe));
  state.dealerHand.push(drawCard(shoe), drawCard(shoe));

  state.playerSum = state.playerHand[0].value + state.playerHand[1].value;
  state.dealerSum = state.dealerHand[0].value + state.dealerHand[1].value;

  if (state.playerSum == 21 && state.dealerSum == 21) {
    state.phase = "SETTLE";
    state.result = "PUSH";
    state.dealerSum = "BLACKJACK";
    state.playerSum = "BLACKJACK";
    console.log("BlackJack");
  } else if (state.playerSum == 21) {
    state.phase = "SETTLE";
    state.result = "BJ";
    state.playerSum = "BLACKJACK";
    console.log("BlackJack");
  } else if (state.dealerSum == 21) {
    state.phase = "SETTLE";
    state.result = "LOSS";
    state.dealerSum = "BLACKJACK";
    console.log("dealer has BlackJack");
  }
  handleBet();
  renderUI();
}

export function hit() {
  if (state.phase === "PLAYER") {
    const newCard = drawCard(shoe);
    state.playerHand.push(newCard);
    state.playerSum += newCard.value;
    console.log("hit", newCard);

    state.playerSum = adjustAceValue(state.playerHand, state.playerSum);

    if (state.playerSum > 21) checkResult();
    state.doubleAvailable = false;
    renderUI();
  }
}

export function stand() {
  console.log("stand clicket");

  if (state.phase === "PLAYER") {
    state.phase = "DEALER";
    renderUI();

    while (state.dealerSum < 17) {
      console.log(state.dealerSum);

      const newCard = drawCard(shoe);
      state.dealerHand.push(newCard);
      state.dealerSum += newCard.value;
      console.log(newCard);
      state.dealerSum = adjustAceValue(state.dealerHand, state.dealerSum);
      renderUI();
    }

    checkResult();

    state.phase = "SETTLE";
    handleBet();
    renderUI();
  }
}

export function doubleDown() {
  if (state.phase === "PLAYER" && state.doubleAvailable) {
    const newCard = drawCard(shoe);
    state.playerHand.push(newCard);
    state.playerSum += newCard.value;
    console.log(newCard);
    state.playerSum = adjustAceValue(state.playerHand, state.playerSum);
    checkResult();
    handleBet();
    renderUI();
  }
}
