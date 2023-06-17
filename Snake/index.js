const table = document.querySelector('.table');
const scoreDisplay = document.querySelector('.score');
const rePlay = document.querySelector('.rePlay');
const modul = document.querySelector('.modul');
let score=0;
let interval=1000;
let timer=0;
let snake = [1,0];
let apple=0;
let direction=1;
const width = 10;

document.addEventListener('keyup', turnSnake);
rePlay.addEventListener('click',playAgain);
function createTable(){
    for(let i=0;i<width*width;i++){
        table.appendChild(document.createElement('div'));
    }
}

function playAgain(){
    table.innerHTML="";
    createTable();
    clearInterval(timer);
    startGame();
}

function startGame(){
    score=0;
    snake = [1,0];
    direction=1;
    //rePlay.style.display='none';
    modul.style.display='none';
    grids = document.querySelectorAll('.table div');
    newApple(grids);
    renderSnake(grids);
    timer = setInterval(snakeReact,interval);
    direction=1;
    scoreDisplay.textContent=`Score: ${score}`;
}

function newApple(grids){
    do {apple = Math.floor(Math.random()*grids.length);}
    while(snake.includes(apple))
    grids[apple].classList.add('apple');
}

function renderSnake(){
    grids = document.querySelectorAll('.table div');
    snake.map(item=>grids[item].classList.add('snake'));
}

function snakeReact(){
    grids = document.querySelectorAll('.table div');
    if(hits()){
        modul.style.display='flex';
        return clearInterval(timer);
    }else{
        moveSnake(grids);
    }
}

function moveSnake(grids){
    let tail = snake.pop();
    grids[tail].classList.remove('snake');
    snake.unshift(snake[0]+direction);
    renderSnake();
    eatApple(tail);
}
function eatApple(tail){
    if(snake[0]===apple){
        score++;
        scoreDisplay.textContent=`Score: ${score}`;
        snake.push(tail);
        grids = document.querySelectorAll('.table div');
        grids[apple].classList.remove('apple');
        renderSnake();
        newApple(grids);
    }
}
function turnSnake(e){
    switch(e.keyCode){
        case 37://left
            direction = (-1);
            break;
        case 38: //up
            direction = (-width);
            break;
        case 39:// right
            direction = 1;
            break;
        case 40: //down
            direction = width;
            break;
        default:
            break;
    }
}
function hits()
{   if(((snake[0]+direction>width*width)&&direction==width)
    ||((snake[0]+direction<0)&&direction==-width)
    ||((snake[0]%width==0)&&direction==-1)
    ||((snake[0]%width==(width-1))&&direction==1)
    ||(snake.includes(snake[0]+direction)))
    return true;
    else return false;
}
createTable();
startGame();