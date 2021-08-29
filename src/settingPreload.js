const { main, settingFileName } = require("./appHelper");
const { fromEvent } = require('rxjs');
const { ipcRenderer } = require('electron');
const fs = require('fs');
const yaml = require('js-yaml');

const settingFields = {
    "background": "transparent",
    "clock-background": "white",
    "clock-size": "600px",
    "clock-border-length": "1px",
    "clock-border-color": "black",
    "clock-border-radius": "600px",
    "hour-length-ratio": "0.5",
    "hour-weight": "5px",
    "hour-background": "black",
    "minute-length-ratio": "0.75",
    "minute-weight": "5px",
    "minute-background": "black",
    "second-length-ratio": "0.8",
    "second-weight": "3px",
    "second-background": "red",
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


