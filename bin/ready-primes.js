"use strict";
var Promise = require('bluebird');
var JsonHelper_1 = require('./helpers/JsonHelper');
var MathHelper_1 = require('./helpers/MathHelper');
var ReadyPrimes = (function () {
    function ReadyPrimes() {
    }
    ReadyPrimes.isPrime = function (n) {
        var chunk = MathHelper_1.MathHelper.getChunkId(n);
        return new Promise(function (resolve, reject) {
            JsonHelper_1.JsonHelper.readIntegerFile(chunk).then(function (data) {
                resolve(data[n] === 1);
            }).error(function (err) {
                reject(false);
            });
        });
    };
    return ReadyPrimes;
}());
exports.ReadyPrimes = ReadyPrimes;
