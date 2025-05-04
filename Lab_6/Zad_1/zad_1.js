document.querySelectorAll('.draggable_img').forEach((element) => {
  element.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  element.addEventListener('dragstart', (event) => {
    const element = event.currentTarget;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', element.innerHTML);
    event.dataTransfer.setData('text/plain', element.getAttribute('id'));
    element.style.opacity = 0.4;
  });

  element.addEventListener('dragend', (event) => {
    event.currentTarget.style.opacity = 1;
  });

  element.addEventListener('drop', (event) => {
    event.preventDefault();

    const dropTarget = event.currentTarget;
    const draggedId = event.dataTransfer.getData('text/plain');
    const draggedElement = document.querySelector(`#${draggedId}`);
    const draggedElementHTML = event.dataTransfer.getData('text/html');

    draggedElement.innerHTML = dropTarget.innerHTML;
    dropTarget.innerHTML = draggedElementHTML;
  });
});
