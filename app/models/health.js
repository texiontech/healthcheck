const Data = require('./Data');
const Cpu = require('./Cpu');
const DiskIo = require('./DiskIo');
const DiskUsage = require('./DiskUsage');
const Memory = require('./Memory');
const NetWorkBandwidth = require('./NetWorkBandwidth');
const NetworkConcurrence = require('./NetworkConcurrence');
const utils = require('../../utils/util');
const config = require('../../configs/config');
const logger = require('../../configs/logger');
const fs = require('fs');
const exec = require('child_process').exec;

let Health = function (resouce, req) {
    this.results = [];
    this.resouce = resouce;
    this.req = req;
}

let timestamp = new Date().getTime();

Health.prototype = {

    getResult: function () {

        this.mapCpu();
        this.mapDiskIo();
        this.mapDiskUsage();
        this.mapMemory();
        this.mapNetWorkBandwidth();
        this.getNetworkConcurrence();

        let log = "DATE|" + new Date() + "|IP|" + this.req.clientIp + "|RESPONSE|" + JSON.stringify(this.results) + "|RESTIME|" + (new Date().getTime() - this.req.timestamp);
        logger.info(log);

        return this.results;

    },
    mapCpu() {
        let serviceCpu;
        let data_cpu = this.resouce.cpu.trim();

        try {

            var temp = data_cpu.split(/[ \n]+/).filter(function (val) {
                if (!isNaN(parseFloat(val))) {
                    return val;
                }
            });

            let idle = temp[5];
            let iowait = temp[3];
            let nice = temp[1];
            let steal = temp[4];
            let system = temp[2];
            let user = temp[0];

            serviceCpu = new Cpu(idle, iowait, nice, steal, system, user);
            this.results.push(new Data("cpu", serviceCpu, "", timestamp));

        } catch (error) {
            console.error(error);
        }

    },

    mapDiskIo() {
        let dataDiskio = this.resouce.diskIo.trim();
        let diskio = [];
        try {

            let tempDiskIo = dataDiskio.split("\n");
            let indexDiskIo = tempDiskIo.length / 2 - 1;

            for (let i = tempDiskIo.length - 1; i >= (tempDiskIo.length / 2); i--) {
                let temp = tempDiskIo[i].split(/[ ]+/);

                let names = temp[0];
                let read = this.bytesToMegabyte(temp[3]);
                let util = this.bytesToMegabyte(temp[11]);
                let write = this.bytesToMegabyte(temp[4]);

                diskio[indexDiskIo--] = new DiskIo(names, read, util, write);
            }

            this.results.push(new Data("diskio", diskio, "", timestamp));

        } catch (error) {
            console.error(error);
        }

    },

    mapDiskUsage() {
        let diskUsage = [];
        try {
            let dataDiskUsage = this.resouce.diskUsed.trim();

            let tempDataDiskUsage = dataDiskUsage.split("\n").filter(function (line) {
                let temp = line.split(/[ \n]+/);

                if (temp.length > 1) {
                    return temp;
                }

            });

            for (let i = 0; i < tempDataDiskUsage.length; i++) {
                let temp = tempDataDiskUsage[i].split(/[ ]+/);

                let path = temp[5];
                let usage = temp[4].replace("%", "");

                diskUsage[i] = new DiskUsage(path, usage);
            }

            this.results.push(new Data("diskusage", diskUsage, "", timestamp));

        } catch (error) {
            console.error(error);
        }


    },
    mapMemory() {
        let data_memory = this.resouce.mem.trim();

        let lines = data_memory.split("\n");
        let line = lines[1].split(/\s+/);

        let total = parseInt(line[1], 10);
        let free = parseInt(line[3], 10);
        let buffers = parseInt(line[5], 10);
        let cached = parseInt(line[6], 10);
        let actualFree = free + buffers + cached;
        let percentUsed = parseFloat(((1 - (actualFree / total)) * 100).toFixed(2));
        let used = parseInt(line[2], 10);

        let memory = new Memory(actualFree, buffers, cached, free, percentUsed, total, used);
        this.results.push(new Data("memory", memory, "", timestamp));

    },

    mapNetWorkBandwidth() {
        let nwbandwidth = [];
        let dataNetworkBandwidth = this.resouce.networkBandwidth.trim();

        try {

            let tempDataNetworkBandwidth = dataNetworkBandwidth.split("\n");

            for (let i = 0; i < tempDataNetworkBandwidth.length; i++) {
                let temp = tempDataNetworkBandwidth[i].split(/[ ]+/);
                let speed = 0;

                let device = temp[1];
                let rxkBps = this.bytesToMegabits(temp[4]);
                let txkBps = this.bytesToMegabits(temp[3]);

                try {

                    let bw = fs.readFileSync(config.nwBandwidthSpeedPath.replace("{params}", device));
                    if (bw != undefined)
                        speed = bw.toString().split(/[ \n]+/)[0];

                } catch (error) {
                    console.error(error);
                }

                nwbandwidth[i] = new NetWorkBandwidth(device, rxkBps, txkBps, speed);

            }

            this.results.push(new Data("nwbandwidth", nwbandwidth, "", timestamp));

        } catch (error) {
            console.error(error);
        }


    },

    getNetworkConcurrence() {
        let serviceNetworkConcurrence;

        try {
            let nwconcurrence = this.resouce.networkConcurrence.trim();
            let temp = nwconcurrence.split(/[ \n]+/).filter(function (val) {
                if (!isNaN(parseFloat(val))) {
                    return val;
                }
            });

            let closed = temp[2];
            let estab = temp[1];
            let synrecv = temp[4];
            let timewait = temp[5];

            serviceNetworkConcurrence = new NetworkConcurrence(closed, estab, synrecv, timewait);

            this.results.push(new Data("nwconcurrence", serviceNetworkConcurrence, "", timestamp));

        } catch (error) {
            console.error(error);
        }


    },

    bytesToMegabyte(bytes) {
        return (bytes * Math.pow(10, -6)).toFixed(4);
    },
    bytesToMegabits(bytes) {
        return (bytes * 8).toFixed(6);
    }

}

module.exports = Health;
