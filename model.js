var Result = function () {
    this.cpu = [];
    this.diskio = [];
    this.diskusage = [];
    this.memory = [];
    this.nwbandwidth = [];
    this.nwconcurrence = [];
};

Result.prototype = {
    query: function (obj) {

        var that = this;

        var cpu = [],
            diskio = [],
            diskusage = [],
            memory = [],
            nwbandwidth = [],
            nwconcurrence = [];

        that.cpu = function () {
            var serviceCpu = new Cpu(97.98, 0.00, 0.00, 0.00, 1.01, 1.01);
            cpu.push(new Data(serviceCpu, "", 1482295537655));
            return cpu;
        } ();

        that.diskio = function () {
            var serviceDiskIo = new DiskIo(0.00, 0.00, 0.00);
            var diskNames = ["sda", "sdb"];

            for (var i = 0; i < diskNames.length; i++) {
                diskio[i] = { [diskNames[i]]: serviceDiskIo };
            }

            return new Data(diskio, "", 1482295537655);
        } ()

        that.diskusage = function () {
            var serviceDiskUsage = new DiskUsage(14);
            var paths = ["/", "/dev/shm", "/vagrant"];

            for (var i = 0; i <= paths.length; i++) {
                diskusage[i] = { [paths[i]]: serviceDiskUsage };
            }

            return new Data(diskusage, "", 1482295537655);
        } ()



        that.memory = function () {
            var serviceMemory = new Memory("500072", "39776", "87736", "38.68", "372560", "17.149999999999999", "603576", "231016")
            memory.push(new Data(serviceMemory, "", 1482295537655));
            return memory;
        } ()

        that.nwbandwidth = function () {
            var serviceNetWorkBandwidth = new Nwbandwidth("0.39", "0.35");

            var bandwidthNames = ["eth0", "lo"];

            for (var i = 0; i < bandwidthNames.length; i++) {
                nwbandwidth[i] = { [bandwidthNames[i]]: serviceNetWorkBandwidth };
            }

            return new Data(nwbandwidth, "", 1482295537655);
        } ()

        that.nwconcurrence = function () {
            var serviceNetworkConcurrence = new Nwconcurrence(1, 1, 0, 1);
            nwconcurrence.push(new Data(serviceNetworkConcurrence, "", 1482295537655));
            return nwconcurrence;
        } ()

        return that;
    }

}


function Data(obj, error, timestamp) {
    this.data = obj;
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

function DiskIo(read, util, write) {
    this.read = read;
    this.util = util;
    this.write = write;
}

function DiskUsage(usage) {
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

function Nwbandwidth(rxkBps, txkBps) {
    this.rxkBps = rxkBps;
    this.txkBps = txkBps;
}

function Nwconcurrence(closed, estab, synrecv, timewait) {
    this.closed = closed;
    this.estab = estab;
    this.synrecv = synrecv;
    this.timewait = timewait;
}

module.exports = Result;