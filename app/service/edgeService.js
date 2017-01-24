var express = require('express')
var app = express();
const Influx = require('Influx')
const http = require('http')
const os = require('os')

const influx = new Influx.InfluxDB({
  host: '10.104.240.107',
  port: 8086,
  database: 'varnish',
  schema: [
    {
      measurement: 'cpu_measurement',
      fields: {
        time: Influx.FieldType.STRING,
        min: Influx.FieldType.STRING
      },
      tags: [
        'min'
      ]
    }
  ]
});

//influx.queryRaw('select * from cpu_measurement').then(rawData => {
//    console.log(rawData);
//    return rawData;
//})


var X = function(){
    this.result = [];
}

X.prototype = {
    query : function (obj){
        var that = this.result;

        influx.queryRaw('select * from cpu_measurement limit 3').then(rawData => {
            console.log(JSON.stringify(rawData));
           // that.push(JSON.stringify(rawData));
            that.push(rawData);
            console.log(rawData.results);
        });


    }
}

module.exports = X;



