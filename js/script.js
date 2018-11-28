console.log('it works!')

var loginButton = document.querySelector('.user-nav-login')
var closeModalButtons = document.querySelectorAll('.modal-form-close')
var overlay = document.querySelector('.modal-overlay')

loginButton.addEventListener('click', function (evt) {
  evt.preventDefault()
  var loginDiv = document.querySelector('.feedback-form')
  overlay.classList.remove('visually-hidden')
  loginDiv.classList.remove('visually-hidden')
})

for (var i = 0; i < closeModalButtons.length; i++) {
  closeModalButtons[i].addEventListener('click', function (evt) {
    evt.preventDefault()
    this.parentElement.classList.add('visually-hidden')
    overlay.classList.add('visually-hidden')
  })
}
