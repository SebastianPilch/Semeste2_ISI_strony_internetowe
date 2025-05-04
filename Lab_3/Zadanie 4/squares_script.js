const initial_state = () => ({
  count: 0,
  propagation: true,
  dir: false,
});

const state = initial_state();

const counter = document.querySelector('.js-counter');
const logs = document.querySelector('.js-logs');

const sqr1 = document.querySelector('.js-square-1');
const sqr2 = document.querySelector('.js-square-2');
const sqr3 = document.querySelector('.js-square-3');

const reset = document.querySelector('.js-zero');
const dirButton = document.querySelector('.js-direction');
const propagationButton = document.querySelector('.js-propagation');

const count_state = (value) => {
  state.count = value;
  counter.innerHTML = state.count;
};

const enablePropagation = (isEnabled) => {
  state.propagation = isEnabled;
  propagationButton.innerHTML = `${
    isEnabled ? 'Stop' : 'Start'
  } propagation`;
};

const changePropagation = () => {
  enablePropagation(!state.propagation);
};

propagationButton.addEventListener('click', changePropagation);

const SquareClick = (value, label) => {
  logs.insertAdjacentHTML(
    'beforeend',
    `<li>Nacisnąłeś ${label} o wartości ${value}</li>`
  );
};

const disabled_square = (square, isDisabled) => {
  square.dataset['disabled'] = isDisabled;
};

const onSquareClick = (event, value, label) => {
  if (!state.propagation) {
    event.stopPropagation();
  }

  count_state(state.count + value);
  SquareClick(value, label);
  checkBoxState();
};

const GrayClick = (event) => {
  onSquareClick(event, 1, 'szary');
};

const RedClick = (event) => {
  onSquareClick(event, 2, 'czerwony');
};

const YellowClick = (event) => {
  onSquareClick(event, 3, 'żółty');
};


const checkBoxState = () => {
  if (state.count > 30) {
    disabled_square(sqr2, true);
    sqr2.removeEventListener('click', RedClick, { capture: state.dir });
  }

  if (state.count > 50) {
    disabled_square(sqr3, true);
    sqr3.removeEventListener('click', YellowClick, { capture: state.dir });
  }
};


const unregisterEventListeners = (capture = false) => {
  sqr1.removeEventListener('click', GrayClick, { capture });
  sqr2.removeEventListener('click', RedClick, { capture });
  sqr3.removeEventListener('click', YellowClick, { capture });
};

const registerEventListeners = (capture = false) => {
  sqr1.addEventListener('click', GrayClick, { capture });
  sqr2.addEventListener('click', RedClick, { capture });
  sqr3.addEventListener('click', YellowClick, { capture });
};

registerEventListeners();

const Enable_capture = (isEnabled) => {
  state.dir = isEnabled;
  dirButton.innerHTML = `Change direction to ${
    isEnabled ? 'bubble' : 'capture'
  }`;

  unregisterEventListeners(!state.dir);
  registerEventListeners(state.dir);
};


const toggleDir = () => {
  Enable_capture(!state.dir);
};

dirButton.addEventListener('click', toggleDir);

const clearLogs = () => {
  logs.innerHTML = '';
};

const reset_state = () => {
  count_state(0);
  enablePropagation(true);
  Enable_capture(false);
  clearLogs();
  disabled_square(sqr2, false);
  disabled_square(sqr3, false);
};

reset.addEventListener('click', reset_state);