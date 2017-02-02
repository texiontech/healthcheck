var NetworkBandwidth = function (device, rxkBps, txkBps) {
    this.device = device;
    this.rxkBps = rxkBps;
    this.txkBps = txkBps;
}

module.exports = NetworkBandwidth;