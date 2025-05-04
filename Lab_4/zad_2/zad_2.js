const canvas = document.querySelector('.js-draw_sheet');
const shapes = document.querySelectorAll('.js-shape');
const Fill_color = document.querySelector('.js-fill_color');
const Border_color = document.querySelector('.js-border_color');

const ctx = canvas.getContext('2d');

const scale = 0.2;
const offsetX = 200;
const offsetY = 200;

let cur_Fill_color = Fill_color.value;
let cur_Border_color = Border_color.value;

const getShapeSVG = (shape) => {
  const ShapeSvg = shape.querySelector('svg > path');
  return ShapeSvg.getAttribute('d');
};

let cur_Shape = getShapeSVG(
  document.querySelector('.js-shape[data-active="true"]')
);

Fill_color.addEventListener('change', (event) => {
  cur_Fill_color = event.currentTarget.value;
});

Border_color.addEventListener('change', (event) => {
  cur_Border_color = event.currentTarget.value;
});





const ChangeShape = (event) => {
  const shape= event.currentTarget;
  shapes.forEach((shape)  => (shape.dataset['active']=false));
  shape.dataset['active'] = true;

  const ShapeSvg = shape.querySelector('svg > path');
  cur_Shape = ShapeSvg.getAttribute('d');
}

shapes.forEach((shape) => shape.addEventListener('click', ChangeShape));


const CursorPosition = (element, event) => {
  const rect = element.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
};


const Draw = (event) => {
  const { x, y } = CursorPosition(canvas, event);

  ctx.fillStyle = cur_Fill_color;
  ctx.strokeStyle = cur_Border_color;
  ctx.lineWidth = 30;

  const path = new Path2D(cur_Shape);

  ctx.save();
  ctx.scale(scale, scale);
  ctx.translate(x / scale - offsetX, y / scale - offsetY);
  ctx.stroke(path);
  ctx.fill(path);
  ctx.restore();
};

canvas.addEventListener('dblclick', Draw);

