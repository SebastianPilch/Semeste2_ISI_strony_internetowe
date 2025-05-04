const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

let Move = true;
let BallSize = 30;
let BallColor = 'red';
let direction = 1;
let Scale = 0.5;

let timestamp;
const framerate = 800 / 60;
const ballSpeed = 5;

let Position = BallSize + 1;

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

const drawBall = (position, radius, color) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const height = canvas.height - radius;
  ctx.save();
  ctx.beginPath();
  ctx.arc(position, height, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

const update = () => {
  if (Position <= BallSize || Position + BallSize >= canvas.width) {
    direction = -direction;
    BallColor = randomColor();
  }

  Scale = Position > canvas.width / 2 ? -0.5 * 0.6 : 0.5* 0.6;
  Position += direction * ballSpeed;
  BallSize = Math.abs(BallSize+Scale);
};


const animate = (new_time) => {
  if (Move) {
    requestAnimationFrame(animate);
  }
  if (!timestamp) {
    timestamp = new_time;
  }
  const time_difference = new_time - timestamp;
  if (time_difference > framerate) {
    drawBall(Position, BallSize, BallColor);
    update();
    timestamp = new_time;
  }
};

requestAnimationFrame(animate);


document.querySelector('.js-move').addEventListener('click', () => {
  Move = true;
  requestAnimationFrame(animate);
});

document.querySelector('.js-stop').addEventListener('click', () => {
  Move = false;
});