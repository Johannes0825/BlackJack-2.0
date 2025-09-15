import { state } from "./state.js";

const ranks = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
];
const suits = ["spades", "hearts", "clubs", "diamonds"];

export function createDeck() {
  const deck = [];

  for (const rank of ranks) {
    for (const suit of suits) {
      let value;
      if (rank === "ace") {
        value = 11;
      } else if (["jack", "queen", "king"].includes(rank)) {
        value = 10;
      } else {
        value = Number(rank);
      }

      deck.push({ rank, suit, value });
    }
  }

  return deck;
}

//fisher yates shuffle
export function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function createShoe(numberOfDecks) {
  let shoe = [];

  for (let i = 0; i < numberOfDecks; i++) {
    shoe = shoe.concat(createDeck());
  }

  shuffleDeck(shoe);

  return shoe;
}

const reShuffleThreshold = 10;
// funksjon for å trekke kort, muterer deck og returnerer card
export function drawCard(shoe) {
  if (shoe.length < reShuffleThreshold) {
    const freshShoe = createShoe(state.numberOfDecks);
    shoe.length = 0;
    shoe.push(...freshShoe);
    console.log("RESHUFFLED shoe. New length:", shoe.length);
  }

  return shoe.pop();
}

export function adjustAceValue(hand, sum) {
  for (let card of hand) {
    if (card.rank === "ace" && sum > 21 && card.value === 11) {
      card.value = 1;
      sum -= 10;
    }
  }

  return sum;
}
