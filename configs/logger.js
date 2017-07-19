const winston = require('winston');
const config = require('./config');
require('winston-daily-rotate-file');

var transport = new winston.transports.DailyRotateFile({
	datePattern: config.logs.datePattern,
	filename: "." + config.logs.infoPath,	
        level: 'info',
	timestamp : false,
	prepend: true,
	localTime: true
});

var logger = new (winston.Logger)({
    transports: [
      transport
    ]
});

module.exports = logger;
