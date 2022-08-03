let speed = 0
music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
basic.pause(1000)
let strip = neopixel.create(DigitalPin.P1, 7, NeoPixelMode.RGB)
strip.setBrightness(50)
basic.forever(function () {
    if (reromicro.ReadUltrasonic() <= 5) {
        speed = 0
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else if (reromicro.ReadUltrasonic() <= 15) {
        speed = 20
        strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
    } else {
        speed = 35
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
    }
    reromicro.ReadLineSensors()
    if (reromicro.LineSensorDetectsLine(LineSensors.Center) && reromicro.LineSensorDetectsLine(LineSensors.Left)) {
        reromicro.RunMotor(Motors.Left, speed / 2)
        reromicro.RunMotor(Motors.Right, speed)
    } else if (reromicro.LineSensorDetectsLine(LineSensors.Center) && reromicro.LineSensorDetectsLine(LineSensors.Right)) {
        reromicro.RunMotor(Motors.Left, speed)
        reromicro.RunMotor(Motors.Right, speed / 2)
    } else if (reromicro.LineSensorDetectsLine(LineSensors.Center)) {
        reromicro.MoveForward(speed)
    } else if (reromicro.LineSensorDetectsLine(LineSensors.Left)) {
        reromicro.RunMotor(Motors.Left, 0)
        reromicro.RunMotor(Motors.Right, speed)
    } else if (reromicro.LineSensorDetectsLine(LineSensors.Right)) {
        reromicro.RunMotor(Motors.Left, speed)
        reromicro.RunMotor(Motors.Right, 0)
    } else {
        reromicro.Brake()
    }
})
