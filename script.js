// Script para o primeiro carrossel de imagens
const carousel1 = document.querySelector('.carousel');
const prevButton1 = document.querySelector('.carousel-prev');
const nextButton1 = document.querySelector('.carousel-next');
const images = carousel1.querySelectorAll('img');
let currentImageIndex = 0;
const speed = 2000;

function startCarousel1() {
  setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const translateValue = -currentImageIndex * getImageWidth();
    carousel1.style.transform = `translateX(${translateValue}px)`;
  }, speed);
}

prevButton1.addEventListener(getEventType(), (event) => {
  event.preventDefault();
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  const translateValue = -currentImageIndex * getImageWidth();
  carousel1.style.transform = `translateX(${translateValue}px)`;
});

nextButton1.addEventListener(getEventType(), (event) => {
  event.preventDefault();
  currentImageIndex = (currentImageIndex + 1) % images.length;
  const translateValue = -currentImageIndex * getImageWidth();
  carousel1.style.transform = `translateX(${translateValue}px)`;
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

startCarousel1();

// Script para o segundo carrossel de itens
const carousel2 = document.querySelector('.carousel-items');
const prevButton2 = document.querySelector('.prev-control');
const nextButton2 = document.querySelector('.next-control');
const items = carousel2.querySelectorAll('.carousel-item');
let currentIndex = 0;
const itemsPerPage = 6; // Mostrar 6 cards por vez
const intervalTime = 3000; // Tempo de intervalo em milissegundos (3 segundos)
const totalPasses = 6; // Número total de passadas antes de voltar ao início
let currentPass = 0; // Contador de passadas

// Função para atualizar o carrossel com base no índice atual
function updateCarousel2() {
    const translateValue = -(currentIndex * 100) / itemsPerPage;
    carousel2.style.transform = `translateX(${translateValue}%)`;
}

// Função para avançar o carrossel automaticamente
function autoAdvanceCarousel2() {
    currentIndex += itemsPerPage;
    currentPass++;
    if (currentPass >= totalPasses) {
        currentIndex = 0; // Reinicia do início quando chegar ao número total de passadas
        currentPass = 0; // Reinicia o contador de passadas
    }
    updateCarousel2();
}

// Inicializa o carrossel com atualização automática
let autoSlide2 = setInterval(autoAdvanceCarousel2, intervalTime);

// Eventos de clique para avançar e retroceder manualmente
nextButton2.addEventListener('click', (event) => {
    clearInterval(autoSlide2);
    event.preventDefault();
    currentIndex += itemsPerPage;
    currentPass++;
    if (currentPass >= totalPasses) {
        currentIndex = 0;
        currentPass = 0;
    }
    updateCarousel2();
    autoSlide2 = setInterval(autoAdvanceCarousel2, intervalTime);
});

prevButton2.addEventListener('click', (event) => {
    clearInterval(autoSlide2);
    event.preventDefault();
    currentIndex -= itemsPerPage;
    currentPass--;
    if (currentIndex < 0) {
        currentIndex = items.length - (items.length % itemsPerPage || itemsPerPage);
        currentPass = totalPasses - 1;
    }
    updateCarousel2();
    autoSlide2 = setInterval(autoAdvanceCarousel2, intervalTime);
});

// Pausar o carrossel quando o mouse estiver sobre ele e retomar quando o mouse sair
carousel2.addEventListener('mouseenter', () => clearInterval(autoSlide2));
carousel2.addEventListener('mouseleave', () => autoSlide2 = setInterval(autoAdvanceCarousel2, intervalTime));

// Inicia o carrossel
updateCarousel2();
