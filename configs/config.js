const config = module.exports = {};

config.port = {
	http: 8800
};

config.nwBandwidthSpeedPath = "/sys/class/net/{params}/speed";

config.logs = {};
config.logs.dir = "/var/log/healthcheck";
config.logs.infoPath = "info.log";
config.logs.datePattern = "yyyyMMddHH.";
