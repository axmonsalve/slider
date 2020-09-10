const slideContainer = document.querySelector('.container');
const slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const slideControls = document.querySelector('.slide-controls');
const indicators = document.querySelector('.indicator');
const interval = 3000;

let slides = document.querySelectorAll('.slide');
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length-1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

slide.style.transform = 'translateX(',slideWidth,'px)';

for(let i = 0; i < slides.length; i++){
  let bullet = document.createElement('div');
  indicators.appendChild(bullet);
}

const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll('.slide');

slide.addEventListener('transitionend', () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = 'none';
    index = 1;
    slide.style.transform = 'translate('+ (-slideWidth * index) +'px)';
  }
  if (slides[index].id === lastClone.id) {
    slide.style.transition = 'none';
    index = slides.length - 2;
    slide.style.transform = 'translate('+ (-slideWidth * index) +'px)';
  }
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  slide.style.transform = 'translate('+ (-slideWidth * index) +'px)';
  slide.style.transition = '.7s'
};

const moveToPreviousSlide = () => {
  if(index <= 0) return;
  index--;
  slide.style.transform = 'translate('+ (-slideWidth * index) +'px)';
  slide.style.transition = '.7s'
}; 

slideContainer.addEventListener('mouseenter', () => {
  clearInterval(slideId);
  slideControls.style.opacity = '1';
  
});

slideContainer.addEventListener('mouseleave', () =>{
  startSlide();
  slideControls.style.opacity = '0';
} );

nextBtn.addEventListener('click', moveToNextSlide);

prevBtn.addEventListener('click', moveToPreviousSlide);

startSlide();