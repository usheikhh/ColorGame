


var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = []; //holds the pattern of colors the game generates

var userClickedPattern = []; //holds the pattern of colors the user clicks

var level = 0; //tracks what level the user is in

var started = false; //tracks if game is running or not


$(document).keypress(function(){ //on keypress

  if(!started){ //if game is not already started
    started = true;  //set started to true
    nextSequence(); //call nextSequence
    $("h1").text("Level " + level); //updates h1 element to match user's level in the game
  }

});



function nextSequence(){
  userClickedPattern = []; //reset user sequence at every call

  var randomNumber = Math.floor(Math.random()*4); //chooses a random number 0-3

  var randomChosenColor = buttonColors[randomNumber]; //chooses a random color using random number

  gamePattern.push(randomChosenColor); //pushes random color to gamePattern variable

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //animated the random color

  playSound(randomChosenColor);

  level++; //increment level every time nextSequence is called

  $("h1").text("Level " + level); //updates h1 element to match user's level in the game

}


function playSound(name){
  var audio = new Audio("./sounds/"+name+".mp3");
  audio.play(); //plays the audio for color
}




function animatePress(currentColor){

  $("#"+currentColor).addClass("pressed"); //add pressed class to currentColor

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed"); //"# + currentColor" == the id of the button
  },100); //remove pressed class from currentColor after 100 ms
}



//using jQuery to detect when any button is clicked to trigger the handler function
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id"); //get the color of the button clicked from the id attribute

  userClickedPattern.push(userChosenColor); //add color to userClickedPattern

  animatePress(userChosenColor); //animated button clicked

  playSound(userChosenColor); //play sound of button clicked

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){ //checking if patterns match
    console.log("success"); //log success if pattern matches

    if(gamePattern.length == userClickedPattern.length){ //check when user input is done and call nextSequence
      setTimeout(function() {
        nextSequence();

      }, 1000);
    }

  } else{
    playSound("wrong"); //play sound if userClickedPattern is wrong

    $("body").addClass("game-over"); //play game over animation

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart"); //change h1

    console.log("Fail"); //log fail

    startOver();//call startOver
  }


}


function startOver(){ //reset level, gamePattern, and started 

  level = 0;
  gamePattern = [];
  started = false;

}
