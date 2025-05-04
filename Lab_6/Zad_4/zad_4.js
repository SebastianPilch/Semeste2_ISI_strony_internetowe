var nextId = 10;

const DRAGGABLE_CLASS_NAME = 'js-label';
const DRAGGING_CLASS_NAME = 'js-dragging';

const onContainerDragOver = (event) => {
  event.preventDefault();
};

const onContainerDrop = (event) => {
  event.preventDefault();

  const dropTarget = event.currentTarget;
  const draggedId = event.dataTransfer.getData('text/plain');
  const draggedElement = event.dataTransfer.getData('text/html');
  const droppedAt = document.elementFromPoint(event.clientX, event.clientY);

  if (droppedAt.getAttribute('id') == draggedId) {
    return;
  }

  // Usuń przenoszony element
  document.querySelector(`#${draggedId}.${DRAGGABLE_CLASS_NAME}`).remove();

  // Wstaw element w nowe miejsce
  if (droppedAt.className.includes(DRAGGABLE_CLASS_NAME)) {
    droppedAt.insertAdjacentHTML('beforebegin', draggedElement);
  } else {
    dropTarget.insertAdjacentHTML('beforeend', draggedElement);
  }

  // Dodaj lub usuń klasę 'strikethrough' w zależności od listy
  const draggedItem = document.querySelector(`#${draggedId}`);
  const span = draggedItem.querySelector('span');

  if (dropTarget.id === 'done-list') {
    span.classList.add('strikethrough');
  } else if (dropTarget.id === 'todo-list') {
    span.classList.remove('strikethrough');
  }
};

document.querySelectorAll('.js-list').forEach((element) => {
  element.addEventListener('drop', onContainerDrop);
  element.addEventListener('dragover', onContainerDragOver);
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

const todoList = document.querySelector('#todo-list');

document.querySelector('.js-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const task = data.get('task');
  event.currentTarget.reset();

  todoList.insertAdjacentHTML(
    'beforeend',
    `<li id="item-${nextId++}" class="list-label js-label" draggable="true">
      <span>${task}</span>
    </li>`
  );
});