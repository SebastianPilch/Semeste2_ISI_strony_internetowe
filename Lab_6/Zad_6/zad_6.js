const DRAGGABLE_CLASS_NAME = 'js-element';
const DRAGGING_CLASS_NAME = 'js-dragging';
const DRAG_OVER_CLASS_NAME = 'js-drag-over';

const onElementDrop = (event) => {
  event.preventDefault();

  const draggedId = event.dataTransfer.getData('text/plain');
  const draggedElement = document.querySelector(`#${draggedId}`);
  const draggedElementHTML = event.dataTransfer.getData('text/html');
  const droppedAt = document.elementFromPoint(event.clientX, event.clientY);

  draggedElement.innerHTML = droppedAt.innerHTML;
  droppedAt.innerHTML = draggedElementHTML;

  document
    .querySelectorAll(`.${DRAGGABLE_CLASS_NAME}`)
    .forEach((el) => el.classList.remove(DRAG_OVER_CLASS_NAME));
};

const onElementDragStart = (event) => {
  const element = event.target;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', element.innerHTML);
  event.dataTransfer.setData('text/plain', element.getAttribute('id'));
  element.classList.add(DRAGGING_CLASS_NAME);
};

const onElementDragOver = (event) => {
  event.preventDefault();
};

const onElementDragEnd = (event) => {
  event.target.classList.remove(DRAGGING_CLASS_NAME);
};

const onElementDragEnter = (event) => {
  event.target.classList.add(DRAG_OVER_CLASS_NAME);
};

const onElementDragLeave = (event) => {
  event.target.classList.remove(DRAG_OVER_CLASS_NAME);
};

document.addEventListener('dragover', (event) => {
  if (event.target.className.includes(DRAGGABLE_CLASS_NAME)) {
    onElementDragOver(event);
  }
});

document.addEventListener('drop', (event) => {
  if (event.target.className.includes(DRAGGABLE_CLASS_NAME)) {
    onElementDrop(event);
  }
});

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

document.addEventListener('dragenter', (event) => {
  const className = event.target.className;

  if (
    className.includes(DRAGGABLE_CLASS_NAME) &&
    !className.includes(DRAGGING_CLASS_NAME)
  ) {
    onElementDragEnter(event);
  }
});

document.addEventListener('dragleave', (event) => {
  if (event.target.className.includes(DRAGGABLE_CLASS_NAME)) {
    onElementDragLeave(event);
  }
});
