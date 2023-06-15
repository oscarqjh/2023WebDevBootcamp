$(document).ready(function() {
    $("h1").css("color", "red");
})

$(document).keydown(function(e){
    console.log(e);
    $("h1").text(e.key);
})

$("button").click(function() {
    $("h1").fadeToggle();
})