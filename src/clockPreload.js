const { main, settingFileName } = require("./appHelper");
const { fromEvent, timer } = require("rxjs");
const fs = require('fs');
const yaml = require("js-yaml");

const clockDegreeOffset = -90; 
const clockTotalDegree = 360;
const fpsRate = 1000 / 60;

const updateClockHand = (clockHand, degree) => {
    clockHand.style.transform = `rotate(${degree}deg)`;
}

const init = () => {
    if (!fs.existsSync(settingFileName)) return;

    const settings = yaml.load(fs.readFileSync(settingFileName));
    
    for(let settingField in settings) {
        document.querySelector(":root").style.setProperty(`--${settingField}`, settings[settingField]);
    }
}

main(() => {
    init();

    let hourClockHand = document.querySelector(".clockHand[data-type=hour]");
    let minuteClockHand = document.querySelector(".clockHand[data-type=minute]");
    let secondClockHand = document.querySelector(".clockHand[data-type=second]");

    timer(0, fpsRate).subscribe(() => {
        let currentDate = new Date();
        let currentSeconds = currentDate.getSeconds() + 
                currentDate.getMilliseconds() / 1000;
        let currentMinutes = currentDate.getMinutes() + currentSeconds / 60;
        let currentHours = currentDate.getHours()
            + currentMinutes / 60;

        updateClockHand(hourClockHand, (currentHours / 12 * clockTotalDegree + clockDegreeOffset) % clockTotalDegree);
        updateClockHand(minuteClockHand, (currentMinutes / 60 * clockTotalDegree + clockDegreeOffset) % clockTotalDegree);
        updateClockHand(secondClockHand, (currentSeconds / 60 * clockTotalDegree + clockDegreeOffset) % clockTotalDegree);
    });

});