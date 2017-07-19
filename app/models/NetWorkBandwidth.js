let NetworkBandwidth = function (device, rxkBps, txkBps, speed) {
    this.device = device;
    this.rxkBps = rxkBps;
    this.txkBps = txkBps;
    this.speed = speed;
}

module.exports = NetworkBandwidth;