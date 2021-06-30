const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const canvasNetWidth = 4;
const canvasNetHeight = canvas.height;

const paddlerWidth = 10;
const paddlerHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;

const canvasNet =  {
    x : canvas.width/2 - canvasNetWidth/2,
    y : 0,
    width : canvasNetWidth,
    height : canvasNetHeight,
    color : "#FFFFFF"
};

const player = {
    x : 10,
    y : canvas.height/2 - paddlerHeight/2,
    width : paddlerWidth,
    height : paddlerHeight,
    color : "#FFFFFF",
    score : 0
};

const computer = {
    x : canvas.width - paddlerWidth - 10,
    y : canvas.height/2 - paddlerHeight/2,
    width : paddlerWidth,
    height : paddlerHeight,
    color : "#FFFFFF",
    score : 0
};

const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 7,
    velocity : 7,
    color : "#05EDFF",
    velocityXaxis : 5,
    velocityYaxis : 5
};

function drawCanvasNet() {
    context.fillStyle = canvasNet.color;
    context.fillRect(canvasNet.x, canvasNet.y, canvasNet.width, canvasNet.height);
}

function drawScore(x, y, score){
    context.fillStyle = "#fff";
    context.font = "35px sans-serif";
    context.fillText(score, x, y);
}

function drawPaddler(x, y, width, height, color){
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawBall(x, y, radius, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

function render(){
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawCanvasNet()
    drawScore(canvas.width/4, canvas.height/6, player.score);
    drawScore(3*canvas.width/4, canvas.height/6, computer.score);
    drawPaddler(player.x, player.y, player.width, player.height, player.color);
    drawPaddler(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawBall(ball.x, ball.y, ball.radius, ball.color);
}

window.addEventListener("keydown", KeyDownHandler);
window.addEventListener("keyup", KeyUpHandler);

function KeyDownHandler(event){
    switch(event.keyCode){
        case 38: upArrowPressed = true;
        break;
        case 40: downArrowPressed = true;
        break;
    }
}

function KeyUpHandler(event){
    switch(event.keyCode){
        case 38: upArrowPressed = false;
        break;
        case 40: downArrowPressed = false;
        break;
    }
}

function resetTheBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocity = 7;

    ball.velocityXaxis = -ball.velocityXaxis;
    ball.velocityYaxis = -ball.velocityYaxis;
}

function detectCollision(player, ball){
    player.top = player.y;
    player.right = player.x + player.width;
    player.bottom = player.y + player.height;
    player.left = player.x;

    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}

function update(){
    
    if(upArrowPressed && player.y > 0){
        player.y -=8;
    }
    else if(downArrowPressed && player.y < canvas.height - player.height){
        player.y += 8;
    }
    if(ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0){
        ball.velocityYaxis = -ball.velocityYaxis;
    }
    if(ball.x + ball.radius >= canvas.width){
        player.score += 1;
        resetTheBall();
    }
    if(ball.x - ball.radius <= 0){
        computer.score += 1;
        resetTheBall();
    }

    ball.x += ball.velocityXaxis;
    ball.y += ball.velocityYaxis;
    
    computer.y += ((ball.y - (computer.y + computer.height / 2))) * 0.06;

    let playing = (ball.x < canvas.width/2) ? player : computer;
    if(detectCollision(playing, ball)){
        let angle = 0;

        if(ball.y < (playing.y + playing.height/2)){
            angle = -1 * Math.PI/4;
        }else if(ball.y > (playing.y + playing.height/2)){
            angle = Math.PI/4;
        }

        ball.velocityXaxis = (playing === player? 1 : -1) * ball.velocity * Math.cos(angle);
        ball.velocityYaxis = ball.velocity * Math.sin(angle);

        ball.velocity += 0.2;
    }
}

function game(){
    update();
    render();
}
setInterval(game, 1000/60);