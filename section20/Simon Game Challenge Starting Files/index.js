// random color
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

// user input
var userClickedPattern = [];

// click handler
$(".btn").on("mousedown", function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);

    // check answer
    var check = checkAnswer();
    if (check && (userClickedPattern.length === gamePattern.length)) {
        $("h1").text("Correct!");
        setTimeout(nextSequence(), 3000);
    }
    else if(!check && started) { // wrong ans
        resetGame();
    }
    else if(started && userClickedPattern.length > level) {
        resetGame();
    }
})

// hover handler
$(".btn").on("mouseenter", function() {
    var currentColour = this.id;
    animateHover(currentColour);
})
$(".btn").on("mouseleave", function() {
    var currentColour = this.id;
    animateHover(currentColour, false);
})

// The game
var level = 0;
var started = false;
var maxScore = 0;

// start game
$(document).on("keydown", function(e) {
    console.log(e.key);
    if(started === false) {
        started = true;
        nextSequence();
    }
})

// generate random int between 0-3
function nextSequence() {
    // increase level
    level++;
    $("h1").text("Level "+level);
    setMax();
    $("h2").text("Hi-Score: "+maxScore);

    // reset user input
    userClickedPattern.length = 0;

    // get next random color
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // button animation + sound
    for(var i = 0; i < gamePattern.length; i++){
        setTimeout(animate, (i+1) * 500, gamePattern, i);
    } 

    console.log(gamePattern);
}

// set max
function setMax() {
    if(maxScore < level) {
        maxScore = level;
    }
}

// reset game
function resetGame() {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    resetStat();
    setTimeout(function() {
        $("h1").text("Resetting Game...");
        setTimeout(function() {
            $("h1").text("Press A Key to Start");
        }, 1000);
    }, 1000);
}

// reset stat
function resetStat() {
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    started = false;
    level = 0;
}

// animate and sound of button
function animate(gamePattern, i) {
    $("#"+gamePattern[i]).fadeOut(200).fadeIn(200);
    playSound(gamePattern[i]);
}

// check user input
function checkAnswer() {
    if(gamePattern[userClickedPattern.length-1] === userClickedPattern[userClickedPattern.length-1]) {
        console.log("Correct");
        return true;
    }
    console.log("Wrong");
    return false;
}

// sound 
function playSound(name) {
    var buttonSound = new Audio("./sounds/"+name+".mp3");
    buttonSound.play();
}

// button click animation
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

// button hover animation
function animateHover(currentColour, on=true) {
    if(on === true) {
        $("#"+currentColour).addClass("hovered");
    }
    else {
        $("#"+currentColour).removeClass("hovered");
    }
}