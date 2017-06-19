var config = module.exports = {};

config.port = {
	http: 9000
};

config.InfluxDB = {
	host: '10.104.240.107',
	port: 8086,
/*	username: 'telegraf',
    password: 'mflv[', */
    database: 'varnish'
};

config.nwBandwidthSpeedPath = "/sys/class/net/{params}/speed";

config.logs = {};
config.logs.dir = "/logs";
config.logs.infoPath = config.logs.dir + "/info.log";
config.logs.datePattern = "yyyyMMddHHmm.";