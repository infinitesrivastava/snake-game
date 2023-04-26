//game constant & variables
let inputdir={x:0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed=10;
let score=0;
let lastpainttime=0;
let snakearr=[
    {x:13,y:15}
];

food={x:2,y:5};

//game function
function main(ctime){
    window.requestAnimationFrame(main);
    
    if((ctime-lastpainttime)/1000 <1/speed){
        return;
    }
    lastpainttime=ctime;
    gameEngine();
}

function iscollide(snake){
    for(let i=1;i<snakearr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    //if you hit into wall
    if(snake[0].x >= 25 || snake[0].x<= 0 || snake[0].y >=25 || snake[0].y <=0){
        return true ;

    }
    return false;
}

function gameEngine(){
    //increasing snake
    if(iscollide(snakearr)){
        gameOverSound.play();
        musicSound.pause();
        inputdir={x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snakearr=[{x:13, y:15}];
        musicSound.play();
        score=0;
    }
    //increment the score
    if(snakearr[0].y === food.y && snakearr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscorebox.innerHTML = "HiScore: " + hiscoreval;
        }
        scorebox.innerHTML = "Score: " + score;
        snakearr.unshift({x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y});
        let a = 2;
        let b = 24;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

       // Moving the snake
       for (let i = snakearr.length - 2; i>=0; i--) { 
        snakearr[i+1] = {...snakearr[i]};
    }
    
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}

// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputdir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }

});