var express = require('express')
var app = express();
var Result = require('./model.js');

app.get('/', function (req, res) {

var result = new Result();

var output = JSON.stringify(result.query());
//console.log(result)
//console.log(result.query());
    res.send(output);

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
