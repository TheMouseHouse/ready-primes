"use strict";
var JsonHelper_1 = require('./helpers/JsonHelper');
var ReadyPrimes = (function () {
    function ReadyPrimes() {
    }
    ReadyPrimes.prototype.getCollection = function (size) {
        return [size];
    };
    ReadyPrimes.readIntegers = function (limit) {
        return JsonHelper_1.JsonHelper.read(limit.toString());
    };
    return ReadyPrimes;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReadyPrimes;
ReadyPrimes.readIntegers(10000).then(function (response) {
    console.log(response);
});
