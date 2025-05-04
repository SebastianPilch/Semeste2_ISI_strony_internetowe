const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

const NumericalInputs = document.querySelectorAll('.js-color');

const values = {
  category1: 0,
  category2: 0,
  category3: 0,
  category4: 0,
  category5: 0,
};

const Colors = Array.from(NumericalInputs).reduce((dict, input) => {
  const category = input.getAttribute('id');
  dict[category] = input.style.background;
  return dict;
}, {});


const Chart = () => {
  let Angle = 0;
  const numbers_sum = Object.values(values).reduce((sum, value) => sum + value, 0);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const [category, value] of Object.entries(values)) {
    const singleAngle = (value / numbers_sum) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 100, Angle, Angle + singleAngle);
    Angle += singleAngle;
    ctx.lineTo(canvas.width/2, canvas.height/2);
    ctx.fillStyle = Colors[category];
    ctx.fill();
  }
};

const Change_event = (event) => {
  const input = event.currentTarget;
  const value = Number(input.value);
  const category = input.getAttribute('id');
  values[category] = !Number.isNaN(value) ? value : 0;
  Chart();
};

NumericalInputs.forEach((input) =>
  input.addEventListener('input', Change_event)
);
