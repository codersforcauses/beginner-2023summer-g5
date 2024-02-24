class Game {
  constructor(originSource, bindElement) {
      this.doc = document;
        this.originSource = this.randomList([
            ...Array(6).fill('images/pink.png'),
            ...Array(6).fill('images/yellow.png'),
            ...Array(6).fill('images/blue.png'),
          ]);
   
      this.bindElement = bindElement || this.doc.body;
      this.slotElements = []; 
      this.slot = []; 
      this.box = null;
      this.init().then(this.startHandler.bind(this));
  }
  startHandler() {
      this.box = this.$('#ew-box');
      this.resetHandler();
      // make two layers of cards, each layre has 9 cards
      for (let layer = 0; layer < 2; layer++) {
          for (let row = 0; row < 3; row++) {
              for (let col = 0; col < 3; col++) {
                  const item = this.create('div');
                  item.className = `ew-box-item`;
                   item.style.position = 'absolute';
                   item.style.left = `${col * 6.5}rem`;
                   item.style.top = `${row * 4}rem`;
                  item.style.zIndex = layer; // divide the cards into two layers
                  const imageIndex = row * 3 + col + layer * 9;
                // set the background image
                item.style.backgroundImage = `url(${this.originSource[imageIndex]})`; 
                item.style.backgroundSize = 'cover'; 
                item.setAttribute('data-image', this.originSource[imageIndex]);
                item.addEventListener('click', () => this.cardClickHandler(item));
                this.box.append(item);
              }
          }
      }

      const slotsContainer = this.create('div');
      slotsContainer.className = 'slots-container'; // create a container for the slots
          // create 5 slots
          for (let i = 0; i < 5; i++) {
            let slot = this.create('div');
            slot.className = 'slot';
            this.slotElements.push(slot); // add the slot to the slot elements array
            slotsContainer.appendChild(slot);
        }
      // add the slots container to the box
      this.box.appendChild(slotsContainer);
  }



  cardClickHandler(card) {
    const image = card.getAttribute('data-image');
    if (this.slot.length < 5) {
        card.style.display = 'none';
        const slotElement = this.slotElements[this.slot.length];
        slotElement.style.backgroundImage = `url("${image}")`;
        this.slot.push(image);

        // check if there is a match
        if (this.slot.length >= 3) {
            const imagesCount = {};
            this.slot.forEach(image => {
                imagesCount[image] = (imagesCount[image] || 0) + 1;
            });

            const matchedImage = Object.keys(imagesCount).find(image => imagesCount[image] >= 3);
            if (matchedImage) {
                // remove matched color from the slot
                this.slot = this.slot.filter(image => image !== matchedImage);
                this.slotElements.forEach((slotElement, Index) => {
                    if (slotElement.style.backgroundImage === matchedImage) {
                        slotElement.style.backgroundImage = '';
                        slotElement.removeAttribute('data-image');
                    }
                });
                // update the slots after match
                this.updateSlotsAfterMatch();
            }
        }
    }
}

updateSlotsAfterMatch() {
    this.slotElements.forEach(slotElement => {
        slotElement.style.backgroundImage = ''; // remove the background image
        slotElement.removeAttribute('data-image'); // remove the data-image attribute
    });
    // refill the slots with the remaining images
    this.slot.forEach((image, index) => {
        const slotElement = this.slotElements[index];
        slotElement.style.backgroundImage = `url("${image}")`; 
        slotElement.setAttribute('data-image', image); 
    });
}









  resetHandler() {
      this.box.innerHTML = '';
      this.slot = [];
  }
  init() {
      return new Promise(resolve => {
          const template = `<div class="ew-box" id="ew-box" ></div>`;
          this.bindElement.innerHTML += template;
          resolve();
      })
  }
  randomList(arr) {
      const newArr = [...arr];
      for (let i = newArr.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
  }
  $(selector) {
      return this.doc.querySelector(selector);
  }
  resetGame() {
      // restart the game
      this.resetHandler();
      this.startHandler();
  }
  create(name) {
      return this.doc.createElement(name);
  }
}
window.onload = () => {
  const images = ['images/pink.png', 'images/pink.png', 'images/pink.png', 'images/pink.png', 'images/pink.png', 'images/pink.png', 'images/yellow.png', 'images/yellow.png', 'images/yellow.png', 'images/yellow.png', 'images/yellow.png', 'images/yellow.png', 'images/blue.png', 'images/blue.png', 'images/blue.png', 'images/blue.png', 'images/blue.png', 'images/blue.png'];
  const game = new Game(images);
}


