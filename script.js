'use strict';
const draggableList = document.getElementById('draggable__list');
const checkEl = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amacio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomber',
  'Larry Page',
];

// Store list item
const listItems = [];

let dragStartIndex;

// Insert List items into DOM
const createList = function () {
  [...richestPeople]
    .map((item) => ({ value: item, sortBy: Math.random() }))
    .sort((a, b) => a.sortBy - b.sortBy)
    .map((item) => item.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div draggable="true" class="draggable">
                <p class="person__name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
};

// Swap list items that are drag and drop
const swapItem = function (startIndex, endIndex) {
  const startItem = listItems[startIndex].querySelector('.draggable');
  const endItem = listItems[endIndex].querySelector('.draggable');

  listItems[startIndex].appendChild(endItem);
  listItems[endIndex].appendChild(startItem);
};

const addEventListeners = function () {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable__list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', function () {
      dragStartIndex = +this.closest('li').getAttribute('data-index');
    });
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    item.addEventListener('drop', function () {
      const dragEndIndex = +this.getAttribute('data-index');
      swapItem(dragStartIndex, dragEndIndex);

      this.classList.remove('over');
    });
    item.addEventListener('dragenter', function () {
      this.classList.add('over');
    });
    item.addEventListener('dragleave', function () {
      this.classList.remove('over');
    });
  });
};

// Check the ordre of list items
const checkOrder = function () {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.remove('correct');
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('correct');
    }
  });
};

checkEl.addEventListener('click', checkOrder);

const init = function () {
  createList();
};

init();
