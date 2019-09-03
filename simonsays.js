let colorPressed = "";
let rightColor = "";
let score = 0;
let count = 0;
let alreadyPressed = 0;
let highScore = 0;
let gameOverStatus = 0;
let simonSays = 0;
var randIndex = 0;
var clock;


colorList=["red","green","blue","yellow","black"];
highScoreArray=[];
simonSaysProbability=[1,1,1,1,1,0];


function countdown(){
    count = 4;
    clock = setInterval(function() {
        count--;
        document.getElementById("timer").innerHTML = count;

        if(count === 0) {
            if(simonSays === 1){
                gameover();
            }else if(simonSays === 0){
                setTimeout(generateColor, 1000);
                count = 4;
                score++;
                document.getElementById("score").innerHTML = "Score: " + score;
            }
        }
    }, 1000);
}

function randomizeColor() {
    if (colorList.length === 0) {
        colorList = ["red", "green", "blue", "yellow", "black"];
    }
    randIndex = parseInt(Math.random() * colorList.length);
    rightColor = colorList.splice(randIndex, 1);
    console.log(rightColor);
    console.log(simonSays);
}


function generateColor(){
    alreadyPressed = 0;
    //rightColor =  colorList[Math.floor(Math.random()*colorList.length)];
    simonSays =  simonSaysProbability[Math.floor(Math.random()*simonSaysProbability.length)];
    randomizeColor();
    if(simonSays === 1) {
        document.getElementById("command").innerHTML = "Simon says press " + rightColor;
    }else if(simonSays === 0){
        document.getElementById("command").innerHTML = "Press " + rightColor;
    }
}


function start(){
    if(document.getElementById("startEnd").innerHTML !== "Reset"){
        gameOverStatus = 0;
        generateDelay = setTimeout(generateColor,1000);
        countdown();
        score = 0;
        alreadyPressed = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
        document.getElementById("startEnd").innerHTML = "Reset";
        document.getElementById("highScore").innerHTML = null;
        document.getElementById("redButton").removeAttribute("disabled");
        document.getElementById("greenButton").removeAttribute("disabled");
        document.getElementById("blueButton").removeAttribute("disabled");
        document.getElementById("blackButton").removeAttribute("disabled");
        document.getElementById("yellowButton").removeAttribute("disabled");

    }else if(document.getElementById("startEnd").innerHTML === "Reset"){
        gameOverStatus = 1;
        count = 0;
        score = 0;
        alreadyPressed = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
        document.getElementById("timer").innerHTML = "...";
        document.getElementById("startEnd").innerHTML = "Start";
        document.getElementById("command").innerHTML = "Simon says... ready when you are!";
        clearInterval(clock);
        document.getElementById("redButton").setAttribute("disabled","disabled");
        document.getElementById("greenButton").setAttribute("disabled","disabled");
        document.getElementById("blueButton").setAttribute("disabled","disabled");
        document.getElementById("yellowButton").setAttribute("disabled","disabled");
        document.getElementById("blackButton").setAttribute("disabled","disabled");

    }
}

function gameover(){
    clearInterval(clock);
    gameOverStatus = 1;
    highScoreArray.push(score);
    highScore = Math.max.apply(null, highScoreArray);
    score = 0;
    alreadyPressed = 0;
    document.getElementById("highScore").innerHTML = "High Score: " + highScore;
    document.getElementById("timer").innerHTML = "...";
    document.getElementById("command").innerHTML = "Simon says try harder!";
    document.getElementById("startEnd").innerHTML = "Start";
    document.getElementById("redButton").setAttribute("disabled","disabled");
    document.getElementById("greenButton").setAttribute("disabled","disabled");
    document.getElementById("blueButton").setAttribute("disabled","disabled");
    document.getElementById("yellowButton").setAttribute("disabled","disabled");
    document.getElementById("blackButton").setAttribute("disabled","disabled");

}


function checkColor(){
    if(colorPressed == rightColor && simonSays === 1){
        if(alreadyPressed === 0 && gameOverStatus === 0) {
            alreadyPressed = 1;
            setTimeout(generateColor, 645);
            count = 4;
            score++;
            document.getElementById("score").innerHTML = "Score: " + score;
        }else if(alreadyPressed === 1 || gameOverStatus === 1){
            alreadyPressed = 1;
        }
    }if (colorPressed == rightColor && simonSays === 0){
        gameover();
    }if (colorPressed != rightColor && simonSays === 1){
        gameover();
    }
}

function pressRed(){
    colorPressed="red";
    checkColor();
}

function pressGreen(){
    colorPressed="green";
    checkColor();
}

function pressBlue(){
    colorPressed="blue";
    checkColor();
}

function pressYellow(){
    colorPressed="yellow";
    checkColor();
}

function pressBlack(){
    colorPressed="black";
    checkColor();
}