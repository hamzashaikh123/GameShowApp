//Variables //
let qwerty = document.getElementById("qwerty");
let phrase = document.getElementById('phrase');
let missed= 0;
let startGame= document.getElementsByClassName('btn__reset');
const allButtons = document.querySelectorAll('button');
const screenOverlay= document.getElementById('overlay');

const phrases = [
    'toronto raptors',
    'utah jazz',
    'chicago bulls',
    'miami heat'
];

let ul = document.querySelector('#phrase ul');
let phraseArray=getRandomPhraseAsArray(phrases);  
const letters = document.getElementsByClassName('letter');
const lives = document.getElementsByClassName('tries');
const shownLetters=document.getElementsByClassName("show");


//game setup
function getRandomPhraseAsArray(arr){
    let splitArray=[];
    let randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    for (let i = 0; i<randomPhrase.length; i+=1){
        if(randomPhrase[i]!=','){
            splitArray.push(randomPhrase[i]);
        }
    }
    return splitArray;
};
//creating the letters for gameboard
function addPhrasestoDisplay(phraseArray){ 
    for (let i =0 ; i<phraseArray.length; i+=1){
        let HTMLItem= document.createElement('li');
        HTMLItem.textContent=phraseArray[i];
        if(phraseArray[i]!=" "){
            HTMLItem.classList.add("letter");
            HTMLItem.classList.add("transition");
        }
        else {
            HTMLItem.classList.add("space");
        }
        ul.appendChild(HTMLItem);
    }
};

//reseting the gameboard at the start of every
function resetGameBoard(){
    //get a new phrase
    phraseArray=getRandomPhraseAsArray(phrases);
    addPhrasestoDisplay(phraseArray);
    
    //reset the game board
    for(let i = 0; i<allButtons.length;i+=1){
        allButtons[i].removeAttribute("disabled");
        allButtons[i].setAttribute("class","");
    }
    //reset the number of lives
    for (let x = 0; x<lives.length;x+=1){
        lives[x].style.display="inline";
    };
    missed=0;
};
//removing the elements from the previous game (if applicable)
function newGame(){
    if(ul.childElementCount>0){
        while(ul.childElementCount>0){
            ul.removeChild(ul.lastElementChild);
        }
        resetGameBoard();
    }
    else {
        resetGameBoard();
    }
};

//start game//
startGame[0].addEventListener('click', ()=>{
    screenOverlay.style.display='none';
    newGame();
});


//choosing a letter function//
function checkLetters(button){
    let lettersClass = document.getElementsByClassName('letter');
    let returnLetter=null;
    let x = 0;
    while (x<lettersClass.length)
    {
        if(lettersClass[x].textContent===button){
            lettersClass[x].classList.add('show');
            returnLetter=letters[x].textContent;
        }
        x+=1;
    }
    return returnLetter;
};

function gameOver(){
    const screenTitle= document.getElementsByClassName('title');
    if(shownLetters.length === letters.length){
        setTimeout(() => {
            screenOverlay.className="win";
            screenOverlay.style.display="block";
            screenTitle[0].textContent="Congrats! You've won!";
            startGame[0].textContent="Restart Game";
        }, 2000);
    }
    if(missed >=5){
        setTimeout(() => {
            screenOverlay.className="lose";
            screenOverlay.style.display="block";
            screenTitle[0].textContent="Sorry you've lost. Better luck next time!";
            startGame[0].textContent="Restart Game";
        }, 2000);

    }

};

//listening to button clicks on the letter keyboard//
qwerty.addEventListener("click", button =>{
    if(button.target.tagName==="BUTTON")
    {
        button.target.classList.add('chosen');
        button.target.setAttribute('disabled', true);
    }
    let letterFound = checkLetters(button.target.textContent);
    if (letterFound===null){
        lives[missed].style.display='none';
        missed+=1;
    }
     gameOver();


});

