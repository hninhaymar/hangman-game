//Global Variables - these won't be refreshed at every game reset
var wordBank = ['family','mother','son','daughter','children','child','baby',
'relative','husband','wife','nephew','niece',
'cousin','brother','sister','sibling','aunt','uncle','grandmother','grandfather'];
var wins = 0; 
var losses = 0;
var wordBlanks = document.getElementById("word-blanks");

//game object
var hangmanGame = {
    guessesLeft : 9,
    wrongGuesses : "",
    placeholder : "",
    randomWord : "",
    paddedRandomWord : "",
    randomLength : 0,
    resetGame : function(){
        this.guessesLeft = 9;
        this.wrongGuesses = "";

        this.randomWord = generateRandomWord();
        this.randomLength = this.randomWord.length;
        console.log("length of " + this.randomWord + " is " + this.randomLength);
        this.placeholder = "";
        this.paddedRandomWord = "";

        for(i = 0; i < this.randomLength; i++){
            this.placeholder += "_ ";
            this.paddedRandomWord += this.randomWord[i] + " ";
        }
        console.log(this.paddedRandomWord);
        //set placeholder (gives users a hint of the length of the word)

        wordBlanks.textContent = this.placeholder;
        document.getElementById("guesses-left").textContent =  this.guessesLeft;
        document.getElementById("wrong-guesses").textContent =  this.wrongGuesses;
    }
}; //end of hangman game object

//replace characters at a particular index with whatever "replace" character is
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

function generateRandomWord() {
    var  randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log("randomWord: " + randomWord);
    return randomWord;
}

//before anythign happens, reset the game
hangmanGame.resetGame();

// Next, get user key input, using onkeyup event
document.onkeyup = function(event) {
    var userKey = event.key;
    console.log("User Entered: " + userKey);
    
    //loop through the randomWord for each character and see if userKey is found

    var wrong = false;
    if(hangmanGame.placeholder != hangmanGame.paddedRandomWord && (hangmanGame.guessesLeft >= 0)){
        if(userKey.charCodeAt(0) >= 97 && userKey.charCodeAt(0) <= 122){
            hangmanGame.guessesLeft--;
        }
        
        for(var i = 0; i < hangmanGame.randomLength; i++){
            if(hangmanGame["randomWord"].charAt(i) === userKey){
                hangmanGame.placeholder = replaceAt(hangmanGame.placeholder, i*2, userKey);
                wrong = true;
            }
        }
        if(!wrong){
            hangmanGame.wrongGuesses+= userKey + " ";
        }

        if(hangmanGame.placeholder === hangmanGame.paddedRandomWord){
            wins++;
            console.log("Won! here's the placeholder now. " + hangmanGame.placeholder);
            wordBlanks.textContent = hangmanGame.placeholder;
            var audio = new Audio("assets/audio/winningTriamph.mp3");
            audio.play();
            alert("Yay!! You Win! Successfully guessed the word : " + hangmanGame.randomWord);
            hangmanGame.resetGame();
            
        }
        else if(hangmanGame.guessesLeft < 0 && (hangmanGame.placeholder != hangmanGame.paddedRandomWord)){
            alert("Lost this round! Try again");
            losses++;
            hangmanGame.resetGame();
        }

        
    }

    wordBlanks.textContent = hangmanGame.placeholder;
    document.getElementById("guesses-left").textContent =  hangmanGame.guessesLeft;
    document.getElementById("wrong-guesses").textContent =  hangmanGame.wrongGuesses;
    document.getElementById("loss-counter").textContent =  losses;
    document.getElementById("win-counter").textContent =  wins;

    
};


    


