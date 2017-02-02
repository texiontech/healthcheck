
var Data = function (interfaceType, data, error, timestamp) {
    this.interfaceType = interfaceType;
    this.errorMsg = error;
    this.timestamp = timestamp;
    this.data = data;
}

module.exports = Data;