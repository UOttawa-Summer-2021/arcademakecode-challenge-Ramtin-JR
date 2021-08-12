namespace SpriteKind {
    export const Button = SpriteKind.create()
    export const title = SpriteKind.create()
}
sprites.onDestroyed(SpriteKind.Button, function (sprite) {
    startGame()
})
function redPress () {
    red.setImage(assets.image`redButtonPush`)
    red.startEffect(effects.fountain, 500)
    music.playTone(262, music.beat(BeatFraction.Whole))
    pause(200)
    red.setImage(assets.image`redButton`)
    pause(pauseTime)
}
function bluePress () {
    blue.setImage(assets.image`blueButtonPush`)
    blue.startEffect(effects.fountain, 500)
    music.playTone(698, music.beat(BeatFraction.Whole))
    pause(200)
    blue.setImage(assets.image`blueButton`)
    pause(pauseTime)
}
function setButton () {
    red = sprites.create(assets.image`redButton`, SpriteKind.Player)
    red.setPosition(80, 40)
    green = sprites.create(assets.image`greenButton`, SpriteKind.Player)
    green.setPosition(80, 80)
    blue = sprites.create(assets.image`blueButton`, SpriteKind.Player)
    blue.setPosition(60, 60)
    yellow = sprites.create(assets.image`yellowButton`, SpriteKind.Player)
    yellow.setPosition(100, 60)
}
function gameMessage () {
    game.showLongText("To play the game you need to match the buttons that are being pressed", DialogLayout.Bottom)
    game.showLongText("Each arrow is equal to their corisbonding color, Ex. up button is red. ", DialogLayout.Bottom)
    game.showLongText("press a to start game", DialogLayout.Bottom)
}
function greenPressPlayer () {
    green.setImage(assets.image`greenButtonPush`)
    green.startEffect(effects.fountain, 100)
    music.playTone(494, music.beat(BeatFraction.Whole))
    pause(100)
    green.setImage(assets.image`greenButton`)
    pause(50)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    titleSprite.destroy()
    start.destroy()
})
function startGame () {
    scene.setBackgroundColor(10)
    setButton()
    lights = []
    userTurn = false
    rounds = 0
    pauseTime = 500
    timer = 15
    info.setLife(3)
    addLight()
    lightUp()
}
function bluePressPlayer () {
    blue.setImage(assets.image`blueButtonPush`)
    blue.startEffect(effects.fountain, 100)
    music.playTone(698, music.beat(BeatFraction.Whole))
    pause(100)
    blue.setImage(assets.image`blueButton`)
    pause(50)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (userTurn) {
        if (lights[currentGuess] == 3) {
            currentGuess += 1
            bluePressPlayer()
        } else {
            wrongGuess()
        }
        nextLevel()
    }
})
function lightUp () {
    if (rounds % 5 == 0) {
        timer += -2
        pauseTime += -100
    }
    for (let value of lights) {
        if (value == 0) {
            redPress()
        } else if (value == 1) {
            yellowPress()
        } else if (value == 2) {
            greenPress()
        } else {
            bluePress()
        }
    }
    game.splash("It is your turn!")
    userTurn = true
    currentGuess = 0
    info.startCountdown(timer)
}
function yellowPress () {
    yellow.setImage(assets.image`yellowButtonPush`)
    yellow.startEffect(effects.fountain, 500)
    music.playTone(330, music.beat(BeatFraction.Whole))
    pause(200)
    yellow.setImage(assets.image`yellowButton`)
    pause(pauseTime)
}
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (userTurn) {
        if (lights[currentGuess] == 1) {
            currentGuess += 1
            yellowPressPlayer()
        } else {
            wrongGuess()
        }
        nextLevel()
    }
})
function addLight () {
    randLight = randint(0, 3)
    lights.push(randLight)
}
function redPressPlayer () {
    red.setImage(assets.image`redButtonPush`)
    red.startEffect(effects.fountain, 100)
    music.playTone(262, music.beat(BeatFraction.Whole))
    pause(100)
    red.setImage(assets.image`redButton`)
    pause(50)
}
function wrongGuess () {
    info.changeLifeBy(-1)
}
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    if (userTurn) {
        if (lights[currentGuess] == 0) {
            currentGuess += 1
            redPressPlayer()
        } else {
            wrongGuess()
        }
        nextLevel()
    }
})
function nextLevel () {
    if (currentGuess == lights.length) {
        info.stopCountdown()
        currentGuess = 0
        userTurn = false
        rounds += 1
        info.changeScoreBy(1)
        // show the number of rounds completed and if  only one round are done then say one round is done instead of one rounds are done
        if (rounds == 1) {
            game.splash("" + convertToText(rounds) + " round", "is done")
        } else {
            game.splash("" + convertToText(rounds) + " rounds", "are done")
        }
        addLight()
        lightUp()
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (userTurn) {
        if (lights[currentGuess] == 2) {
            currentGuess += 1
            greenPressPlayer()
        } else {
            wrongGuess()
        }
        nextLevel()
    }
})
function yellowPressPlayer () {
    yellow.setImage(assets.image`yellowButtonPush`)
    yellow.startEffect(effects.fountain, 100)
    music.playTone(330, music.beat(BeatFraction.Whole))
    pause(100)
    yellow.setImage(assets.image`yellowButton`)
    pause(50)
}
function greenPress () {
    green.setImage(assets.image`greenButtonPush`)
    green.startEffect(effects.fountain, 500)
    music.playTone(494, music.beat(BeatFraction.Whole))
    pause(200)
    green.setImage(assets.image`greenButton`)
    pause(pauseTime)
}
let randLight = 0
let currentGuess = 0
let timer = 0
let rounds = 0
let userTurn = false
let lights: number[] = []
let yellow: Sprite = null
let green: Sprite = null
let blue: Sprite = null
let pauseTime = 0
let red: Sprite = null
let start: Sprite = null
let titleSprite: Sprite = null
scene.setBackgroundColor(10)
titleSprite = sprites.create(img`
    .................................................................
    .................................................................
    ...fffffffff.....................................................
    ...fffffffff.....................................................
    ...fffffffff...fff...............................................
    ...fff.........fff......................fffffff..................
    ...fff.........fff.....................fffffffff.............fff.
    ...fff..................fffffffff.....ff.......ff..fffffffff.fff.
    ...fffffffff...fff......fffffffff.....ff.......ff..fffffffff.fff.
    ...fffffffff...fff......fffffffff.....ff.......ff..fffffffff.....
    ...fffffffff...fff...fff...fff...fff..ff.......ff..fff...fff.....
    .........fff...fff...fff...fff...fff..ff.......ff..fff...fff.....
    .........fff...fff...fff...fff...fff..ff.......ff..fff...fff.....
    ...fffffffff...fff...fff.........fff..ff.......ff..fff...fff.fff.
    ...fffffffff...fff...fff.........fff...fffffffff...fff...fff.fff.
    ...fffffffff...fff...fff.........fff....fffffff....fff...fff.fff.
    .................................................................
    .................................................................
    ...........ffffffff..............................................
    .........ffffffffff..............................................
    .........ffffffffff..........................fff.....fff.........
    .........fff...........fffffff...............fff.....fff.........
    .........fff..........fffffffff...fffffffff..fff.....fff.........
    .........fff.........ff.......ff..fffffffff..fff.....fff.........
    .........fff.........ff.......ff..ff.....ff..fff.....fff.........
    .........fff.........ff.......ff..ff.....ff..fff.....fff.........
    .........fff.........ff.......ff..ff.....ff..fff.....fff.........
    .........fff.........ff.......ff..ff.....ff..fff.....fff.........
    .........fff.........ff.......ff..ff.....ff.....ffffffff.........
    .........ffffffffff..ff.......ff..fffffffff.....ffffffff.........
    ..........fffffffff...fffffffff...fffffffff.....ffffffff.........
    ..........fffffffff....fffffff....fff................fff.........
    ..................................fff................fff.........
    ..................................fff................fff.........
    ..................................fff................fff.........
    .....................................................fff.........
    ..............................................fffffff............
    ..............................................fffffff............
    ..............................................fffffff............
    .................................................................
    `, SpriteKind.title)
start = sprites.create(img`
    1111111111111111111111111
    1.......................1
    1.......................1
    1.......................1
    1.1111..1............1..1
    1.1.....1............1..1
    1.1....111..........111.1
    1.1111..1..111.1.11..1..1
    1....1..1.1..1..1.1..1..1
    1....1..1.1..1..1....1..1
    1.1111..1..11.1.1....1..1
    1.......................1
    1.......................1
    1.......................1
    1.......................1
    1111111111111111111111111
    `, SpriteKind.Button)
titleSprite.setPosition(75, 25)
gameMessage()
