var drums = ["w", "a", "s", "d", "j", "k", "l"];

drums.forEach(function(drum) {
    // mouse down
    document.querySelector("."+drum).addEventListener("mousedown", function() {
        this.classList.toggle("pressed");
    })
    // mouseup
    document.querySelector("."+drum).addEventListener("mouseup", function() {
        audioSelector(this.innerHTML);

        this.classList.remove("pressed");
    })

    // mouse enter
    document.querySelector("."+drum).addEventListener("mouseenter", function() {
        this.classList.toggle("hover");
    })
    // mouse leave
    document.querySelector("."+drum).addEventListener("mouseleave", function() {
        this.classList.toggle("hover");
        this.classList.remove("pressed");
    })
})

// key down
document.addEventListener("keydown", function(e) {
    audioSelector(e.key);
    document.querySelector("."+e.key).classList.add("pressed");
})
// key up
document.addEventListener("keyup", function(e) {
    document.querySelector("."+e.key).classList.remove("pressed");
})

function audioSelector(selector){
    switch(selector) {
        case "w":
            var audio = new Audio("./sounds/crash.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("./sounds/kick-bass.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("./sounds/snare.mp3");
            audio.play();
            break;
        case "d":
            var audio = new Audio("./sounds/tom-1.mp3");
            audio.play();
            break;
        case "j":
            var audio = new Audio("./sounds/tom-2.mp3");
            audio.play();
            break;
        case "k":
            var audio = new Audio("./sounds/tom-3.mp3");
            audio.play();
            break;
        case "l":
            var audio = new Audio("./sounds/tom-4.mp3");
            audio.play();
            break;
        default:
            console.log(selector);
    }
}