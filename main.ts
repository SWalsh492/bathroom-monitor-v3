function _Distance () {
    pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
    pins.digitalWritePin(DigitalPin.P2, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P2, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P2, 0)
    Distance = pins.pulseIn(DigitalPin.P2, PulseValue.High)
    Distance = Distance / 58
}
input.onButtonPressed(Button.A, function () {
    basic.showNumber(Distance)
})
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(Total_Entry)
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(Entry)
})
let Total_Entry = 0
let Entry = 0
let Distance = 0
radio.setGroup(111)
Distance = 0
Entry = 0
Total_Entry = 0
basic.showNumber(Entry)
basic.forever(function () {
    _Distance()
    if (Distance < 60) {
        if (Distance < 50) {
            Entry += 1
            basic.showNumber(Entry)
            Total_Entry += 1
            radio.sendNumber(Entry)
            basic.pause(1000)
        }
    }
})
basic.forever(function () {
    if (Entry == 2) {
        basic.pause(180000)
        while (Entry == 2) {
            music.playMelody("C C C C C C C C ", 60)
        }
    } else if (Entry >= 3) {
        while (Entry >= 3) {
            music.playMelody("C C C C C C C C ", 60)
        }
    }
})
basic.forever(function () {
    if (input.rotation(Rotation.Roll) >= 90 && Entry == 1) {
        Entry += -1
        basic.showNumber(Entry)
    } else if (input.rotation(Rotation.Roll) >= 90 && Entry >= 2) {
        Entry += -1
        basic.showNumber(Entry)
    }
})
