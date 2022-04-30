const os = require("os");
const osu = require("node-os-utils");
const si = require('systeminformation');
const cpuStat = require('cpu-stat');

//----------------------------------------------------------------
//get elements
//cpu
const cpuUSAGE = document.getElementById("chart-cpu-USAGE")
const cpuTEMP = document.getElementById("chart-cpu-TEMPERATURE")
const cpuSPEED = document.getElementById("chart-cpu-SPEED")
const cpuVOLTAGE = document.getElementById("chart-cpu-VOLTAGE")

const cpuInfo = document.getElementById("cpu-name")

//memory
const memUSAGE = document.getElementById("chart-mem-USAGE")
const memVoltage = document.getElementById("chart-mem-VOTAGE")

//gpu
const gpuUSAGE = document.getElementById("chart-gpu-USAGE")
const gpuVRAM = document.getElementById("chart-gpu-VRAM")
const gpuTEMP = document.getElementById("chart-gpu-TEMPERATURE")

const gpuInfo = document.getElementById("gpu-name")
//----------------------------------------------------------------

getHardwareInfo() //get hardware info 

var refreshes = 0


update()
sync()

function sync() {
    //cpu

}

async function update() {
    osu.cpu.usage().then(async data => {
        cpuUSAGE.style = `--percentage : ${data}; --fill: #4E5D94 ;`
        cpuUSAGE.innerHTML = `${Math.round(data)}%`
    })
    si.cpu().then(async data => {
        if(data.voltage) {
            cpuVOLTAGE.style = `--percentage : ${data.voltage / 2 * 100}; --fill: #4E5D94 ;`
            cpuVOLTAGE.innerHTML = `${data.voltage}V / 2V`
        } else {
            cpuVOLTAGE.innerHTML = `Not supported`
            if(refreshes > 5) {
                cpuVOLTAGE.style = `--percentage : 0; --fill: #4E5D94; width: 0px; opacity: 0;`
                cpuVOLTAGE.parentElement.style = `width: 0px; opacity: 0;`
            }
        }

        const osdata = cpuStat.clockMHz(0);
        cpuSPEED.style = `--percentage : ${Math.round(osdata / 100) / 10 / data.speedMax * 100}; --fill:   #4E5D94 ;`
        cpuSPEED.innerHTML = `${Math.round(osdata / 100) / 10}GHz / ${data.speedMax}GHz`
        refreshes++;
    })
    si.cpuTemperature().then(temp => {
        if(!temp.main){
            cpuTEMP.innerHTML = `Not supported`
            if(refreshes > 5) {
                cpuTEMP.style = `--percentage : 0; --fill: #4E5D94; width: 0px; opacity: 0;`
                cpuTEMP.parentElement.style = `width: 0px; opacity: 0;`
            }
            return
        }
        cpuTEMP.style = `--percentage : ${temp.main}; --fill: #4E5D94 ;`
        cpuTEMP.innerHTML = `${Math.round(temp.main)}°C`
    })
    

    setTimeout(update, 2000)
}   


async function getHardwareInfo(){
    si.cpu().then(data => cpuInfo.innerHTML = data.brand)
    si.graphics().then(data => gpuInfo.innerHTML = data.controllers[0].model)
}