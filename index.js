function buildPlayingField(){


    const borderThickInt = 5
    const totalBorder = borderThickInt * 2
    const padThickInt = 2
    const totalPad  = padThickInt * 2
    const innerAvailable = top.innerHeight - totalBorder - totalPad

    const gameContainer = document.createElement('div')
    gameContainer.setAttribute('id', 'gameContainer')
    gameContainer.style.height = innerAvailable + 'px'
    gameContainer.style.borderWidth = borderThickInt + 'px'
    document.body.style.padding = padThickInt +'px'
    //gameContainer.style.width = top.innerWidth + 'px'
    //gameContainer.innerText = 'Hello'
    document.getElementById('body').append(gameContainer)
    return borderThickInt + padThickInt
}



function rebiuldPlayingHeight(event){
    if (!document.getElementById('gameContainer')){
        buildPlayingField()
        return
    }
    document.getElementById('gameContainer').remove()
    buildPlayingField()
}

leftBorderMargin = buildPlayingField()

window.addEventListener('resize', rebiuldPlayingHeight)
const slope = [-2,2]
const speed = 1

var animation = false

function moveBall(){
    const theBall = document.getElementById('ball')
    let velocityH
    let velocityV
    let ballPosH = parseInt(getComputedStyle(theBall).left)
    let ballPosV = parseInt(getComputedStyle(theBall).top)
    const fieldExtentH = parseInt(getComputedStyle(document.getElementById('gameContainer')).width) + leftBorderMargin
    const fieldExtentV =parseInt(getComputedStyle(document.getElementById('gameContainer')).height) + leftBorderMargin
    const ballExtent = parseInt(getComputedStyle(document.getElementById('ball')).width)
    const ballLeftExtent = 0

    if (ballPosH >= fieldExtentH - ballExtent){ 
        velocityH = slope[0] * speed * -1
        hitRight()
    } else if(ballPosH <= leftBorderMargin - ballLeftExtent){
        velocityH = slope[0] * speed * -1
        hitLeft()        
    } else{
        velocityH = slope[0] * speed
    }

    if (ballPosV >= fieldExtentV - ballExtent){ 
        velocityV = slope[1] * speed * -1
    } else if(ballPosV <= leftBorderMargin - ballLeftExtent){
        velocityV = slope[1] * speed * -1
    } else{
        velocityV = slope[1] * speed
    }

    const leftPaddleRect = hitLeftPaddle()

    if (ballPosH <= leftPaddleRect.right && ballPosV >= leftPaddleRect.top - (ballExtent/2) && ballPosV <= leftPaddleRect.bottom - (ballExtent/2)) {
        if (slope[0] < 0) {
        velocityH = slope[0] * speed * -1
        }
    }

    const rightPaddleRect = hitRightPaddle()

    if ((ballPosH + ballExtent) >= rightPaddleRect.left && ballPosV >= rightPaddleRect.top - (ballExtent/2) && ballPosV <= rightPaddleRect.bottom - (ballExtent/2)) {
        if (slope[0] > 0) {
        velocityH = slope[0] * speed * -1
        }
    }

    slope[0] = velocityH / speed
    slope[1] = velocityV / speed

    ballPosH += velocityH
    ballPosV += velocityV
    
    theBall.style.left = ballPosH + 'px'
    theBall.style.top = ballPosV + 'px'
    
    animation = requestAnimationFrame(moveBall)
}

var playerLeftScore = 0
var playerRightScore = 0

function hitRight() {
    document.getElementById("scoreboxLeft").innerText = ++playerLeftScore
}

function hitLeft() {
    document.getElementById("scoreboxRight").innerText = ++playerRightScore
}

function hitLeftPaddle() {
    let elem = document.getElementById("leftPaddle");
    let rect = elem.getBoundingClientRect();
    return rect
}

function hitRightPaddle() {
    let elem = document.getElementById("rightPaddle");
    let rect = elem.getBoundingClientRect();
    return rect
}

document.addEventListener("keydown", (e) => {
    const leftP = document.getElementById("leftPaddle")
    const rightP = document.getElementById("rightPaddle")
    const fieldRect = document.getElementById("gameContainer").getBoundingClientRect()
    if (e.keyCode == 32 && animation) {
        pauseGame()
    } 
    else if (e.keyCode == 32 && !animation) {
    startGame()
    }
    if (e.keyCode == 87 && animation && leftP.getBoundingClientRect().top > 10) {
        leftP.style.top = leftP.getBoundingClientRect().top - 20 + "px"
    }
    if (e.keyCode == 83 && animation && leftP.getBoundingClientRect().bottom < fieldRect.bottom - 10) {
        leftP.style.top = leftP.getBoundingClientRect().top + 20   + "px"
        console.log(e.keyCode)
    }
    if (e.keyCode == 38 && animation && rightP.getBoundingClientRect().top > 10) {
        rightP.style.top = rightP.getBoundingClientRect().top - 20 + "px"
    }
    if (e.keyCode == 40 && animation && rightP.getBoundingClientRect().bottom < fieldRect.bottom - 10) {
        rightP.style.top = rightP.getBoundingClientRect().top + 20 + "px"
        console.log(e.keyCode)
    }
});

function startGame() {
    moveBall()
}

function pauseGame() {
    cancelAnimationFrame(animation)
    animation = false
}

//to do:    adjust paddle speed/increment.
//          stop before going past gameContainer borders
//          prevent default (smooth out paddle motion)
//          reset game/scoreboard
//          popup pause menu