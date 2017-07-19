
let Cpu = function (idle, iowait, nice, steal, system, user) {
    this.idle = idle;
    this.iowait = iowait;
    this.nice = nice;
    this.steal = steal;
    this.system = system;
    this.user = user;
}

module.exports = Cpu;
