"use strict";
var _map = require('lodash/map');
var reference_js_1 = require('../../data/reference.js');
var MathHelper = (function () {
    function MathHelper() {
    }
    MathHelper.getChunkId = function (n) {
        return Math.ceil(n / MathHelper.CHUNK_SIZE) * MathHelper.CHUNK_SIZE;
    };
    MathHelper.getChunks = function (n) {
        var max = MathHelper.getChunkId(n);
        var chunks = max / MathHelper.CHUNK_SIZE;
        return _map(Array(chunks), function (value, index) { return (index + 1) * MathHelper.CHUNK_SIZE; });
    };
    MathHelper.CHUNK_SIZE = reference_js_1.reference.chunkSize;
    MathHelper.LIMIT = reference_js_1.reference.length.integer;
    return MathHelper;
}());
exports.MathHelper = MathHelper;
