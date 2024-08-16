const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const images = carousel.querySelectorAll('img');
let currentImageIndex = 0;
const speed = 2000;

function startCarousel() {
  setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const translateValue = -currentImageIndex * getImageWidth();
    carousel.style.transform = `translateX(${translateValue}px)`;
  }, speed);
}

prevButton.addEventListener(getEventType(), (event) => {
  event.preventDefault();
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  const translateValue = -currentImageIndex * getImageWidth();
  carousel.style.transform = `translateX(${translateValue}px)`;
});

nextButton.addEventListener(getEventType(), (event) => {
  event.preventDefault();
  currentImageIndex = (currentImageIndex + 1) % images.length;
  const translateValue = -currentImageIndex * getImageWidth();
  carousel.style.transform = `translateX(${translateValue}px)`;
});

function getImageWidth() {
  return isMobileDevice() ? window.innerWidth : images[0].clientWidth;
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function getEventType() {
  return isMobileDevice() ? 'touchstart' : 'click';
}

startCarousel();

