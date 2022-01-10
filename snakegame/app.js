const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');
const button = document.getElementById('start');


let food = null;
const h = 660;
const w = 900;
const cs = 60; // cell size 
let gameover = false;
let score = 0;

const snake = {
    init_len: 5,
    direction: 'right',
    cells: [],


    cleararray: function () {
        while (this.cells.length != 0) {
            this.cells.pop();

        }

    },
    createSnake: function () {
        score=0;
        this.init_len = 5;
        this.cleararray();
        for (let i = 0; i < this.init_len; i++) {
            this.cells.push({
                x: i,
                y: 0
            })
        }
    },
    drawSnake: function () {
        for (let cell of this.cells) {
            pen.fillRect(cell.x * cs, cell.y * cs, cs - 1, cs - 1);
        }
    },

    updateSnake: function () {

        let xhead = this.cells[this.cells.length - 1].x;
        let yhead = this.cells[this.cells.length - 1].y;
        if (xhead == food.x && yhead == food.y) {
            score++;
            food = getrandomfood();
        }
        else {
            this.cells.shift();
        }

        if (this.direction == 'down') {
            yhead++;
            if (yhead * cs >= h) {
                gameover = true;
                pen.fillStyle = '#2f4858';
                pen.fillText('Game Over', 20, 50);
                clearInterval(id);
                this.cleararray();

            }
        }
        else if (this.direction == 'up') {
            yhead--;
            if (yhead < 0) {

                gameover = true;
                pen.fillStyle = '#2f4858';
                pen.fillText('Game Over', 20, 50);

                clearInterval(id);;

                this.cleararray();

            }
        }
        else if (this.direction == 'left') {
            xhead--;
            if (xhead < 0) {
                gameover = true;
                pen.fillStyle = '#2f4858';
                pen.fillText('Game Over', 20, 50);

                clearInterval(id);

                this.cleararray();
            }
        }
        else {
            xhead++;
            if (xhead * cs >= w) {
                gameover = true;
                pen.fillStyle = '#2f4858';
                pen.fillText('Game Over', 20, 50);

                clearInterval(id);
                this.cleararray();
            }
        }

        var obj = {
            x: xhead,
            y: yhead
        }
        // chech hit condition
        for (let a of this.cells) {
            if (a.x == obj.x && a.y == obj.y) {
                gameover = true;
                pen.fillStyle = 'red';
                pen.fillText('Game Over', 50, 50);

                clearInterval(id);
                this.cleararray();
            }
        }
        this.cells.push({
            x: xhead,
            y: yhead
        });

    }
}


function init() { // initial conditions for game
    snake.createSnake();

    food = getrandomfood();

    function task(k) {

        if (k.key == 'ArrowDown') {
            snake.direction = 'down';
        }
        else if (k.key == 'ArrowUp') {
            snake.direction = 'up';
        }
        else if (k.key == 'ArrowLeft') {
            snake.direction = 'left';
        }
        else if (k.key == 'ArrowRight') {
            snake.direction = 'right';
        }

    }
    document.addEventListener('keydown', task);
}

function draw() {
    pen.clearRect(0, 0, w, h); // w-->900 and h-->700
    pen.fillStyle = '#8395a8';
    pen.fillText(`Score : ${score}`, 20, 100);
    pen.font = '40px fantasy';
    pen.fillStyle = '#f25c54';
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    pen.fillStyle = '#023047';

    snake.drawSnake();
}

function update() {

    snake.updateSnake();
}
function gameloop() {
    draw();
    update();
}

function getrandomfood() {
    let fx = Math.round(Math.random() * (w - cs) / cs); // powerful math functions !
    let fy = Math.round(Math.random() * (h - cs) / cs);
    if (fx == 0 && fy == 0) {
        fx = 7;
        fy = 7;
    }
    foodis = {
        x: fx,
        y: fy
    }
    return foodis;
}

let id;
button.addEventListener('click', function () {
    pen.clearRect(0, 0, w, h);
    init();
    snake.direction = 'right';
    //console.log('htjujjhjk,ku');
    const level = document.getElementById('level');

    if (level.value == 'first') {
        id = setInterval(gameloop, 700);
    }
    else if (level.value == 'third') {//hard
        id = setInterval(gameloop, 100);
    }
    else {
        id = setInterval(gameloop, 400);
    }

})

