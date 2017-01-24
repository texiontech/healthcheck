var express = require('express')
var app = express();
var bluebird = require('bluebird');
var Result = require('./app/models/health.js');


const Influx = require('influx')

const influx = new Influx.InfluxDB({
  host: '10.104.240.107',
  port: 8086,
  database: 'varnish'
});

app.get('/healthcheck/check', function (req, res) {

  var reqPromiseArray = [];

  reqPromiseArray.push(influx.queryRaw('select * from cpu limit 1'));
  reqPromiseArray.push(influx.queryRaw('select * from diskio limit 4'));
  reqPromiseArray.push(influx.queryRaw('select * from disk limit 4'));
  reqPromiseArray.push(influx.queryRaw('select * from mem limit 1'));
  reqPromiseArray.push(influx.queryRaw('select * from sysstat_network limit 4'));
  reqPromiseArray.push(influx.queryRaw('select * from cpu limit 1'));   //ยังไม่ถูกต้อง

  bluebird.all(reqPromiseArray).then(function (reqResultArray) {
    var all = [];
    reqResultArray.forEach(function (result) {
      all.push(result.results);
    });

    var result = new Result();
    var output = result.query(all);
    res.json(output);

  });

});

app.get('/healthcheck/check/:id', function (req, res) {

  var id = req.params.id; //or use req.param('id')
  id = id.toString();
  var test = "";
  if (id.trim() != "") {
    test = "OK";

  }
  else {
    test = "Error";
  }
  console.log(test)
  res.send(test);


});

app.get('/test', function (req, res) {

  var reqPromiseArray = [];

  reqPromiseArray.push(influx.queryRaw('select * from cpu limit 1'));
  reqPromiseArray.push(influx.queryRaw('select * from diskio limit 4'));
  reqPromiseArray.push(influx.queryRaw('select * from disk limit 4'));
  reqPromiseArray.push(influx.queryRaw('select * from mem limit 1'));
  reqPromiseArray.push(influx.queryRaw('select * from sysstat_network limit 4'));
  reqPromiseArray.push(influx.queryRaw('select * from cpu limit 1'));   //ยังไม่ถูกต้อง

  bluebird.all(reqPromiseArray).then(function (reqResultArray) {
    var all = [];
    reqResultArray.forEach(function (result) {
      all.push(result.results);

      //console.log(JSON.stringify(result));
      //var test_name = result.results[0].series[0].name;
      //var test_value = result.results[0].series[0].values[0][0];

    });

    //res.json(allResult);
    var result = new Result();

    var output = result.query(all);
    res.json(output);

  });


});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
