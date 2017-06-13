
const Data = require('./Data');
const Cpu = require('./Cpu');
const DiskIo = require('./DiskIo');
const DiskUsage = require('./DiskUsage');
const Memory = require('./Memory');
const NetWorkBandwidth = require('./NetWorkBandwidth');
const NetworkConcurrence = require('./NetworkConcurrence');
const utils = require('../../utils/util');

let Health = function (resouce) {
    this.results = [];
    this.resouce = resouce;
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
        return this.results;
    },
    mapCpu() {
        let message = "";
        let serviceCpu;
        try {
            let data_cpu = this.resouce[0][0].series[0];

            let obj = utils.getValueFromColumnName(data_cpu, ["last_usage_idle", "last_usage_iowait", "last_usage_nice", "last_usage_steal", "last_usage_system", "last_usage_user"]);

            let name = data_cpu.name;
            let idle = obj["last_usage_idle"];
            let iowait = obj["last_usage_iowait"];
            let nice = obj["last_usage_nice"];
            let steal = obj["last_usage_steal"];
            let system = obj["last_usage_system"];
            let user = obj["last_usage_user"];

            serviceCpu = new Cpu(idle, iowait, nice, steal, system, user);
        } catch (error) {
            message = error;
        }

        this.results.push(new Data("cpu", serviceCpu, message, timestamp));
    },

    mapDiskIo() {

        let diskio = [];
        let message = "";

        try {
            let dataDiskio = this.resouce[1][0].series[0];

            for (let i = 0; i < dataDiskio.values.length; i++) {
                let obj = utils.getValueFromColumnName(dataDiskio, ["name", "reads", "writes"], i);

                let names = obj["name"];
                let read = this.humanFileSize(obj["reads"]);
                let util = this.humanFileSize(0);   //ยังไม่ถูกต้อง
                let write = this.humanFileSize(obj["writes"]);

                diskio[i] = new DiskIo(names, read, util, write);
            }
        } catch (error) {
            message = error;
        }

        this.results.push(new Data("diskio", diskio, message, timestamp));

    },

    mapDiskUsage() {

        let diskUsage = [];
        let message = "";
        try {
            let dataDiskUsage = this.resouce[2][0].series;

            for (let i = 0; i < dataDiskUsage.length; i++) {
                let data = dataDiskUsage[i];

                let obj = utils.getValueFromColumnName(data, ["used"]);

                let path = data.tags['path'];
                let usage = this.humanFileSize(obj["used"]);
                diskUsage[i] = new DiskUsage(path, usage);
            }
        } catch (error) {
            message = error;
        }

        this.results.push(new Data("diskusage", diskUsage, message, timestamp));
    },
    mapMemory() {
        let data_memory = this.resouce[3][0].series[0];

        let obj = utils.getValueFromColumnName(data_memory, ["last_buffered", "last_cached", "last_free", "last_available_percent", "last_used_percent", "last_total", "last_used"]);

        let actualFree = this.humanFileSize(obj["last_free"] + obj["last_buffered"] + obj["last_cached"]);
        let buffers = this.humanFileSize(obj["last_buffered"]);
        let cached = this.humanFileSize(obj["last_cached"]);
        let comparePercentUsed = null;   //ยังไม่ถูกต้อง
        let free = this.humanFileSize(obj["last_free"]);
        let percentUsed = obj["last_used_percent"];
        let total = this.humanFileSize(obj["last_total"]);
        let used = this.humanFileSize(obj["last_used"]);

        let memory = new Memory(actualFree, buffers, cached, comparePercentUsed, free, percentUsed, total, used)

        this.results.push(new Data("memory", memory, "", timestamp));
    },

    mapNetWorkBandwidth() {
        let nwbandwidth = [];
        let dataNetworkBandwidth = this.resouce[4][0].series;
        let message = "";
        try {
            for (let i = 0; i < dataNetworkBandwidth.length; i++) {
                let data = dataNetworkBandwidth[i];

                let obj = utils.getValueFromColumnName(data, ["bytes_recv", "bytes_sent"]);

                let device = data.tags['interface'];
                let rxkBps = obj["bytes_recv"];
                let txkBps = obj["bytes_sent"];

                nwbandwidth[i] = new NetWorkBandwidth(device, rxkBps, txkBps);
            }
        } catch (error) {
            message = error;
        }
        this.results.push(new Data("nwbandwidth", nwbandwidth, message, timestamp));
    },

    getNetworkConcurrence() {
        let serviceNetworkConcurrence;
        let message = "";

        try {
            let nwconcurrence = this.resouce[5][0].series[0];

            let obj = utils.getValueFromColumnName(nwconcurrence, ["last_tcp_close", "last_tcp_established", "last_tcp_syn_recv", "last_tcp_time_wait"]);

            let closed = obj["last_tcp_close"];
            let estab = obj["last_tcp_established"];
            let synrecv = obj["last_tcp_syn_recv"];
            let timewait = obj["last_tcp_time_wait"];

            serviceNetworkConcurrence = new NetworkConcurrence(closed, estab, synrecv, timewait);

        } catch (error) {
            message = error;
        }

        this.results.push(new Data("nwconcurrence", serviceNetworkConcurrence, message, timestamp));
    },
    toMbps(bps) {
        let thresh = 1000000;
        let unit = 'Mbps';
        let mbps = bps / thresh;
        return mbps + ' ' + unit; 
    },
    humanFileSize(bytes, si) {
        let thresh = si ? 1000 : 1024;
        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        let units = si
            ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1) + ' ' + units[u];
    }
}

module.exports = Health;