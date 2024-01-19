/**********
 Global Var
 ***********/
let canvas, canvasContext;

// Bricks
const BRICK_W = 100;
const BRICK_H = 40;
const BRICK_GAP = 10;
const BRICK_COLS = 8;
const BRICK_ROWS = 3;
const brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
let brickCount = 0;

// Ball
let ballX = 75;
let ballSpeedX = 8;
let ballY = 75;
let ballSpeedY = 8;

// Main Paddle
let paddleX = 400;
const PADDLE_THICKNESS = 15;
const PADDLE_WIDTH = 100;
const PADDLE_DIST_FROM_EDGE = 60;

// Mouse
let mouseX = 0;
let mouseY = 0;

// Touch
let touchX = 0;
let touchY = 0;

/**********
 General GamePlay
 ***********/
window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);
    canvas.addEventListener('touchmove', updateTouchPos);
    brickReset();
    ballRest();
}


function updateAll() {
    movement();
    playArea();
}

function ballRest() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function brickReset() {
    brickCount = 0;
    let i;
    for (i = 0; i < 3 * BRICK_COLS; i++) {
        brickGrid[i] = false;
    }
    for (i = 0; i < BRICK_COLS * BRICK_ROWS; i++) {
        brickGrid[i] = Math.random() < 0.5;
        brickGrid[i] = true;
        brickCount++;
    }
}

function ballMove() {
    // ballMovement
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // ballY
    if (ballY > canvas.height) {
        // ballSpeedY = -ballSpeedY;
        ballRest();
        brickReset();
    } else if (ballY < 0 && ballSpeedY > 0.0) {
        ballSpeedY = -ballSpeedY;
    }
    // ballx
    if (ballX > canvas.width && ballSpeedX > 0.0) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX < 0 && ballSpeedX < 0.0) {
        ballSpeedX = -ballSpeedX;
    }
}

function isBrickAtColRow(col, row) {
    if (col >= 0 && col < BRICK_COLS &&
        row >= 0 && row < BRICK_ROWS) {
        const brickIndexUnderCoord = rowColToArrayIndex(col, row);
        return brickGrid[brickIndexUnderCoord];
    } else {
        return false;
    }
}

function ballBrickColl() {
    const ballBrickCol = Math.floor(ballX / BRICK_W);
    const ballBrickRow = Math.floor(ballY / BRICK_H);
    const brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
    if (ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
        if (isBrickAtColRow(ballBrickCol, ballBrickRow)) {
            brickGrid[brickIndexUnderBall] = false;
            brickCount--;

            const prevBallX = ballX - ballSpeedX;
            const prevBallY = ballY - ballSpeedY;
            const prevBrickCol = Math.floor(prevBallX / BRICK_W);
            const prevBrickRow = Math.floor(prevBallY / BRICK_H);


            var bothTestFailed = true;

            if (prevBrickCol !== ballBrickCol) {
                if (isBrickAtColRow(prevBrickCol, ballBrickRow) === false) {
                    ballSpeedX = -ballSpeedX;
                    bothTestFailed = false;
                }
            }

            if (prevBrickRow !== ballBrickRow) {
                if (isBrickAtColRow(ballBrickCol, prevBrickRow) === false) {
                    ballSpeedY = -ballSpeedY;
                    bothTestFailed = false;
                }
            }

            if (bothTestFailed) {
                ballSpeedX = -ballSpeedX;
                ballSpeedY = -ballSpeedY;
            }

        }
    }
    // colorText(ballBrickCol+","+ballBrickRow+": "+brickIndexUnderBall, mouseX, mouseY, 'white');
}

function paddleMove() {
    // paddle
    var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleX + PADDLE_WIDTH;
    if (ballY > paddleTopEdgeY && // top of paddle
        ballY < paddleBottomEdgeY && // bottom of paddle
        ballX > paddleLeftEdgeX && // left half of paddle
        ballX < paddleRightEdgeX // right half of paddle
    ) {

        ballSpeedY = -ballSpeedY;

        var paddleCenterX = paddleX + PADDLE_WIDTH / 2;
        var ballDistFromCenterX = ballX - paddleCenterX;
        ballSpeedX = ballDistFromCenterX * 0.35;

        if (brickCount === 0) {
            brickReset();
        }

    }
}

function movement() {
    ballMove();
    ballBrickColl();
    paddleMove();
}

function updateMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH / 2;
}

function updateTouchPos(evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;

    touchX = evt.touches[0].clientX - rect.left - root.scrollLeft;
    touchY = evt.touches[0].clientY - rect.top - root.scrollTop;

    paddleX = (touchX - PADDLE_WIDTH / 2) * 2.7;
}

/**********
 GamePlay Draw functions
 ***********/
function playArea() {
    // gameCanvas
    colorRect(0, 0, canvas.width, canvas.height, '#333333');
    // ball
    colorCircle();
    // paddle
    colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, '#FBFFF1');

    drawbricks();
}

function colorRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}

function colorText(showWords, textX, textY, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
}

function rowColToArrayIndex(col, row) {
    return col + BRICK_COLS * row;
}

function drawbricks() {
    for (var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if (brickGrid[arrayIndex]) {
                colorRect(BRICK_W * eachCol, BRICK_H * eachRow,
                    BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, '#BF40BF');
            } //   if brick
        }// each brick
    }// each brickrow
}// drawbricks

function colorCircle() {
    canvasContext.fillStyle = '#FBFFF1';
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
    canvasContext.fill();
}
