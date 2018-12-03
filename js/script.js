window.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    let activeModal = document.querySelector('.modal:not(.visually-hidden)');

    if (activeModal) {
      activeModal.classList.add('visually-hidden');
      overlay.classList.add('modal-overlay-hidden');
    }
  }
});

let overlay = document.querySelector('.modal-overlay');
overlay.addEventListener('click', function(evt) {
  evt.preventDefault();
  let currentModal = document.querySelector('.modal:not(.visually-hidden)');
  currentModal.classList.add('visually-hidden');
  overlay.classList.add('modal-overlay-hidden');
});

let writeUsButton = document.querySelector('.button-write-us');
if (writeUsButton) {
  writeUsButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    let feedbackDiv = document.querySelector('.feedback-form');
    feedbackDiv.classList.remove('visually-hidden');
    overlay.classList.remove('modal-overlay-hidden');
  });
}

let mapButton = document.querySelector('.map-small');
if (mapButton) {
  mapButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    let mapLargeDiv = document.querySelector('.map-large');
    mapLargeDiv.classList.remove('visually-hidden');
    overlay.classList.remove('modal-overlay-hidden');
  });
}

let closeModalButtons = document.querySelectorAll('.modal-form-close');
if (closeModalButtons.length) {
  for (let i = 0; i < closeModalButtons.length; i++) {
    closeModalButtons[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      this.parentElement.classList.add('visually-hidden');
      overlay.classList.add('modal-overlay-hidden');
    })
  }
}

for (let i = 1; i <=3 ; i++) {
  let servicesButton = document.querySelector('button[name=services-button' + i + ']');

    if (servicesButton) {
      servicesButton.addEventListener('click', function (evt) {
        evt.preventDefault();
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
      });
    }
}

let toCartButtons = document.querySelectorAll('.button-buy');
if (toCartButtons.length) {
  for (let i = 0; i < toCartButtons.length; i++) {
    toCartButtons[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      let toCartDiv = document.querySelector('.modal-cart');
      toCartDiv.classList.remove('visually-hidden');
      overlay.classList.remove('modal-overlay-hidden');
    })
  }
}


let slider = document.querySelector('.features-promo-slider');

