namespace SpriteKind {
    export const Button = SpriteKind.create()
}
function redPress () {
    red.setImage(assets.image`redButtonPush`)
    red.startEffect(effects.fountain, 500)
    music.playTone(262, music.beat(BeatFraction.Whole))
    pause(500)
    red.setImage(assets.image`redButton`)
    pause(500)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (userTurn) {
        if (lights[currentGuess] == 0) {
            redPress()
            currentGuess += 1
        } else {
            wrongGuess()
        }
    }
    if (currentGuess == lights.length) {
        currentGuess = 0
        userTurn = false
        addLight()
        lightUp()
    }
})
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
function lightUp () {
    for (let value of lights) {
        if (value == 0) {
            redPress()
        } else if (value == 1) {
        	
        } else if (value == 2) {
        	
        } else {
        	
        }
    }
    userTurn = true
    currentGuess = 0
}
function addLight () {
    randLight = randint(0, 3)
    lights.push(randLight)
}
function wrongGuess () {
    game.over(false, effects.melt)
}
let randLight = 0
let yellow: Sprite = null
let blue: Sprite = null
let green: Sprite = null
let currentGuess = 0
let red: Sprite = null
let userTurn = false
let lights: number[] = []
scene.setBackgroundColor(1)
setButton()
lights = []
userTurn = false
addLight()
lightUp()
