const express = require('express')
const expressControllers = require('express-controller'); 
const config = require('./configs/config');
const fs = require('fs')        
const app = express();
const router = express.Router();

if (!fs.existsSync("." + config.logs.dir)) {
	fs.mkdirSync("." + config.logs.dir);
}

app.use(router);

expressControllers
            .setDirectory( __dirname + '/controllers')
            .bind(router);

app.listen(config.port.http, function () {
  console.log('Example app listening on port : ' + config.port.http);
});
