let s=prompt("PLEASE ENTER THE SPEED OF SNAKE(GREATER THAN 0): ");
let inputDir = { x: 0, y: 0 };
const food = new Audio('food.mp3');
const gamemusic = new Audio('gamemusic.mp3');
const gameover = new Audio('gameover.mp3');
const move = new Audio('move.mp3');
let speed=s;
let last_screen_time = 0;
let snake_array = [
    { x: 15, y: 15 }
]
let khana = { x: 5, y: 5 }
let score = 0;
//functions in game
function body(current_time) {
    window.requestAnimationFrame(body);
    // console.log(current_time);
    if ((current_time - last_screen_time)/1000<(1/speed)) {
        return;
    }
    last_screen_time = current_time;
    gameheart();

}
function takkar(snake) {
    //hitting itself
    for (let i = 1; i < snake_array.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // hitting wall
    if (snake[0].x >=30 || snake[0].x <= 0 || snake[0].y >= 30 || snake[0].y <= 0) {
        return true;
    }

    return false;
}
function gameheart() {
    //updating the snake and food
    if (takkar(snake_array)) {
        gamemusic.pause();
        gameover.play();
        inputDir = { x: 0, y: 0 };
        alert("GAME OVER !!! Press ENTER to play again!");
        snake_array = [{ x: 15, y: 15 }];
        gamemusic.play();
        score = 0;
    }
    // if eats the food
    if (snake_array[0].y === khana.y && snake_array[0].x === khana.x) {
        food.play();
        score += 1;
        points.innerHTML = "SCORE : " + score;
        snake_array.unshift({ x: snake_array[0].x + inputDir.x, y: snake_array[0].y + inputDir.y });
        let a = 2;
        let b = 28;
        khana = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    // Moving the snake
    for (let i = snake_array.length - 2; i >= 0; i--) {
        snake_array[i + 1] = { ...snake_array[i] };
    }
    snake_array[0].x += inputDir.x;
    snake_array[0].y += inputDir.y;
    //displaying the new screen
    //display snake body
    gameboard.innerHTML = ("");
    snake_array.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
            snakeElement.classList.add('snakebody');
            gameboard.appendChild(snakeElement);
        })
        //display food
        khanaElement = document.createElement('div');
        khanaElement.style.gridRowStart = khana.y;
        khanaElement.style.gridColumnStart = khana.x;
        khanaElement.classList.add('food');
        gameboard.appendChild(khanaElement);
    }

//logics
window.requestAnimationFrame(body);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // Start the game
    move.play();
    gamemusic.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

})
