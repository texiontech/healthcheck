var Result = function () {
    this.result = [];
};

Result.prototype = {
    query: function (obj) {

        var that = this.result;

        var diskio = [],
            diskusage = [],
            nwbandwidth = [];

        //call service cpu
        var serviceCpu = new Cpu(97.98, 0.00, 0.00, 0.00, 1.01, 1.01);
        that.push(new Data("cpu", serviceCpu, "", 1482295537655));

        //call service disk io

        var diskNames = ["sda", "sdb"];

        for (var i = 0; i < diskNames.length; i++) {
            diskio[i] = new DiskIo(diskNames[i], 0.00, 0.00, 0.00);
        }

        that.push(new Data("diskio", diskio, "", 1482295537655));

        //call service disk usage         
        var paths = ["/", "/dev/shm", "/vagrant"];

        for (var i = 0; i < paths.length; i++) {
            diskusage[i] = new DiskUsage(paths[i], 14);
        }

        that.push(new Data("diskusage", diskusage, "", 1482295537655));

        var serviceMemory = new Memory("500072", "39776", "87736", "38.68", "372560", "17.149999999999999", "0", "603576", "231016")
        that.push(new Data("memory", serviceMemory, "", 1482295537655));

        var devices = ["eth0", "lo"];
        for (var i = 0; i < devices.length; i++) {
            nwbandwidth[i] = new NetWorkBandwidth(devices[i], "0.39", "0.35");
        }
        that.push(new Data("nwbandwidth", nwbandwidth, "", 1482295537655));

        var serviceNetworkConcurrence = new NetworkConcurrence(1, 1, 0, 16, 0, 1);
        that.push(new Data("nwconcurrence", serviceNetworkConcurrence, "", 1482295537655));

        return that;
    }

}



function Data(interfaceType, data, error, timestamp) {
    this.interfaceType = interfaceType;
    this.data = data;
    this.errorMsg = error;
    this.timestamp = timestamp;
}

function Cpu(idle, iowait, nice, steal, system, user) {
    this.idle = idle;
    this.iowait = iowait;
    this.nice = nice;
    this.steal = steal;
    this.system = system;
    this.user = user;
}

function DiskIo(device, read, util, write) {
    this.device = device;
    this.read = read;
    this.util = util;
    this.write = write;
}

function DiskUsage(path, usage) {
    this.path = path;
    this.usage = usage;
};

function Memory(actualFree, buffers, cached, comparePercentUsed, free, percentUsed, total, used) {
    this.actualFree = actualFree;
    this.buffers = buffers;
    this.cached = cached;
    this.comparePercentUsed = comparePercentUsed;
    this.free = free;
    this.percentUsed = percentUsed;
    this.total = total;
    this.used = used;
}

function NetWorkBandwidth(device, rxkBps, txkBps) {
    this.device = device;
    this.rxkBps = rxkBps;
    this.txkBps = txkBps;
}

function NetworkConcurrence(closed, estab, synrecv, timewait) {
    this.closed = closed;
    this.estab = estab;
    this.synrecv = synrecv;
    this.timewait = timewait;
}

module.exports = Result;