if (slider) {
  let buttonSliderPrevious = slider.querySelector('.slider-previous');
  let buttonSliderNext = slider.querySelector('.slider-next');
  let buttonsDot = slider.querySelectorAll('.dot');

  function sliderChange(newSlideNumber) {
    let currentSliderItem = slider.querySelector('.promo-slider-item:not(.visually-hidden)');
    let currentButtonItem = slider.querySelector('.dot-active');
    let newSliderItem = slider.querySelector('.promo-slider-item:nth-child(' + newSlideNumber + ')');
    let newButtonItem = slider.querySelector('.dots-container li:nth-child(' + newSlideNumber + ') .dot');
    currentSliderItem.classList.add('visually-hidden');
    currentButtonItem.classList.remove('dot-active');
    newSliderItem.classList.remove('visually-hidden');
    newButtonItem.classList.add('dot-active');
  }

  if (buttonSliderNext) {
    buttonSliderNext.addEventListener('click', function (evt) {
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
  }

  if (buttonSliderPrevious) {
    buttonSliderPrevious.addEventListener('click', function (evt) {
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
  }

  if (buttonsDot.length) {
    for (let i = 1; i <= buttonsDot.length; i++) {
      buttonsDot[i - 1].addEventListener('click', function (evt) {
        evt.preventDefault();
        sliderChange(Number(i));
      });
    }
  }
}

let sliderPrice = document.querySelector('.price-slider');

if (sliderPrice) {

  let sliderLineActive = document.querySelector('.slider-line-active');
  let sliderPriceFrom = document.querySelector('.slider-from');
  let sliderPriceTo = document.querySelector('.slider-to');
  let inputPriceFrom = document.querySelector('.price-from');
  let inputPriceTo = document.querySelector('.price-to');
  let initialOffsetLeftPriceFrom = sliderPriceFrom.offsetLeft;
  let initialOffsetLeftPriceTo = sliderPriceTo.offsetLeft;
  let currentOffsetLeftPriceFrom = initialOffsetLeftPriceFrom;
  let currentOffsetLeftPriceTo = initialOffsetLeftPriceTo;
  let rulerWidth = initialOffsetLeftPriceTo - initialOffsetLeftPriceFrom - 20;
  let minPrice = Number(sliderPrice.dataset.minprice);
  let maxPrice = Number(sliderPrice.dataset.maxprice);
  let rulerStep = (maxPrice - minPrice) / (initialOffsetLeftPriceTo - initialOffsetLeftPriceFrom - 20);
  let posFromStart;
  let posToStart;

  sliderPriceFrom.onmousedown = sliderFromMouseDown;
  sliderPriceTo.onmousedown = sliderToMouseDown;

  function sliderFromMouseDown(evt) {
    evt.preventDefault();
    posFromStart = evt.clientX;
    console.log('currentOffsetLeftPriceTo: ' + currentOffsetLeftPriceTo);
    document.onmousemove = sliderFromMouseMove;
    document.onmouseup = sliderMouseUp;
  }

  function sliderToMouseDown(evt) {
    evt.preventDefault();
    posToStart = evt.clientX;
    document.onmousemove = sliderToMouseMove;
    document.onmouseup = sliderMouseUp;
  }

  function sliderFromMouseMove(evt) {
    evt.preventDefault();
    let posNew = evt.clientX;
    let newOffset = sliderPriceFrom.offsetLeft + posNew - posFromStart;
    posFromStart = posNew;

    if(newOffset < initialOffsetLeftPriceFrom) {
      sliderPriceFrom.style.left = initialOffsetLeftPriceFrom + 'px';
      currentOffsetLeftPriceFrom = initialOffsetLeftPriceFrom;

      sliderLineActive.style.left = initialOffsetLeftPriceFrom + 20 + 'px';
    }
    else if (newOffset > currentOffsetLeftPriceTo - 20) {
      sliderPriceFrom.style.left = currentOffsetLeftPriceTo - 20 + 'px';
      currentOffsetLeftPriceFrom = currentOffsetLeftPriceTo - 20;

      sliderLineActive.style.left = currentOffsetLeftPriceTo + 'px';
    }
    else {
      sliderPriceFrom.style.left = newOffset + 'px';
      currentOffsetLeftPriceFrom = newOffset;

      sliderLineActive.style.left = newOffset + 'px';
    }

    inputPriceFrom.value = Math.round(minPrice + rulerStep * (currentOffsetLeftPriceFrom - initialOffsetLeftPriceFrom ));
    sliderLineActive.style.width = currentOffsetLeftPriceTo - currentOffsetLeftPriceFrom + 'px';

  }

  function sliderToMouseMove(evt) {
    evt.preventDefault();
    let posNew = evt.clientX;
    let newOffset = sliderPriceTo.offsetLeft + posNew - posToStart;
    posToStart = posNew;

    if(newOffset > initialOffsetLeftPriceTo) {
      sliderPriceTo.style.left = initialOffsetLeftPriceTo + 'px';
      currentOffsetLeftPriceTo = initialOffsetLeftPriceTo;
    }
    else if (newOffset < currentOffsetLeftPriceFrom + 20) {
      sliderPriceTo.style.left = currentOffsetLeftPriceFrom + 20 + 'px';
      currentOffsetLeftPriceTo = currentOffsetLeftPriceFrom + 20;
    }
    else {
      sliderPriceTo.style.left = newOffset + 'px';
      currentOffsetLeftPriceTo = newOffset;
    }

    inputPriceTo.value = Math.round(maxPrice - rulerStep * (initialOffsetLeftPriceTo - currentOffsetLeftPriceTo));
    sliderLineActive.style.width = currentOffsetLeftPriceTo - currentOffsetLeftPriceFrom + 'px';
  }

  function sliderMouseUp(evt) {
    evt.preventDefault();
    document.onmouseup = null;
    document.onmousemove = null;
  }
}