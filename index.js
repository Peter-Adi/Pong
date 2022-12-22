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
const slope = [2,2]
const speed = 2
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
    } else if(ballPosH <= leftBorderMargin - ballLeftExtent){
        velocityH = slope[0] * speed * -1
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

    slope[0] = velocityH / speed
    slope[1] = velocityV / speed
    ballPosH += velocityH
    ballPosV += velocityV
    //console.log(fieldExtent)
    //console.log(ballPosV)
    theBall.style.left = ballPosH + 'px'
    theBall.style.top = ballPosV + 'px'
    requestAnimationFrame(moveBall)
}

moveBall()