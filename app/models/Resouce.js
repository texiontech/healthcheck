
import { Cpu } from './Cpu';
import { DiskIo } from './DiskIo';
import { DiskUsage } from './DiskUsage';
import { Memory } from './Memory';
import { NetworkBandwidth } from './NetworkBandwidth';
import { NetworkConcurrence } from './NetworkConcurrence';

export class Resource {

    getCpu() {
        return new Cpu(97.98, 0.00, 0.00, 0.00, 1.01, 1.01);
    }

    getDiskIo() {
        let diskIo = [];
        let diskNames = ["sda", "sdb"];

        for (var i = 0; i < diskNames.length; i++) {
            diskIo[i] = new DiskIo(diskNames[i], 0.00, 0.00, 0.00);
        }

        return diskIo;
    }

    getMemory() {
        return new Memory("500072", "39776", "87736", "38.68", "372560", "17.149999999999999", "0", "603576", "231016");
    }

    getNetworkBandwidth() {
        let nwBandwidth = [];
        var devices = ["eth0", "lo"];
        for (var i = 0; i < devices.length; i++) {
            nwBandwidth[i] = new NetWorkBandwidth(devices[i], "0.39", "0.35");
        }
        return nwBandwidth;
    }

    getNetworkConcurrence() {
        return new NetworkConcurrence(1, 1, 0, 16, 0, 1);
    }
}