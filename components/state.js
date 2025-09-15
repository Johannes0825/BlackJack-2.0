import { dom } from "./ui.js";

export const state = {
  //Spillfase
  phase: "BET",
  doubleAvailable: true,

  playerHand: [],
  dealerHand: [],

  //sum
  playerSum: 0,
  dealerSum: 0,

  //bet
  balance: 100,
  bet: 0,

  //result
  result: null,

  //
  numberOfDecks: 1,
};

export function checkResult() {
  console.log("checked result");
  if (
    state.playerSum > 21 ||
    (state.playerSum < state.dealerSum && state.dealerSum <= 21)
  ) {
    state.phase = "SETTLE";
    state.result = "LOSS";
    console.log("Loss");
  } else if (state.playerSum == state.dealerSum) {
    state.phase = "SETTLE";
    state.result = "PUSH";
    console.log("Push");
  } else if (
    (state.playerSum > state.dealerSum && state.dealerSum < 21) ||
    state.dealerSum > 21
  ) {
    state.phase = "SETTLE";
    state.result = "WIN";
    console.log("WIN");
  }
}

// lag funksjon om betting her
export function handleBet() {
  if (state.phase === "SETTLE") {
    state.balance += state.bet;

    switch (state.result) {
      case "WIN":
        state.balance += state.bet;
        break;
      case "LOSS":
        state.balance -= state.bet;
        break;
      case "BJ":
        state.balance += state.bet * 1.5;
    }
  }
}
