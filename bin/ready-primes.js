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
    /**
     * Returns Promise, which when resolved, returns an Array of Primes of length required (size).
     *
     * @static
     * @param {number} size
     * @param {number} [index=0]
     * @returns {Promise<any>}
     *
     * @memberOf ReadyPrimes
     */
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
    /**
     * Returns Promise, which when resolved, returns Array with given length (size) of 0's and 1's corresponding to whether index is a Prime or not.
     * Example:
     *
     *         *  *     *     *             *   ... primes
     * [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ] ... Indexes
     * [ 0, 0, 1, 1, 0, 1, 0, 1, 0, 0,  0,  1 ] ... result you will receive.
     *
     * Therefore, result Array[11] = 1 = true = prime
     *
     * @static
     * @param {number} size
     * @param {number} [index=0]
     * @returns {Promise<any>}
     *
     * @memberOf ReadyPrimes
     */
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
    /**
     * Returns Promise, which when resolved, returns true or false whether provided number is a Prime.
     *
     * @static
     * @param {number} n
     * @returns {Promise<any>}
     *
     * @memberOf ReadyPrimes
     */
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
