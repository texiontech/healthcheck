import { Data } from './data';

export class Health {
    constructor(resouce) {
        this.result = [];
        this.resouce = resouce;
    }

    query() {

        for (let i = 0; i <= this.resouce.length; i++) {
            this.result.push()
        }

        return this.result;
    }

}


const mapCpu = function () {
    //todo map data schema after query
    let serviceCpu = new Cpu(97.98, 0.00, 0.00, 0.00, 1.01, 1.01);
    return new Data("cpu", serviceCpu, "", 1482295537655);

}

const mapDiskIo = function () {
    //todo map diskIo schema after query
    let diskio = [];
    const diskNames = ["sda", "sdb"];

    for (let i = 0; i < diskNames.length; i++) {
        diskio[i] = new DiskIo(diskNames[i], 0.00, 0.00, 0.00);
    }

    return new Data("diskio", diskio, "", 1482295537655);
}

const mapDiskUsage = function () {
    let diskusage = [];

    const paths = ["/", "/dev/shm", "/vagrant"];

    for (let i = 0; i < paths.length; i++) {
        diskusage[i] = new DiskUsage(paths[i], 14);
    }

    return new Data("diskusage", diskusage, "", 1482295537655);
}

const mapMemory = function () {
    let memory = new Memory("500072", "39776", "87736", "38.68", "372560", "17.149999999999999", "0", "603576", "231016")
    return new Data("memory", memory, "", 1482295537655);
}

const mapNetWorkBandwidth = function () {
    let nwbandwidth = [];
    const devices = ["eth0", "lo"];
    for (let i = 0; i < devices.length; i++) {
        nwbandwidth[i] = new NetWorkBandwidth(devices[i], "0.39", "0.35");
    }

    return new Data("nwbandwidth", nwbandwidth, "", 1482295537655);
}

const getNetworkConcurrence = function () {
    let nwconcurrence = new NetworkConcurrence(1, 1, 0, 16, 0, 1);
    return new Data("nwconcurrence", nwconcurrence, "", 1482295537655);
} 
