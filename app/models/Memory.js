var Memory = function (actualFree, buffers, cached, free, percentUsed, total, used) {
    this.actualFree = actualFree;
    this.buffers = buffers;
    this.cached = cached;
    this.free = free;
    this.percentUsed = percentUsed;
    this.total = total;
    this.used = used;
}

module.exports = Memory;