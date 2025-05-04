const DRAGGABLE_CLASS_NAME = 'js-field';
const DRAGGING_CLASS_NAME = 'js-dragging';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const numbers = [...Array(15).keys()].map((x) => x + 1);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(numbers);

  for (let i = 0; i < 16; i++) {
    const cell = document.createElement('div');
    cell.classList.add('field');

    const x = i % 4;
    const y = Math.floor(i / 4);
    cell.setAttribute('data-x', x);
    cell.setAttribute('data-y', y);

    if (i < 15) {
      const span = document.createElement('span');
      span.classList.add('js-field');
      span.draggable = true;
      span.id = `e${numbers[i]}`;
      span.textContent = numbers[i];
      cell.appendChild(span);
    }

    cell.addEventListener('drop', onContainerDrop);
    cell.addEventListener('dragover', onContainerDragOver);

    grid.appendChild(cell);
  }
});

const onElementDragStart = (event) => {
  const element = event.target;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', element.outerHTML);
  event.dataTransfer.setData('text/plain', element.getAttribute('id'));
  element.classList.add(DRAGGING_CLASS_NAME);
};

const onElementDragEnd = (event) => {
  event.target.classList.remove(DRAGGING_CLASS_NAME);
};

document.addEventListener('dragstart', (event) => {
  if (event.target.className.includes(DRAGGABLE_CLASS_NAME)) {
    onElementDragStart(event);
  }
});

document.addEventListener('dragend', (event) => {
  if (event.target.className.includes(DRAGGABLE_CLASS_NAME)) {
    onElementDragEnd(event);
  }
});

const onContainerDragOver = (event) => {
  event.preventDefault();
};

const onContainerDrop = (event) => {
  event.preventDefault();

  const dropTarget = event.currentTarget;
  console.log(dropTarget);

  if (dropTarget.querySelector('.js-field') !== null) {
    return;
  }

  const draggedId = event.dataTransfer.getData('text/plain');
  const draggedElement = event.dataTransfer.getData('text/html');

  const dropX = Number(dropTarget.dataset['x']);
  const dropY = Number(dropTarget.dataset['y']);

  const srcCell = document.querySelector(`#${draggedId}`).parentElement;
  const srcX = Number(srcCell.dataset['x']);
  const srcY = Number(srcCell.dataset['y']);

  const validCoords = [
    [dropX, dropY - 1],
    [dropX + 1, dropY],
    [dropX, dropY + 1],
    [dropX - 1, dropY],
  ];

  for (const [x, y] of validCoords) {
    if (srcX === x && srcY === y) {
      document.querySelector(`#${draggedId}`).remove();
      dropTarget.insertAdjacentHTML('beforeend', draggedElement);
      break;
    }
  }
};


