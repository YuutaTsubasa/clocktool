const { main, settingFileName } = require("./appHelper");
const { fromEvent } = require('rxjs');
const { ipcRenderer } = require('electron');
const fs = require('fs');
const yaml = require('js-yaml');

const settingFields = {
    "background": "rgb(0,255,0)",
    "clock-background": "url(\"./image/clock.png\")",
    "clock-size": "600px",
    "clock-border-length": "0px",
    "clock-border-color": "black",
    "clock-border-radius": "600px",
    "hour-length-ratio": "0.5",
    "hour-weight": "50px",
    "hour-background": "url(\"./image/clockhand.png\")",
    "hour-length-offset": "15px",
    "minute-length-ratio": "0.75",
    "minute-weight": "50px",
    "minute-background": "url(\"./image/clockhand.png\")",
    "minute-length-offset": "15px",
    "second-length-ratio": "0.8",
    "second-weight": "50px",
    "second-background": "url(\"./image/clockhand_second.png\")",
    "second-length-offset": "15px",
};
const injectCSSFieldName = "inject-css";
const defaultInjectCSS = `body {

}

.clock {

}
    
.clockHand {

}

.clockHand[data-type=hour] {

}

.clockHand[data-type=minute] {

}

.clockHand[data-type=second] {

}`;
const getInjectCSSInputValue = () => document.getElementById(injectCSSFieldName).value;
const sizeFieldName = "clock-size";

const init = () => {
    let settings = {};
    if (fs.existsSync(settingFileName)) {
        settings = yaml.load(fs.readFileSync(settingFileName));
    }

    Object.keys(settingFields).forEach(settingField => {
        document.getElementById(settingField).value = settings[settingField] || settingFields[settingField];
    });


    document.getElementById(injectCSSFieldName).value = settings[injectCSSFieldName] || defaultInjectCSS;
}

const saveFields = () => {
    let settings = {};

    Object.keys(settingFields).forEach(settingField => {
        settings[settingField] = document.getElementById(settingField).value;
    })
    settings[injectCSSFieldName] = getInjectCSSInputValue();
    fs.writeFileSync(settingFileName, yaml.dump(settings));
}

main(() => {
    init();

    let openClockButton = document.getElementById("open_clock_button");
    fromEvent(openClockButton, "click")
        .subscribe(() => {
            saveFields();
            ipcRenderer.send('open-clock', {
                size: parseInt(document.getElementById(sizeFieldName).value) + 50,
                injectCSS: getInjectCSSInputValue()
            });
        });
});


