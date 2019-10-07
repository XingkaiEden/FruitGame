var playing = false;
var score;
var trialsLeft;
var move;
var fruits = ["apple", "banana","cherries","grapes","mango","orange","peach","pear","watermelon"];
$(function () {  
// click start button 
    $("#button").click(function(){
//     if playing
        if(playing == true){
//reload page
            location.reload();
        }else{//else 
            playing = true;
            $("#button").text("Reset Game");//change start button to "reset game"
            $("#counter").show(); //show trialsLeft box
            score = 0;
            $("#scoreValue").html(score);
            trialsLeft = 3;
            addHearts();
            generator();// create random fruit// move fruit one step down
        }

    });
    
    

    


$("#fruit1").mouseover(function () {
    //if cut fruit
//play sound and explode fruit
// score +1
$("#fruit1").hide("explode",400);
    score++;
    $("#scorevalue").html(score);
    $("#sound")[0].play(); // you have to add index cause It returns an array
    clearInterval(move);
    
    setTimeout(() => {
        generator();
    }, 500);

  });
        







function addHearts(){
    $("#counter").empty();
    for(let i=0; i<trialsLeft; i++){
        $("#counter").append('<img src="images/heart.png" class="life">');
    }
    // console.log(trialsLeft);
}

function generator() { 
   
    chooseFruit();
    $("#fruit1").show();
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
    var step = Math.round(Math.random()*5) +1;
    var move = setInterval(function(){
     
    
        $("#fruit1").css("top",   $("#fruit1").position().top + step); // you can't get position seperately, cause you always get same position
        if($("#fruit1").position().top > $("#questionDisplay").height()){
            if(trialsLeft > 1){//if trial left
                trialsLeft -= 1; 
                addHearts();  //-1 heart 
                //go back to create random fruit
                chooseFruit();
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
                $("#fruit1").show();
                step = Math.round(Math.random()*5) +1; //update speed
            }else{
                trialsLeft -= 1; 
                addHearts(); 
                
                gameOver();
                // //else 
                // //show game over
                stopGenerator();
                
            }
        }
    },100);
 
}
 function chooseFruit(){
     var len = fruits.length;
     $("#fruit1").attr('src', 'images/'+fruits[Math.floor(Math.random()*len)]+'.png');
 }

 



  function gameOver(){
      $("#gameover").show();
      //message-change
        //button to "start game"
      $("#gameover").html("<p> GAME OVER! YOUR SCORE IS "+score);
      $("#button").text("Start Again");
  }


  function stopGenerator() {
      clearInterval(move);
        $("#fruit1").hide("explode",500);
    }

});