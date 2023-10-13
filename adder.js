const switchIsOn = (s) =>  s.src.endsWith("images/switch_on.png");
const switches = Array.from(document.querySelectorAll(".switch img"));
const upperSwitchesValDisplayDec = document.querySelector("#val_upper_switches_decimal");
const lowerSwitchesValDisplayDec = document.querySelector("#val_lower_switches_decimal");
const upperSwitchesValDisplayBin = document.querySelector("#val_upper_switches_binary");
const lowerSwitchesValDisplayBin = document.querySelector("#val_lower_switches_binary");
const resValDisplayDec = document.querySelector("#res_decimal");
const resValDisplayBin = document.querySelector("#res_binary");
const resetBtn = document.querySelector("#reset");


resetBtn.addEventListener("click", () => {
    resetSwitches();
    updateBulbs();
})

switches.forEach(s => {
    s.addEventListener('click', () => {
        flickSwitch(s);
        updateSwitchValues(evaluateSwitches(switches.slice(0,8)), evaluateSwitches(switches.slice(8)));
        updateBulbs();
    })
})

const updateBulbs = () => resValDisplayBin.textContent.split('').forEach((val, index) => flickBulb(index, val ===  '1'));


const updateSwitchValues = (valUpperSwitches, valLowerSwitches) => {
    upperSwitchesValDisplayDec.textContent = valUpperSwitches;
    lowerSwitchesValDisplayDec.textContent = valLowerSwitches;
    resValDisplayDec.textContent = valUpperSwitches + valLowerSwitches;
    upperSwitchesValDisplayBin.textContent = valUpperSwitches.toString(2).padStart(8, '0');
    lowerSwitchesValDisplayBin.textContent = valLowerSwitches.toString(2).padStart(8, '0');
    resValDisplayBin.textContent = (valUpperSwitches + valLowerSwitches).toString(2).padStart(9, '0');
}

const flickSwitch = (s) => {
    playAudio();
    s.src = switchIsOn(s) ? "images/switch_off.png" : "images/switch_on.png";
};

const playAudio = () => new Audio('audio/click.mp3').play();
   


const resetSwitches = () => {
    switches.forEach(s => {
        s.src = "images/switch_off.png";
        updateSwitchValues(0,0);
    })
}

 
/**
 * Evaluates an array of switches from a binary to decimal value; 
 * @param {Array} An array of switches. 
 * @returns {number} The decimal representation of the switches.
 */
const evaluateSwitches = (switches) => {
    const actualVal =  switches.reduce((acc, s, i) =>  acc + (switchIsOn(s) ? Math.pow(2, switches.length - i - 1) : 0), 0);
    return actualVal;
};


// Bulb control
const bulbs = Array.from(document.querySelectorAll(".bulb img"));
const flickBulb = (i, on) => bulbs[i].src = on ? '/images/bulb_on.png' : '/images/bulb_off.png';

resetSwitches();