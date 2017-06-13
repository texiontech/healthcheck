var DiskUsage = function (device, usage, util, write) {
    this.device = device;
    this.usage = usage;
    this.util = util;
    this.write = write;
}

module.exports = DiskUsage