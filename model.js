var Result = function () {
    this.cpu = [];
    this.diskio = [];
    this.diskusage = [];
    this.httpget = [];
    this.memory = [];
    this.netWorkBandwidth = [];
    this.netWorkconcurrence = [];
};

Result.prototype = {
    query: function (obj) {

        var that = this;

        var cpu = [],
            diskio = [],
            diskusage = [],
            httpget = [],
            memory = [],
            netWorkBandwidth = [],
            netWorkconcurrence = [];

        that.cpu = function () {
            var serviceCpu = new Cpu(97.98, 0.00, 0.00, 0.00, 1.01, 1.01);
            cpu.push(new Data(serviceCpu, "", 1482295537655));
            return cpu;
        } ();

        that.diskio = function () {
            var serviceDiskIo = new DiskIo(0.00, 0.00, 0.00);
            var diskNames = ["sta", "stb"];

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

        that.httpget = function () {
            var serviceHttpGet = new HttpGet(4443, 200, "OK", 104, "http://www.picture-organic-clothing.com/wp-content/uploads/2016/08/exp-banner.jpg");
            httpget.push(new Data(serviceHttpGet, "", 1482295537655));
            return httpget;
        } ()

        that.memory = function () {
            var serviceMemory = new Memory("500072", "39776", "87736", "38.68", "372560", "17.149999999999999", "0", "603576", "231016")
            memory.push(new Data(serviceMemory, "", 1482295537655));
            return memory;
        } ()

        that.netWorkBandwidth = function () {
            var serviceNetWorkBandwidth = new NetWorkBandwidth("0.39", "0.35");
            netWorkBandwidth.push(new Data(serviceNetWorkBandwidth, "", 1482295537655));
            return netWorkBandwidth;
        } ()

        that.netWorkconcurrence = function () {
            var serviceNetworkConcurrence = new NetworkConcurrence(1, 1, 0, 16, 0, 1);
            netWorkconcurrence.push(new Data(serviceNetworkConcurrence, "", 1482295537655));
            return netWorkconcurrence;
        } ()

        return that;
    }

}


function Data(obj, error, timestamp) {
    this.data = obj;
    this.error = error;
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

function HttpGet(connTime, httpCode, statusMessage, tranTime, url) {
    this.connTime = connTime;
    this.httpCode = httpCode;
    this.statusMessage = statusMessage;
    this.tranTime = tranTime;
}

function Memory(actualFree, buffers, cached, comparePercentUsed, free, percentUsed, shared, total, used) {
    this.actualFree = actualFree;
    this.buffers = buffers;
    this.cached = cached;
    this.comparePercentUsed = comparePercentUsed;
    this.free = free;
    this.percentUsed = percentUsed;
    this.shared = shared;
    this.total = total;
    this.used = used;
}

function NetWorkBandwidth(rxkBps, txkBps) {
    this.rxkBps = rxkBps;
    this.txkBps = txkBps;
}

function NetworkConcurrence(closed, estab, orphaned, ports, synrecv, timewait) {
    this.closed = closed;
    this.estab = estab;
    this.orphaned = orphaned;
    this.ports = ports;
    this.synrecv = synrecv;
    this.timewait = timewait;
}

module.exports = Result;