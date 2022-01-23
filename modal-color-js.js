const winC = document.getElementById('modalColor')
let btnChangeBoard = document.querySelector('#myBtn')
btnChangeBoard.addEventListener('click', btnColor)
function btnColor() {
    winC.style.visibility = 'visible'
}