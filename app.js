var express = require('express')
var expressControllers = require('express-controller');         
var app = express();
var router = express.Router();

app.use(router);

//Tell expressControllers to use the controllers-directory, and use bind() to set up routing. 
expressControllers
            .setDirectory( __dirname + '/controllers')
            .bind(router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
