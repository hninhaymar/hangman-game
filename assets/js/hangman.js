
//get the word's length, display the __ __ __ __ placeholders

//get user's input - from onkeyup event 

//make a word bank - an array of list of words
var wordBank = ['name','role','family','mother','son','daughter','children'];

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

var wins = 0; 
var losses = 0;
var guessesLeft = 9;
var wrongGuesses = "";
var placeholder = "";
var randomWord;
var paddedRandomWord = "";
var wordBlanks = document.getElementById("word-blanks");
var randomLength = 0;

function resetGame(){
    guessesLeft = 9;
    wrongGuesses = "";
    //randomly generate a word form the bank; i.e, "name"
    randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    randomLength = randomWord.length;
    console.log("randomWord: " + randomWord);
    console.log("length of " + randomWord + " is " + randomLength);
    placeholder = "";
    paddedRandomWord = "";

    for(i = 0; i < randomLength; i++){
        placeholder += "_ ";
        paddedRandomWord += randomWord[i] + " ";
    }
    console.log(paddedRandomWord);
    //set placeholder (gives users a hint of the length of the word)

    wordBlanks.textContent = placeholder;
    document.getElementById("guesses-left").textContent =  guessesLeft;
    document.getElementById("wrong-guesses").textContent =  wrongGuesses;
}

// Next, get user key input, using onkeyup event

resetGame();

document.onkeyup = function(event) {
    var userKey = event.key;
    console.log("User Entered: " + userKey);
    
    //loop through the randomWord for each character and see if userKey is found

    //decrement guessesLeft
    var wrong = false;
    if(placeholder != paddedRandomWord && (guessesLeft > 0)){
        guessesLeft--;
        for(var i = 0; i < randomLength; i++){
            if(randomWord.charAt(i) === userKey){
                placeholder = replaceAt(placeholder, i*2, userKey);
                wrong = true;
            }
        }
        if(!wrong){
            wrongGuesses+= userKey + " ";
        }

        if(placeholder === paddedRandomWord){
            wins++;
            wordBlanks.textContent = placeholder;
            alert("Yay!! You Win!");
            var reset = confirm("Do you want to reset the game?");
            if(reset){
                resetGame();
            }
            
        }
        else if(guessesLeft <= 0 && (placeholder != paddedRandomWord)){
            alert("Lost this round! Try again");
            losses++;
            resetGame();
        }
    }

    wordBlanks.textContent = placeholder;
    document.getElementById("guesses-left").textContent =  guessesLeft;
    document.getElementById("wrong-guesses").textContent =  wrongGuesses;
    document.getElementById("loss-counter").textContent =  losses;
    document.getElementById("win-counter").textContent =  wins;
};



// (h*30) + (m/12) - (m*6)
// 4:15 ==> (4*30) + (15/12) - (15*6) = 120 + 1.25 -90 = 31.25
// 6:41 == > (6*30) + (41/12) - (41*6) = 180 + 3.41 - 246 = 62.59

