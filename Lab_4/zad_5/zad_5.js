const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

const Filter_color_input = document.querySelector('.js-filter');
let currentFilter = Filter_color_input.value;
const Mask_color_input = document.querySelector('.js-mask');
let currentMask = Mask_color_input.value;
let img_size_x=0;
let img_size_y=0;
let img_path = './img/refka2.jpg';
const lastXElement = document.getElementById('last-x');
const lastYElement = document.getElementById('last-y');
let cursor_x=0;
let cursor_y=0;

Filter_color_input.addEventListener('change', (event) => {
  currentFilter = event.currentTarget.value;
});

Mask_color_input.addEventListener('change', (event) => {
  currentMask = event.currentTarget.value;
});


const CursorPosition = (element, event) => {
    const rect = element.getBoundingClientRect();
    const last_x = ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
    const last_y = ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
    lastXElement.textContent = last_x.toFixed(2);
    lastYElement.textContent = last_y.toFixed(2);

    if(element == canvas)
    {
        cursor_x = last_x;
        cursor_y = last_y;
    }

    return {
        x: last_x,
        y: last_y,
    };
};

canvas.addEventListener('click', (event) => {
    CursorPosition(canvas, event);
});

const cut = (event) => {
    const { x, y } = CursorPosition(canvas, event);

  const img = new Image();
  img.onload = () => {
    const img_width = img.width;
    const img_height = img.height;

    const fragmentWidth = 100;
    const fragmentHeight = 100;

    const centerX = img_width / 2;
    const centerY = img_height / 2;

    const left = centerX - fragmentWidth / 2 >= 0 ? centerX - fragmentWidth / 2 : 0;
    const top = centerY - fragmentHeight / 2 >= 0 ? centerY - fragmentHeight / 2 : 0;
    const right = centerX + fragmentWidth / 2 <= img_width ? fragmentWidth : img_width - left;
    const bottom = centerY + fragmentHeight / 2 <= img_height ? fragmentHeight : img_height - top;



    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      img,  // Źródłowy obraz
      left,  // X początkowy wycinanego fragmentu
      top,   // Y początkowy wycinanego fragmentu
      right, // Szerokość wyciętego fragmentu
      bottom, // Wysokość wyciętego fragmentu
      img_width/2,     // X na canvasie
      img_height/2,     // Y na canvasie
      canvas.width, // Szerokość na canvasie (skalowanie)
      canvas.height // Wysokość na canvasie (skalowanie)
    );
  };

  img.src = img_path;
};

document.querySelector('.js-frame').addEventListener('click', cut);


const addColor = (color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalCompositeOperation = 'overlay';
  ctx.fillRect(0, 0, img_size_x, img_size_y);
  ctx.restore();
};

document.querySelector('.js-add-filter').addEventListener('click', () => {
    addColor(currentFilter)
});

const showImage = () => {
    const img = new Image();
    img.onload = () => {
        if (img.width < canvas.width) {
          ctx.drawImage(img, 0, 0 , img.width*2 , img.height*2 );
        } else {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    };
    img.src = img_path;
    img_size_x = img.width*2
    img_size_y = img.height*2
};

const reset = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  showImage();
};

document.querySelector('.js-backup').addEventListener('click', reset);


const addMask = () => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(img_size_x / 2, img_size_y / 2, 100, 0, Math.PI * 2);
  ctx.clip();
  addColor(currentMask);
  ctx.restore();
};

document.querySelector('.js-add-mask').addEventListener('click', addMask);


showImage();
