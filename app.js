var express = require('express')
var app = express();
import {Health} from './health';
const health = new Health();


app.get('/healthcheck/check', function (req, res) {

  let result = new Result();

  let output = result.query();

  console.log(output[0].data);
  res.json(output);

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
