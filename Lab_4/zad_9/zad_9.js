const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

const Triangles_in_star = 8;
const starInset = 2;
const starRadius = 10;

let starSpeed = 10;
let starCount = 10;
let stars = [];

const Draw = (x, y, r, n, inset) => {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - r);
  for (var i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - r * inset);
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - r);
  }
  ctx.closePath();
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.restore();
};

const update = (star) => {
  if (star.x <= starRadius || star.x >= canvas.width - starRadius) {
    star.vx *= -1;
  }

  if (star.y <= starRadius || star.y >= canvas.height - starRadius) {
    star.vy *= -1;
  }

  star.x += star.vx * starSpeed;
  star.y += star.vy * starSpeed;
};

let timestamp;
const framerate = 1000 / 60;

const animate = (next_time) => {
  requestAnimationFrame(animate);

  if (!timestamp) {
    timestamp = next_time;
  }

  const time_diff = next_time - timestamp;

  if (time_diff > framerate) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {
      Draw(star.x, star.y, starRadius, Triangles_in_star, starInset);
      update(star);
    }
    timestamp = next_time;
  }
};

requestAnimationFrame(animate);

document.querySelector('.js-speed').addEventListener('change', (event) => {
  starSpeed = Number(event.currentTarget.value);
});

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createRandomStar = () => {
  return {
    x: getRandomIntInclusive(starRadius + 1, canvas.width - 2 * starRadius - 1),
    y: getRandomIntInclusive(
      starRadius + 1,
      canvas.height - 2 * starRadius - 1
    ),
    vx: Math.random() > 0.5 ? 1 : -1,
    vy: Math.random() > 0.5 ? 1 : -1,
  };
};


document.querySelector('.js-stars').addEventListener('change', (event) => {
  const starCount = Number(event.currentTarget.value);
  const base = stars.slice(0, starCount);
  console.log(starCount)
  if (base.length < starCount) {
    for (let i = 0; i < starCount - base.length; i++) {
      const star = createRandomStar();
      base.push(star);
    }
  }

  stars = base;
});


for (let i = 0; i < starCount; i++) {
  stars.push(createRandomStar());
}