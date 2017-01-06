var express = require('express')
var app = express();
var Result = require('./models/health.js');

app.get('/healthcheck/check', function (req, res) {

  var result = new Result();

  var output = result.query();
  res.json(output);

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
