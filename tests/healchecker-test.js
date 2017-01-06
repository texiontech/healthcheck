// tests/part1/cart-summary-test.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Health = require('./../model.js');
var mock = require('./mock/result.json');

describe('Health Result', function () {
    var health = new Health();

    it('health results should return [] if no items are query', function () {
        expect(health.result.length).to.equal(0);
    });
    it('health results should return [] if no items are query', function () {        
        var response = health.query();
        expect(response).to.deep.equal(mock);
    });
});