"use strict";
var Promise = require('bluebird');
var JsonHelper_1 = require('./helpers/JsonHelper');
var MathHelper_1 = require('./helpers/MathHelper');
var _flatten = require('lodash/flatten');
var _slice = require('lodash/slice');
var ReadyPrimes = (function () {
    function ReadyPrimes() {
    }
    ReadyPrimes.getMultiple = function (func, size, index) {
        if (index === void 0) { index = 0; }
        var chunks = MathHelper_1.MathHelper.getChunks(size + index);
        return new Promise(function (resolve, reject) {
            func(chunks).then(function (data) {
                resolve(_slice(_flatten(data), index, size + index));
            }).error(function () { return reject; });
        });
    };
    ReadyPrimes.primes = function (size, index) {
        if (index === void 0) { index = 0; }
        return ReadyPrimes.getMultiple(JsonHelper_1.JsonHelper.readMultiplePrimeFiles, size, index);
    };
    ReadyPrimes.integers = function (size, index) {
        if (index === void 0) { index = 0; }
        return ReadyPrimes.getMultiple(JsonHelper_1.JsonHelper.readMultipleIntegerFiles, size, index);
    };
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
