"use strict";
var MathHelper = (function () {
    function MathHelper() {
    }
    MathHelper.getChunkId = function (n) {
        return Math.ceil(n / MathHelper.CHUNK_SIZE) * MathHelper.CHUNK_SIZE;
    };
    MathHelper.CHUNK_SIZE = 1e4;
    return MathHelper;
}());
exports.MathHelper = MathHelper;
