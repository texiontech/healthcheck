var Result = function () {
    this.result = [];
};

Result.prototype = {
    query: function (obj) {

        var that = this.result;

        var diskio = [],
            diskusage = [],
            nwbandwidth = [];

        //----------------------------------------------------------------------------

        //call service cpu

        var data_cpu = obj[0][0].series[0];
        var cpu_name = data_cpu.name;
        var cpu_idle = data_cpu.values[0][6];
        var cpu_iowait = data_cpu.values[0][7];
        var cpu_nice = data_cpu.values[0][9];
        var cpu_steal = data_cpu.values[0][11];
        var cpu_system = data_cpu.values[0][12];
        var cpu_user = data_cpu.values[0][13];

        var serviceCpu = new Cpu(cpu_idle, cpu_iowait, cpu_nice, cpu_steal, cpu_system, cpu_user);
        that.push(new Data("cpu", serviceCpu, "", 1482295537655));
        //----------------------------------------------------------------------------

        //call service disk io

        var data_diskio = obj[1][0].series[0];

        for (var i = 0; i < data_diskio.values.length; i++) {
            var diskNames = data_diskio.values[i][3];
            var diskio_read = data_diskio.values[i][6];
            var diskio_util = data_diskio.values[i][5];   //ยังไม่ถูกต้อง
            var diskio_write = data_diskio.values[i][9];

            diskio[i] = new DiskIo(diskNames, diskio_read, diskio_util, diskio_write);
        }

        that.push(new Data("diskio", diskio, "", 1482295537655));

        //----------------------------------------------------------------------------

        //call service disk usage         

        var data_diskusage = obj[2][0].series[0];

        for (var i = 0; i < data_diskusage.values.length; i++) {
            var diskusage_path = data_diskusage.values[i][7];
            var diskusage_usage = data_diskusage.values[i][9];
            diskusage[i] = new DiskUsage(diskusage_path, diskusage_usage);
        }

        that.push(new Data("diskusage", diskusage, "", 1482295537655));

        //----------------------------------------------------------------------------
        //call service memory usage

        var data_memory = obj[3][0].series[0];

        var memory_actualFree = data_memory.values[0][1];   //ยังไม่ถูกต้อง
        var memory_buffers = data_memory.values[0][4];
        var memory_cached = data_memory.values[0][5];
        var memory_comparePercentUsed = data_memory.values[0][11];   //ยังไม่ถูกต้อง
        var memory_free = data_memory.values[0][6];
        var memory_percentUsed = data_memory.values[0][11];
        var memory_total = data_memory.values[0][9];
        var memory_used = data_memory.values[0][10];

        var serviceMemory = new Memory(memory_actualFree, memory_buffers, memory_cached, memory_comparePercentUsed, memory_free, memory_percentUsed, memory_total, memory_used)
        that.push(new Data("memory", serviceMemory, "", 1482295537655));

        //----------------------------------------------------------------------------

        //call serivce NetWorkBandwidth

        var data_nwbandwidth = obj[4][0].series[0];

        for (var i = 0; i < data_nwbandwidth.values.length; i++) {
            var nwbandwidth_device = data_nwbandwidth.values[i][5];
            var nwbandwidth_rxkBps = data_nwbandwidth.values[i][20];
            var nwbandwidth_txkBps = data_nwbandwidth.values[i][37];

            nwbandwidth[i] = new NetWorkBandwidth(nwbandwidth_device, nwbandwidth_rxkBps, nwbandwidth_txkBps);
        }
        that.push(new Data("nwbandwidth", nwbandwidth, "", 1482295537655));

        //----------------------------------------------------------------------------
        //call serivce NetworkConcurrence

        var data_nwconcurrence = obj[5][0].series[0];

        var nwconcurrence_closed = data_nwconcurrence.values[0][4];   //ยังไม่ถูกต้อง
        var nwconcurrence_estab = data_nwconcurrence.values[0][5];   //ยังไม่ถูกต้อง
        var nwconcurrence_synrecv = data_nwconcurrence.values[0][6];   //ยังไม่ถูกต้อง
        var nwconcurrence_timewait = data_nwconcurrence.values[0][7];   //ยังไม่ถูกต้อง


        var serviceNetworkConcurrence = new NetworkConcurrence(nwconcurrence_closed, nwconcurrence_estab, nwconcurrence_synrecv, nwconcurrence_timewait);
        that.push(new Data("nwconcurrence", serviceNetworkConcurrence, "", 1482295537655));

        //----------------------------------------------------------------------------

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