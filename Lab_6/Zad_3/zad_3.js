const dropArea = document.getElementById('dropArea');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
});

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    // Uzyskanie pozycji kursora
    const x = e.clientX;
    const y = e.clientY;

    handleFiles(files, { x, y });
}

function handleFiles(files, position) {
    ([...files]).forEach(file => previewFile(file, position));
}

function previewFile(file, position) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        let img = document.createElement('img');
        img.src = reader.result;
        img.className = 'image-preview';
        img.draggable = true;
        img.style.position = 'absolute';
        img.style.left = `${position.x}px`;
        img.style.top = `${position.y}px`;
        img.style.transform = 'translate(-50%, -50%)';
        img.addEventListener('dragstart', handleDragStart);
        img.addEventListener('dragend', handleDragEnd);
        dropArea.appendChild(img);
    }
}

function handleDragStart(e) {
    const img = e.target;
    const clonedImg = img.cloneNode(true);
    dropArea.appendChild(clonedImg);
    setTimeout(() => img.classList.add('hide'), 0);
}

function handleDragEnd(e) {
    e.target.classList.remove('hide');
}