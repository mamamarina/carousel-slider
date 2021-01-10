(function () {

  const container = document.querySelector('#carousel');
  const indicatorsContainer = container.querySelector('#indicators-container');
  const controlsContainer = container.querySelector('#controls-container');
  const slides = container.querySelectorAll('.slide');
  const indicators = indicatorsContainer.querySelectorAll('.indicator');
  const pauseBtn = controlsContainer.querySelector('#pause-btn');
  const prevBtn = controlsContainer.querySelector('#prev-btn');
  const nextBtn = controlsContainer.querySelector('#next-btn');
   
  let currentSlide = 0;
  let timerID = null;
  let slidesCount = slides.length;
  let isPlaying = true;
  let interval = 2000;
  let swipeStartX = null;
  let swipeEndX = null;

  const CLASS_ACTIVE = 'active';
  const FA_PLAY = '<i class="fas fa-play-circle"></i>';
  const FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
  const SPACE = ' ';
  const LEFT_ARROW = 'ArrowLeft';
  const RIGHT_ARROW = 'ArrowRight';
  
  function gotoNth(n){
    slides[currentSlide].classList.toggle(CLASS_ACTIVE);
    indicators[currentSlide].classList.toggle(CLASS_ACTIVE);
    currentSlide = (n + slidesCount) % slidesCount;
    slides[currentSlide].classList.toggle(CLASS_ACTIVE);
    indicators[currentSlide].classList.toggle(CLASS_ACTIVE);
  }
  
  const gotoNext = () => gotoNth(currentSlide + 1);
  const gotoPrev = () => gotoNth(currentSlide - 1);
    
  function pause() {
    pauseBtn.innerHTML = FA_PLAY;
    clearInterval(timerID);
    isPlaying = false; 
  }
  function play() {
    pauseBtn.innerHTML = FA_PAUSE;
    timerID = setInterval(gotoNext, interval);
    isPlaying = true;
  }
  
  const pausePlay = () => isPlaying ? pause() : play();
  
  function next() {
    pause();
    gotoNext();
  }
  
  function prev() {
    pause();
    gotoPrev();
  }
  
  function indicate(event) {
    let target = event.target;
  
    if (target.classList.contains('indicator')){
      pause();
      gotoNth(+target.dataset.slideTo);
    }
  }
  
  function pressKey(event) {
    if (event.key === SPACE) pausePlay();
    if (event.key === LEFT_ARROW) prev();
    if (event.key === RIGHT_ARROW) next();
  }
  
  function swipeStart(event){
    if (event.changedTouches.length === 1) {
    swipeStartX = (event.changedTouches[0].pageX);
    }
  }
  
  function swipeEnd(event) {
    if (event.changedTouches.length === 1) {
    swipeEndX = event.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX > 0) next();
    if (swipeStartX - swipeEndX < 0) prev();
    }
  }  
  
  pauseBtn.addEventListener('click', pausePlay);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  indicatorsContainer.addEventListener('click', indicate);
  container.addEventListener('touchstart', swipeStart);
  container.addEventListener('touchend', swipeEnd)
  document.addEventListener('keydown', pressKey);
  
  timerID = setInterval(gotoNext, interval);
  
  
  }());
  
  
  
  