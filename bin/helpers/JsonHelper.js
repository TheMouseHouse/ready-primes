"use strict";
var jsonfile = require('jsonfile');
var Promise = require('bluebird');
var JsonHelper = (function () {
    function JsonHelper() {
    }
    JsonHelper.read = function (filename, options) {
        return new Promise(function (resolve, reject) {
            jsonfile.readFile("./data/" + filename, options, function (err, chunk) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(chunk);
                }
            });
        });
    };
    JsonHelper.write = function (filename, data, options) {
        return new Promise(function (resolve, reject) {
            jsonfile.writeFile("./data/" + filename, data, options, function (err) {
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
    JsonHelper.readIntegerFile = function (filename, options) {
        return JsonHelper.read(filename + JsonHelper.INTEGER_EXT, options);
    };
    JsonHelper.writeIntegerFile = function (filename, data, options) {
        return JsonHelper.write(filename + JsonHelper.INTEGER_EXT, data, options);
    };
    JsonHelper.readPrimeFile = function (filename, options) {
        return JsonHelper.read(filename + JsonHelper.PRIME_EXT, options);
    };
    JsonHelper.writePrimeFile = function (filename, data, options) {
        return JsonHelper.write(filename + JsonHelper.PRIME_EXT, data, options);
    };
    JsonHelper.INTEGER_EXT = '.int';
    JsonHelper.PRIME_EXT = '.prime';
    return JsonHelper;
}());
exports.JsonHelper = JsonHelper;
