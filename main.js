document.addEventListener('DOMContentLoaded', () => {
  const topLayer = generateRandomCards();
  const bottomLayer = generateRandomCards();
  const slots = Array(7).fill(null);

  displayTopLayer(topLayer);

  // click card event
  document.querySelectorAll('.top-card').forEach((card, index) => {
      card.addEventListener('click', () => {
          moveCardToSlot(index, topLayer, bottomLayer, slots);
          displayBottomCard(index, bottomLayer);
          checkForMatches(slots);
      });
  });
});

// generate random cards
function generateRandomCards() {
  let cards = [];
  for (let i = 0; i < 3; i++) { // 3 types
      for (let j = 0; j < 6; j++) { // 6 cards for each type
          cards.push(`type${i}`);
      }
  }
  shuffleArray(cards);
  return cards.slice(0, 9); // one layer has 9 cards
}

// show top layer cards
function displayTopLayer(cards) {
  const topLayerElement = document.getElementById('topLayer');
  cards.forEach(card => {
      let cardElement = document.createElement('div');
      cardElement.classList.add('card', 'top-card');
      cardElement.textContent = card;
      topLayerElement.appendChild(cardElement);
  });
}

// move card to slot
function moveCardToSlot(index, topLayer, bottomLayer, slots) {
  const selectedCard = topLayer[index];
  for (let i = 0; i < slots.length; i++) {
      if (slots[i] === null) {
          slots[i] = selectedCard;
          break;
      }
  }
}

// display to bottom layer after click top layer card
function displayBottomCard(index, bottomLayer) {
  const bottomLayerElement = document.getElementById('bottomLayer');
  let cardElement = document.createElement('div');
  cardElement.classList.add('card', 'bottom-card');
  cardElement.textContent = bottomLayer[index];
  bottomLayerElement.appendChild(cardElement);
}

// check if there are three same cards in the slots
function checkForMatches(slots) {
  
}

// shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
