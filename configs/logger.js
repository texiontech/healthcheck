require('winston-daily-rotate-file');
const path = require('path');
const winston = require('winston');
const config = require('./config');

let transport = new winston.transports.DailyRotateFile({
	datePattern: config.logs.datePattern,
	filename: path.join(path.resolve(config.logs.dir), config.logs.infoPath),
	level: 'info',
	timestamp: false,
	prepend: true,
	localTime: true
});

let logger = new (winston.Logger)({
	transports: [
		transport
	]
});

module.exports = logger;
