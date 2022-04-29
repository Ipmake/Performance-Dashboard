const os = require("os");
const osu = require("node-os-utils");
const si = require('systeminformation');



var cpu = osu.cpu
var mem = osu.mem

const cpuChart = document.getElementById('chart-CPU')
const memChart = document.getElementById('chart-MEMORY')

var cpuUsage = 50
var memUsage = 50


update()
sync()

function sync() {
    cpuChart.style = `--percentage: ${cpuUsage}; --fill: #FF3D00;`
    cpuChart.innerHTML = `${Math.round(cpuUsage)}%`
    memChart.style = `--percentage: ${memUsage}; --fill: #FF3D00 ;`
    memChart.innerHTML = `${Math.round(memUsage)}%`

    setTimeout(sync, 200)
}

async function update() {

    cpuUsage = await cpu.usage()
    memUsage = 100 -(await mem.info()).freeMemMb / (await mem.info()).totalMemMb * 100 

    setTimeout(update, 100)
}   