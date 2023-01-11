var cellSize = 25;
var rows = 20;
var col = 20;
var display;
var inDisplay;
var snakeX = cellSize * 5;
var snakeY = cellSize * 5;
var vx = 0;
var vy = 0;
var foodX;
var foodY;
var gameOver = false;
var snake = [];
var snakePos = [];
var score;
var scoreCnt = 0;
var refreshButton;

var flag = false;

window.onload = function()
{
    score = document.getElementById("score");
    refreshButton = document.getElementById("refresh");
    display = document.getElementById("display");
    display.height = rows * cellSize;
    display.width = col * cellSize;
    inDisplay = display.getContext("2d");
    
    placeFood();
    document.addEventListener("keyup", Direction);
    refreshButton.addEventListener("click" , refreshPage);
    setInterval(update, 200);
}

function refreshPage(e)
{
    location.reload();
}

function update()
{
    if(gameOver)
    {
        return;
    }

    DrawCanvas();
    DrawFood();
    snakeGrow();
    DrawSnake();
    checkGameOver();
    
}

function DrawCanvas()
{
    inDisplay.fillStyle = "black";
    inDisplay.fillRect(0, 0, display.width, display.height);
}

function DrawFood()
{
    inDisplay.fillStyle = "red";
    inDisplay.fillRect(foodX, foodY, cellSize, cellSize);
}

function checkGameOver()
{
    if(snakeX < 0 || snakeX > display.width - 1 || snakeY < 0 || snakeY > display.height - 1)
    {
        gameOver = true;
        stopGame();
    }     
}

function DrawSnake()
{
    for(let i = snake.length - 1; i > 0; --i)
    {
        snake[i] = snake[i-1];
    }
    if(snake.length)
    {
        snake[0] = [snakeX, snakeY];
    }

    inDisplay.fillStyle = "rgb(8, 195, 8)";
    snakeX += vx * cellSize;
    snakeY += vy * cellSize;
    inDisplay.fillRect(snakeX, snakeY, cellSize, cellSize);


    for(let i = 0; i < snake.length; ++i)
    {
        if(snakeX == snake[i][0] && snakeY == snake[i][1])
        {
            gameOver = true;
            stopGame();
            break;
        }
        inDisplay.fillRect(snake[i][0], snake[i][1], cellSize, cellSize);
    }
}

function snakeGrow()
{
    if(flag || snakeX == foodX && snakeY == foodY)
    {   
        scoreCnt++;
        score.innerText = scoreCnt;
        snake.push([foodX, foodY]);
        placeFood();
        flag = false;
    }    
}

function stopGame()
{
    inDisplay.fillStyle = "black";
    inDisplay.fillRect(0, 0, display.width, display.height);
    inDisplay.fillStyle = "red";
    inDisplay.font = "60px serif";    
    inDisplay.fillText(" Game Over ", 60, 230);    
}

function Direction(e)
{
    if(e.code == "ArrowUp" && vy != 1)
    {
        vx = 0;
        vy = -1;
    }
    else if(e.code == "ArrowDown" && vy != -1)
    {
        vx = 0;
        vy = 1;
    }
    else if(e.code == "ArrowLeft" && vx != 1)
    {
        vx = -1;
        vy = 0;
    }
    else if(e.code == "ArrowRight" && vx != -1)
    {
        vx = 1;
        vy = 0;
    }
}

function placeFood()
{
    foodX = Math.floor(Math.random() * col) * cellSize;
    foodY = Math.floor(Math.random() * rows) * cellSize;

}