const buttonStart = document.getElementById('start')
const progressBar = document.querySelector('#progress-bar div')
const corrects = document.querySelector('#corrects span')
const errors = document.querySelector('#errors span')
const ppm = document.querySelector('#ppm span')
const data = document.querySelector('#data')
const restarBtn = document.querySelector('#restar')
const wordContainer = document.getElementById('word')
const input = document.querySelector('input')

const time = 60
let lettersCorrects;
let lettersIncorrects;
let FinishedWords;
let listLetter = [];
let ppmE;
let indexAct = 0;
let play = false

function start() {
    play = true
    wordContainer.classList.toggle('hidden', false)
    reset();
    newWord()
    lettersCorrects = 0
    lettersIncorrects = 0
    FinishedWords = 0
    progressBar.classList.toggle('completeTime', true)
    buttonStart.classList.toggle('hidden', true)
    data.classList.toggle('hidden', true)
    listLetter[0].classList.toggle('letterActive')
}

function newWord() {
    indexAct = 0
    const numberOfWord = Math.floor(Math.random() * arrayWords.length-1);
    const wordChoosed = arrayWords[numberOfWord]
    if (listLetter.length > 0) {
        listLetter.forEach(letter => wordContainer.removeChild(letter))
    }
    listLetter = []
    for (let i = 0; i < wordChoosed.length; i++) {
        const letterElement = document.createElement('span')
        letterElement.textContent = wordChoosed[i]
        wordContainer.appendChild(letterElement)
        listLetter.push(letterElement)
        letterElement.addEventListener("animationend", ()=>{
			letterElement.classList.toggle("show",false);
		})
    }
}

function reset() {
    lettersCorrects = 0
    lettersIncorrects = 0
    FinishedWords = 0
    corrects.textContent = lettersCorrects;
    errors.textContent = lettersIncorrects;
}

function createLetterEfect(element) {
    const letter = element.textContent
    const positionLetter = element.getBoundingClientRect()
    element.classList.add('invisible')
    const newLetter = document.createElement('span')
    newLetter.textContent = letter
    console.log('posi',letter)
    newLetter.style.left = `${positionLetter.left}px`
    newLetter.style.top= `${positionLetter.top}px`
    
    newLetter.classList.add('disappear')
    document.body.appendChild(newLetter)
    newLetter.addEventListener("animationend", () => {
        document.body.removeChild(newLetter);
    })
}

function finish() {
    play = false
    data.classList.toggle('hidden', false)
    progressBar.classList.toggle('completeTime', false)
    corrects.textContent = lettersCorrects
    errors.textContent = lettersIncorrects
    ppm.textContent = FinishedWords * (60 / time)
    wordContainer.classList.toggle('hidden', true)
}

buttonStart.addEventListener('click', () => {
    start()
})

restarBtn.addEventListener('click', () => {
    start()
})

progressBar.addEventListener('animationend', () => {
    finish()
})

input.focus()
document.documentElement.style.setProperty("--time", time + 's')
input.addEventListener('input', (event) => {

    if (!play) {
        if (event.data === ' ') start()
        return
    }

    if (event.data === listLetter[indexAct].textContent) {
        createLetterEfect(listLetter[indexAct])
        indexAct++
        lettersCorrects++
        corrects.textContent = lettersCorrects
        if (indexAct === listLetter.length) {
            newWord()
            FinishedWords++
        }
        listLetter[indexAct].classList.add('letterActive')

    }
    else {
        lettersIncorrects++
        errors.textContent = lettersIncorrects
    }
})
input.addEventListener('blur', () => input.focus())