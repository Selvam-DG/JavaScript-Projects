let count = 0;

const value = document.getElementById('value');
const decreaseButton = document.getElementById('decrease');
const resetButton = document.getElementById('reset');
const increaseButton = document.getElementById('increase');

decreaseButton.addEventListener('click', () => {
    count-- ;
    updateDisplay();
});

increaseButton.addEventListener( 'click', () => {
    count++ ;
    updateDisplay();
});

resetButton.addEventListener( 'click', () => {
    count = 0;
    updateDisplay();
})

function updateDisplay(){
    value.textContent = count ;
}