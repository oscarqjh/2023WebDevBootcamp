// get 2 random int
var randomNumber1 = Math.floor(Math.random() * 6 + 1);
var randomNumber2 = Math.floor(Math.random() * 6 + 1);
console.log(randomNumber1);
console.log(randomNumber2);

// set img 
document.querySelector(".img1").setAttribute("src", "./images/dice" + randomNumber1 + ".png");
document.querySelector(".img2").setAttribute("src", "./images/dice" + randomNumber2 + ".png");

// control flow for changing title to declare winner
if(randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 1 Won!🚩";
}
else if(randomNumber1 < randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 2 Won!🚩";
}
else{
    document.querySelector("h1").innerHTML = "Draw!";
}

