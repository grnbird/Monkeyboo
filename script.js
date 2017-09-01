    var box = document.getElementById('box');
    var container = document.getElementById('container');

    var boxleft = 0;
    var boxtop =0;
    
    var counter = 0;
    var hscore = [0];



/*############## Banana Spawn #############*/

function rangen(p){
    var ran = Math.floor((Math.random() * p))*100;
    if (ran == undefined){
        console.log(ran);
        rangen(p);            
    }
    return(ran); 
}    


function genFoods(x1,y1){
    console.log(x1+" fh: "+fh+" genfood "+y1+" fw: "+fw);
//    var x1 = a;
//    var y1 = b;
    var fw = rangen(5);
    var fh = rangen(7); 
    while(fh == x1 && fw == y1){
        console.log(x1+" fh: "+fh+" while "+y1+" fw: "+fw);
        fw = rangen(5);
        fh = rangen(7);
    }
    
    if (document.getElementById("food") != null)
        {
            document.getElementById("food").remove()
        }       
    
    var food = document.createElement('div')     
    food.id = "food";
    food.className = "food";
    document.getElementById('container').appendChild(food);       

    var foodimg = document.createElement('img');
    foodimg.src = "banana-glitter.gif";
    foodimg.alt = "BANANA";
    foodimg.className = "banana";
    food.appendChild(foodimg);
    
    food.style.top = fh + "px"; 
    food.style.left = fw + "px"; 
    
    
}

/*################## Movement #################*/

function move(press){  
    
    box.style.left = boxleft + 'px'; 
    box.style.top = boxtop + 'px';
    // right
    if(press.keyCode==39){
        if(boxleft < 400){
            boxleft += 100;
            box.style.left = boxleft + 'px'; 
        }        
    }
    
    //left
    if(press.keyCode==37){
        if(boxleft<=0){
            boxleft += 100;
        }
        boxleft -= 100;
        box.style.left = boxleft + 'px';        
    }
    
    //bottom
    if(press.keyCode==40){
        if(boxtop < 600){
            boxtop += 100;
            box.style.top = boxtop + 'px';
        }        
    }
    
    //top
    if(press.keyCode==38){
        if(boxtop<=0){
            boxtop += 100;
        }
        boxtop -= 100;
        box.style.top = boxtop + 'px';
    }    
    score();
}

/*#################### SCORE ###################*/

function score(){
    if (document.getElementById("food") != null){ 
    var x = parseInt(document.getElementById('food').style.top,10);
    
    var y = parseInt(document.getElementById('food').style.left,10);
        
    var y1 = parseInt(document.getElementById("box").style.left,10);
        
    var x1 = parseInt(document.getElementById("box").style.top,10);

    var y1 = parseInt(document.getElementById("box").style.left,10);       
    if( x == x1 && y == y1){
            counter +=1;
            document.getElementById("scoreCount").innerHTML="<h1>SCORE: " + counter + "</h1>";
            beep();
            genFoods(x1,y1);
        }
    }  
}

/*#################### Start ###################*/

function startGame(){
    var sec = 30;
    startButton.style.display="none";     
    document.getElementById("scoreCount").innerHTML="<h1>SCORE: " + counter + "</h1>";   
    document.getElementById("hScore").innerHTML="<h1>HIGH SCORE: " + hscore[0] + "</h1>";
    timer(sec,"timer");
    genFoods(0,0); 
    document.onkeydown = move;
}

/*#################### TIMER ###################*/

function timer(sec,elem){
    
    var element = document.getElementById(elem);    
    
    
    element.innerHTML = "<h1>TIME: " + sec + "</h1>"; 
    
    
    if(sec >= -1){
        sec--;
        var timer = setTimeout('timer('+sec+', "'+elem+'")',1000);        
    }  
    if(sec < -1){
        clearTimeout(timer);
        stopGame();
    }
}

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}

/*#################### STOP ###################*/

function stopGame(){
    if (document.getElementById("food") != null)
        {
            document.getElementById("food").remove()
        }
    this.boxleft = 0;
    this.boxtop = 0;
    box.style.top = "0px"; 
    box.style.left = "0px";
    
    var myScore = this.counter;    
    hscore.push(myScore);     
    var ranks = rank(myScore);
    var ranking= ranks.toLowerCase();
    
    alert("Your score: " + myScore + "\nYou are a " + ranking + " monkey!\nPress Ok to continue");
    
    hscore.sort(function(a, b){return b - a})    
    document.getElementById("hScore").innerHTML = "<h1>HIGH SCORE: " + hscore[0] + " (" + ranks + " MONKEY)</h1>"; 
    
    counter = 0;    
    document.getElementById("scoreCount").innerHTML="<h1>SCORE: " + counter + "</h1>";
    document.getElementById("timer").innerHTML = "<h1>TIME: " + 30 + "</h1>";
    document.onkeydown = startGame;
}

/*#################### RANK ###################*/

function rank(score){
    if (score == 0){
        return "DUMB";
    }
    if (score <= 10 && score > 0){
        return "LAZY";
    }
    if (score <= 20 && score > 10){
        return "EASY";
    }
    if (score <= 30 && score > 20){
        return "BUSY";
    }
    if (score > 30){
        return "CRAZY";
    }
}