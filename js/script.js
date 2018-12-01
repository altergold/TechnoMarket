window.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    let activeModal = document.querySelector('.modal:not(.visually-hidden)');
    activeModal.classList.add('visually-hidden');
    overlay.classList.add('modal-overlay-hidden');
  }
});

let overlay = document.querySelector('.modal-overlay');
overlay.addEventListener('click', function(evt) {
  evt.preventDefault();
  let currentModal = document.querySelector('.modal:not(.visually-hidden)');
  currentModal.classList.add('visually-hidden');
  overlay.classList.add('modal-overlay-hidden');
});

let loginButton = document.querySelector('.user-nav-login');
loginButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  let loginDiv = document.querySelector('.feedback-form');
  loginDiv.classList.remove('visually-hidden');
  overlay.classList.remove('modal-overlay-hidden');
});

let mapButton = document.querySelector('.map-small');
mapButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  let loginDiv = document.querySelector('.map-large');
  loginDiv.classList.remove('visually-hidden');
  overlay.classList.remove('modal-overlay-hidden');
});

let closeModalButtons = document.querySelectorAll('.modal-form-close');
for (let i = 0; i < closeModalButtons.length; i++) {
  closeModalButtons[i].addEventListener('click', function(evt) {
    evt.preventDefault();
    this.parentElement.classList.add('visually-hidden');
    overlay.classList.add('modal-overlay-hidden');
   })
}

for (let i = 1; i <=3 ; i++) {
  let servicesButton = document.querySelector('button[name=services-button' + i + ']');
  servicesButton.addEventListener('click', function(evt){
    for (let j = 1; j <= 3; j++) {
      let btn = document.querySelector('button[name=services-button' + j + ']');
      let descr = document.querySelector('.services-description' + j);

      if (btn !== servicesButton) {
        btn.classList.remove('services-button-active');
        descr.classList.add('visually-hidden');
      }

    }
    let activeDescription = document.querySelector('.services-description' + i);
    activeDescription.classList.remove('visually-hidden');
    this.classList.add('services-button-active');
  })
}

let slider = document.querySelector('.features-promo-slider');
let buttonSliderPrevious = slider.querySelector('.slider-previous');
let buttonSliderNext = slider.querySelector('.slider-next');
let buttonsDot = slider.querySelectorAll('.dot');

function sliderChange(newSlideNumber){
  let currentSliderItem = slider.querySelector('.promo-slider-item:not(.visually-hidden)');
  let currentButtonItem = slider.querySelector('.dot-active');
  let newSliderItem = slider.querySelector('.promo-slider-item:nth-child(' + newSlideNumber + ')');
  let newButtonItem = slider.querySelector('.dots-container li:nth-child(' + newSlideNumber + ') .dot');
  currentSliderItem.classList.add('visually-hidden');
  currentButtonItem.classList.remove('dot-active');
  newSliderItem.classList.remove('visually-hidden');
  newButtonItem.classList.add('dot-active');
}

buttonSliderNext.addEventListener('click', function(evt) {
  evt.preventDefault();
  let currentSliderItem = slider.querySelector('.promo-slider-item:not(.visually-hidden)');
  let currentNumber = Number(currentSliderItem.dataset.slidernumber);
  let lastSliderItem = slider.querySelector('.promo-slider-item:last-child');
  let lastNumber = Number(lastSliderItem.dataset.slidernumber);
  let newNumber;

  if (currentNumber === lastNumber) {
    newNumber = 1;
  }
  else {
    newNumber = currentNumber + 1;
  }

  sliderChange(newNumber);

});

buttonSliderPrevious.addEventListener('click', function(evt) {
  evt.preventDefault();
  let currentSliderItem = slider.querySelector('.promo-slider-item:not(.visually-hidden)');
  let currentNumber = Number(currentSliderItem.dataset.slidernumber);
  let lastSliderItem = slider.querySelector('.promo-slider-item:last-child');
  let lastNumber = Number(lastSliderItem.dataset.slidernumber);
  let newNumber;

  if (currentNumber === 1) {
    newNumber = lastNumber;
  }
  else {
    newNumber = currentNumber - 1;
  }

  sliderChange(newNumber);

});

for (let i = 1; i <= buttonsDot.length; i++) {
  buttonsDot[i - 1].addEventListener('click', function (evt) {
    evt.preventDefault();
    sliderChange(Number(i));
  });
}