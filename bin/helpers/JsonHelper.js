"use strict";
var jsonfile = require('jsonfile');
var Promise = require('bluebird');
var JsonHelper = (function () {
    function JsonHelper() {
    }
    JsonHelper.read = function (filename) {
        return new Promise(function (resolve, reject) {
            jsonfile.readFile("./data/" + filename, {}, function (err, chunk) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(chunk);
                }
            });
        });
    };
    JsonHelper.write = function (filename, data) {
        return new Promise(function (resolve, reject) {
            jsonfile.writeFile("./data/" + filename, data, {}, function (err) {
                if (err) {
                    console.log(err);
                    reject(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    JsonHelper.readIntegerFile = function (filename) {
        return JsonHelper.read(filename + JsonHelper.INTEGER_EXT);
    };
    JsonHelper.writeIntegerFile = function (filename, data) {
        return JsonHelper.write(filename + JsonHelper.INTEGER_EXT, data);
    };
    JsonHelper.readPrimeFile = function (filename) {
        return JsonHelper.read(filename + JsonHelper.PRIME_EXT);
    };
    JsonHelper.writePrimeFile = function (filename, data) {
        return JsonHelper.write(filename + JsonHelper.PRIME_EXT, data);
    };
    JsonHelper.INTEGER_EXT = '.int';
    JsonHelper.PRIME_EXT = '.prime';
    return JsonHelper;
}());
exports.JsonHelper = JsonHelper;
