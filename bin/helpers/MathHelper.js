"use strict";
var _map = require('lodash/map');
var _each = require('lodash/each');
var reference_js_1 = require('../../data/reference.js');
var MathHelper = (function () {
    function MathHelper() {
    }
    MathHelper.getPrimeChunk = function (n) {
        if (n >= MathHelper.REF.last.prime) {
            return Math.ceil(MathHelper.REF.length.prime / MathHelper.REF.chunkSize) * MathHelper.REF.chunkSize;
        }
        var found;
        _each(reference_js_1.reference.primes, function (chunk, index) {
            if (n >= chunk.first && n <= chunk.last) {
                found = Number(index);
                return false;
            }
        });
        return Number(found);
    };
    MathHelper.getIntegerChunk = function (n) {
        var N = n > MathHelper.REF.length.integer ? MathHelper.REF.length.integer : n;
        return Math.ceil(N / MathHelper.REF.chunkSize) * MathHelper.REF.chunkSize;
    };
    MathHelper.getPrimeChunks = function (n) {
        return MathHelper.mapChunks(MathHelper.getPrimeChunk(n));
    };
    MathHelper.getIntegerChunks = function (n) {
        return MathHelper.mapChunks(MathHelper.getIntegerChunk(n));
    };
    MathHelper.mapChunks = function (max) {
        var chunks = max / MathHelper.REF.chunkSize;
        return _map(Array(chunks), function (value, index) { return (index + 1) * MathHelper.REF.chunkSize; });
    };
    MathHelper.REF = reference_js_1.reference;
    return MathHelper;
}());
exports.MathHelper = MathHelper;
