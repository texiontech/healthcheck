// tests/part1/cart-summary-test.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Health = require('./../models/health.js');
var mock = require('./mock/health.json');

describe('Health Result', function () {
    var health = new Health();

    it('health results should return [] if no items are query', function () {
        expect(health.result.length).to.equal(0);
    });

    var responseData = health.query();

    it('the property cpu should be an instanceof Cpu', function(){
        var cpu = responseData[0].data;
        console.log(cpu);
        expect(cpu).to.be.an.instanceof(Cpu);
    });
    it('the property diskio should be an instanceof Diskio', function(){
        var diskio = responseData.diskio;
    });
    it('the property diskusage should be an instanceof Diskusage', function(){
        var diskusage = responseData.diskusage;
    });
    it('the property memory should be an instanceof Memory', function(){
        var memory = responseData.memory;
    });
    it('the property nwbandwidth should be an instanceof NetworkBandwidth', function(){
        var nwbandwidth = responseData.nwbandwidth;
    });
    it('the property nwconcurrence should be an instanceof NetworkConcurrence', function(){
        var nwconcurrence = responseData.nwconcurrence;
    });
    it('health results should equal to mock/health.json when query', function () {        
        expect(responseData).to.deep.equal(mock);
    });
});