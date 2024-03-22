
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

var started = false;
var level = 0;

$(".btn-start").on("click", function(){
    if(!started){
        
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    $(".btn-start").fadeToggle();
} )

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
    checkAnswer(userClickedPattern.length - 1);
})


function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor((Math.random() * 4));
    let randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    setTimeout(() => {
        $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChoosenColour);     
    }, 600);   
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

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence(), 1000);
            userClickedPattern = [];
        }
    }
    else{        
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, press any key to restart!");

        startOver();

        $(".btn-start").fadeToggle();
        
    }
}






