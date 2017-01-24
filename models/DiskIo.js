export class DiskIo {
    constructor(device, read, util, write) {
        this.device = device;
        this.read = read;
        this.util = util;
        this.write = write;
    }
}