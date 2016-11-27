"use strict";
var Promise = require('bluebird');
var JsonHelper_1 = require('./helpers/JsonHelper');
var MathHelper_1 = require('./helpers/MathHelper');
var _flatten = require('lodash/flatten');
var _slice = require('lodash/slice');
var ReadyPrimes = (function () {
    function ReadyPrimes() {
    }
    ReadyPrimes.getMultiple = function (func, chunks, size, index) {
        if (index === void 0) { index = 0; }
        return new Promise(function (resolve, reject) {
            func(chunks).then(function (data) {
                resolve(_slice(_flatten(data), index, size + index));
            }).error(function () { return reject; });
        });
    };
    ReadyPrimes.primes = function (size, index) {
        if (index === void 0) { index = 0; }
        if (index < 0) {
            index = 0;
        }
        if (index > MathHelper_1.MathHelper.REF.length.prime - size) {
            index = MathHelper_1.MathHelper.REF.length.prime - size;
        }
        var chunks = MathHelper_1.MathHelper.getPrimeChunks(size + index);
        return ReadyPrimes.getMultiple(JsonHelper_1.JsonHelper.readMultiplePrimeFiles, chunks, size, index);
    };
    ReadyPrimes.integers = function (size, index) {
        if (index === void 0) { index = 0; }
        if (index < 0) {
            index = 0;
        }
        if (index > MathHelper_1.MathHelper.REF.length.integer - size) {
            index = MathHelper_1.MathHelper.REF.length.integer - size;
        }
        var chunks = MathHelper_1.MathHelper.getIntegerChunks(size + index);
        return ReadyPrimes.getMultiple(JsonHelper_1.JsonHelper.readMultipleIntegerFiles, chunks, size, index);
    };
    ReadyPrimes.isPrime = function (n) {
        var chunk = MathHelper_1.MathHelper.getIntegerChunk(n);
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
