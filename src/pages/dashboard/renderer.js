const os = require("os");
const osu = require("node-os-utils");
const si = require('systeminformation');

//get elements

//cpu
const cpuUSAGE = document.getElementById("charts-cpu-USAGE")
const cpuTEMP = document.getElementById("charts-cpu-TEMPERATURE")
const cpuSPEED = document.getElementById("charts-cpu-SPEED")
const cpuVOLTAGE = document.getElementById("charts-cpu-VOLTAGE")

//memory
const memUSAGE = document.getElementById("charts-mem-USAGE")
const memVoltage = document.getElementById("charts-mem-VOTAGE")

//gpu
const gpuUSAGE = document.getElementById("charts-gpu-USAGE")
const gpuVRAM = document.getElementById("charts-gpu-VRAM")
const gpuTEMP = document.getElementById("charts-gpu-TEMPERATURE")


//cpu data
var cpu = null;
si.cpu().then(data => { 
    cpu = data;

});





update()
sync()

function sync() {
    //cpu


    setTimeout(sync, 200)
}

async function update() {

    let gpu = (await si.graphics()).controllers[0]
    console.log(gpu)
    gpuUsage = gpu.memoryUsed / await gpu.memoryTotal * 100
    

    setTimeout(update, 2000)
}   