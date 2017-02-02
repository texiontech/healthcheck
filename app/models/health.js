
let Data = require('./Data');
let Cpu = require('./Cpu');
let DiskIo = require('./DiskIo');
let DiskUsage = require('./DiskUsage');
let Memory = require('./Memory');
let NetWorkBandwidth = require('./NetWorkBandwidth');
let NetworkConcurrence = require('./NetworkConcurrence');


let Health = function (resouce) {
    this.results = [];
    this.resouce = resouce;
}

Health.prototype = {
    getResult : function() {

        this.mapCpu();
        this.mapDiskIo();
        this.mapDiskUsage();
        this.mapMemory();
        this.mapNetWorkBandwidth();
        this.getNetworkConcurrence();
        //console.log(this.results);
        return this.results;
    },

    mapCpu() {

        let data_cpu = this.resouce[0][0].series[0];
        let name = data_cpu.name;
        let idle = data_cpu.values[0][6];
        let iowait = data_cpu.values[0][7];
        let nice = data_cpu.values[0][9];
        let steal = data_cpu.values[0][11];
        let system = data_cpu.values[0][12];
        let user = data_cpu.values[0][13];

        let serviceCpu = new Cpu(idle, iowait, nice, steal, system, user);

        this.results.push(new Data("cpu", serviceCpu, "", 1482295537655));


        //console.log(this.results);

    },

    mapDiskIo() {

        let diskio = [];
        let dataDiskio = this.resouce[1][0].series[0];

        for (let i = 0; i < dataDiskio.values.length; i++) {
            let names = dataDiskio.values[i][3];
            let read = dataDiskio.values[i][6];
            let util = dataDiskio.values[i][5];   //ยังไม่ถูกต้อง
            let write = dataDiskio.values[i][9];

            diskio[i] = new DiskIo(names, read, util, write);
        }

        this.results.push(new Data("diskio", diskio, "", 1482295537655));

    },

    mapDiskUsage() {

        let diskUsage = [];
        let dataDiskUsage = this.resouce[2][0].series[0];

        for (let i = 0; i < dataDiskUsage.values.length; i++) {
            let path = dataDiskUsage.values[i][7];
            let usage = dataDiskUsage.values[i][9];
            diskUsage[i] = new DiskUsage(path, usage);
        }

        this.results.push(new Data("diskusage", diskUsage, "", 1482295537655));
    },
    mapMemory() {
        let data_memory = this.resouce[3][0].series[0];

        let actualFree = data_memory.values[0][1];   //ยังไม่ถูกต้อง
        let buffers = data_memory.values[0][4];
        let cached = data_memory.values[0][5];
        let comparePercentUsed = data_memory.values[0][11];   //ยังไม่ถูกต้อง
        let free = data_memory.values[0][6];
        let percentUsed = data_memory.values[0][11];
        let total = data_memory.values[0][9];
        let used = data_memory.values[0][10];

        let memory = new Memory(actualFree, buffers, cached, comparePercentUsed, free, percentUsed, total, used)

        this.results.push(new Data("memory", memory, "", 1482295537655));
    },

    mapNetWorkBandwidth() {
        let nwbandwidth = [];
        let dataNetworkBandwidth = this.resouce[4][0].series[0];

        for (let i = 0; i < dataNetworkBandwidth.values.length; i++) {
            let device = dataNetworkBandwidth.values[i][5];
            let rxkBps = dataNetworkBandwidth.values[i][20];
            let txkBps = dataNetworkBandwidth.values[i][37];

            nwbandwidth[i] = new NetWorkBandwidth(device, rxkBps, txkBps);
        }

        this.results.push(new Data("nwbandwidth", nwbandwidth, "", 1482295537655));
    },

    getNetworkConcurrence() {

        let nwconcurrence = this.resouce[5][0].series[0];

        let closed = nwconcurrence.values[0][4];   //ยังไม่ถูกต้อง
        let estab = nwconcurrence.values[0][5];   //ยังไม่ถูกต้อง
        let synrecv = nwconcurrence.values[0][6];   //ยังไม่ถูกต้อง
        let timewait = nwconcurrence.values[0][7];   //ยังไม่ถูกต้อง

        let serviceNetworkConcurrence = new NetworkConcurrence(closed, estab, synrecv, timewait);
        this.results.push(new Data("nwconcurrence", serviceNetworkConcurrence, "", 1482295537655));
    }
}

module.exports = Health;