let NetworkConcurrence = function (closed, estab, synrecv, timewait) {
    this.closed = closed;
    this.estab = estab;
    this.synrecv = synrecv;
    this.timewait = timewait;
}
module.exports = NetworkConcurrence;