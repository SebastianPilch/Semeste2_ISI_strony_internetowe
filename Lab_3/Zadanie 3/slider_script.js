
const currentSlideVar = '--current-slide';

const slider = document.querySelector('.js-slider');
const sliderElements = slider.querySelector('.js-slider-elements');
const slideLength = sliderElements.querySelectorAll('.js-slide').length;

const leftButton = slider.querySelector('.js-left');
const rightButton = slider.querySelector('.js-right');
const randomButton = document.querySelector('.js-random');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const setCurrentIdx = (idx) => {
  sliderElements.style.setProperty(currentSlideVar, idx);
};

const getCurrentIdx = () => {
  return Number(
    getComputedStyle(sliderElements).getPropertyValue(currentSlideVar).trim()
  );
};


const nextSlide = (direction) => {
  const currentSlideIdx = getCurrentIdx();
  const nextSlideIdx = (currentSlideIdx + direction) % slideLength;
  setCurrentIdx(nextSlideIdx < 0 ? slideLength - 1 : nextSlideIdx);
};

leftButton.addEventListener('click', () => {
  nextSlide(-1);
});

rightButton.addEventListener('click', () => {
  nextSlide(1);
});

randomButton.addEventListener('click', () => {
  const currentSlideIdx = getCurrentIdx();
  let randomIdx = getRandomInt(0, slideLength);

  while (randomIdx === currentSlideIdx) {
    randomIdx = getRandomInt(0, slideLength);
  }

  setCurrentIdx(randomIdx);
});
