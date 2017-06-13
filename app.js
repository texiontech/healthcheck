const express = require('express')
const expressControllers = require('express-controller'); 
const config = require('./configs/config');        
const app = express();
const router = express.Router();

app.use(router);

//Tell expressControllers to use the controllers-directory, and use bind() to set up routing. 
expressControllers
            .setDirectory( __dirname + '/controllers')
            .bind(router);

app.listen(config.port.http, function () {
  console.log('Example app listening on port' + config.port.http);
});
