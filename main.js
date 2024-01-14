document.addEventListener('DOMContentLoaded', () => {
  const topLayer = generateRandomCards();
  const bottomLayer = generateRandomCards();
  const slots = document.getElementById("slots");
    for (let i = 0; i < 7; i++) {
        let slot = document.createElement('div');
        slot.className = 'slot';
        slots.appendChild(slot);
    }

  displayLayer(topLayer, 'topLayer');
  displayLayer(bottomLayer, 'bottomLayer');
      // 为 topLayer 上的卡片注册点击事件
  registerCardClickEvent(document.getElementById('topLayer'));
});
// 将注册事件的逻辑封装为一个函数
function registerCardClickEvent(layerElement) {
  Array.from(layerElement.getElementsByClassName('card')).forEach(card => {
      console.log("Adding click event listener to card"); // 调试信息
      card.addEventListener('click', function(event) {
          moveToSlot(event.target);
      });
  });
}


  document.getElementById('topLayer').addEventListener('click', (event) => {
      if (event.target.classList.contains('card')) {
          const index = Array.from(document.getElementById('topLayer').children).indexOf(event.target);
          moveCardToSlot(index, topLayer, bottomLayer, slots);
          revealBottomCard(index);
          checkForMatches(slots);
      }
  });


    let cards = document.getElementsByClassName('card');
    Array.from(cards).forEach(card => {
        card.addEventListener('click', function (event){
          moveCardToSlot(event.target);
    });
    });

    function moveToSlot(card) {
      // 找到第一个空的插槽
      console.log("Moving card to slot");
      let slots = document.getElementsByClassName('slot');
      let targetSlot = null;
      for (let slot of slots) {
          if (!slot.hasChildNodes()) {
              targetSlot = slot;
              break;
          }
      }
  
      if (targetSlot) {
          // 创建移动动画
          animateCardMove(card, targetSlot, () => {
              // 动画结束后的操作
              targetSlot.appendChild(card);
              // 可以在这里添加检查匹配和更新游戏状态的代码
          });
      }
  }
  
  function animateCardMove(card, targetSlot, callback) {
      console.log("Animating card move");
      // 获取起始和结束的位置
      let cardRect = card.getBoundingClientRect();
      let slotRect = targetSlot.getBoundingClientRect();
  
      // 计算移动的距离
      let translateX = slotRect.left - cardRect.left;
      let translateY = slotRect.top - cardRect.top;
  
      // 应用CSS动画
      card.style.transition = 'transform 0.5s ease';
      card.style.transform = `translate(${translateX}px, ${translateY}px)`;
  
      // 动画结束后的清理
      card.addEventListener('transitionend', function() {
          card.style.transition = '';
          card.style.transform = '';
          callback();
      }, { once: true });
  }
function generateRandomCards() {
  const colors = ['red', 'yellow', 'blue'];
  let cards = [];
  for (let color of colors) {
      for (let i = 0; i < 6; i++) {
          cards.push(color);
      }
  }
  shuffleArray(cards);
  return cards.slice(0, 9);
}

function displayLayer(cards, layerId) {
  const layerElement = document.getElementById(layerId);
  cards.forEach(color => {
      let cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.style.backgroundColor = color;
      layerElement.appendChild(cardElement);

      // 添加点击事件监听器
      cardElement.addEventListener('click', function(event) {
          moveToSlot(event.target);
      });
  });
}


function moveCardToSlot(index, topLayer, bottomLayer, slots) {
  const selectedCard = topLayer[index];
  if (selectedCard) {
      for (let i = 0; i < slots.length; i++) {
          if (slots[i] === null) {
              slots[i] = selectedCard;
              topLayer[index] = null;
              updateSlotDisplay(i, selectedCard);
              break;
          }
      }
  }
}

function revealBottomCard(index) {
  document.getElementById('bottomLayer').children[index].style.visibility = 'visible';
}

function checkForMatches(slots) {
  let colorCount = {'red': 0, 'yellow': 0, 'blue': 0};
  for (let color of slots) {
      if (color) {
          colorCount[color]++;
      }
  }

  for (let color in colorCount) {
      if (colorCount[color] >= 3) {
          removeThreeCards(color, slots);
          break;
      }
  }
}

function removeThreeCards(cardColor, slots) {
  let count = 0;
  for (let i = 0; i < slots.length; i++) {
      if (slots[i] === cardColor) {
          slots[i] = null;
          updateSlotDisplay(i, null);
          count++;
          if (count === 3) {
              break;
          }
      }
  }
}

function updateSlotDisplay(slotIndex, color) {
  const slot = document.getElementById('slots').children[slotIndex];
  slot.style.backgroundColor = color ? color : '#fff';
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

