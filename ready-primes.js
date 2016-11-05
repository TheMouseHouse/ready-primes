"use strict";
var jsonfile_p = require('jsonfile-promised');
var ReadyPrimes = (function () {
    function ReadyPrimes() {
    }
    ReadyPrimes.prototype.getCollection = function (size) {
        return [size];
    };
    ReadyPrimes.readIntegers = function (limit) {
        return jsonfile_p.readFile('./data/' + limit + '.int');
    };
    return ReadyPrimes;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReadyPrimes;
ReadyPrimes.readIntegers(10000).then(function (response) {
    console.log(response);
});
