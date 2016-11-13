"use strict";
var _map = require('lodash/map');
var reference_js_1 = require('../../data/reference.js');
var MathHelper = (function () {
    function MathHelper() {
    }
    MathHelper.getPrimeChunk = function (n) {
        var N = n > MathHelper.PRIMES_LENGTH ? MathHelper.PRIMES_LENGTH : n;
        return MathHelper.getChunk(N);
    };
    MathHelper.getIntegerChunk = function (n) {
        var N = n > MathHelper.INTEGER_LENGTH ? MathHelper.INTEGER_LENGTH : n;
        return MathHelper.getChunk(N);
    };
    MathHelper.getChunk = function (n) {
        return Math.ceil(n / MathHelper.CHUNK_SIZE) * MathHelper.CHUNK_SIZE;
    };
    MathHelper.getPrimeChunks = function (n) {
        return MathHelper.mapChunks(MathHelper.getPrimeChunk(n));
    };
    MathHelper.getIntegerChunks = function (n) {
        return MathHelper.mapChunks(MathHelper.getIntegerChunk(n));
    };
    MathHelper.mapChunks = function (max) {
        var chunks = max / MathHelper.CHUNK_SIZE;
        return _map(Array(chunks), function (value, index) { return (index + 1) * MathHelper.CHUNK_SIZE; });
    };
    MathHelper.CHUNK_SIZE = reference_js_1.reference.chunkSize;
    MathHelper.INTEGER_LENGTH = reference_js_1.reference.length.integer;
    MathHelper.PRIMES_LENGTH = reference_js_1.reference.length.prime;
    return MathHelper;
}());
exports.MathHelper = MathHelper;
