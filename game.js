
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

var started = false;
var level = 0;
$(document).keypress(function(){
    if(!started){
        
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})


$(".btn").on("click", function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
})


function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);


    let randomNumber = Math.floor((Math.random() * 4));
    let randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);

    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);        
}



function playSound(name){
    var colorSound = new Audio("./sounds/" + name + ".mp3");
    colorSound.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    },100);
}





