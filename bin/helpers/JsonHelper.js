"use strict";
var jsonfile = require('jsonfile');
var fs = require('fs-extra');
var Promise = require('bluebird');
var _each = require('lodash/each');
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
    JsonHelper.readMultipleIntegerFiles = function (filenames) {
        var promises = [];
        _each(filenames, function (filename) {
            promises.push(JsonHelper.readIntegerFile(filename));
        });
        return Promise.all(promises);
    };
    JsonHelper.writeIntegerFile = function (filename, data) {
        return JsonHelper.write(filename + JsonHelper.INTEGER_EXT, data);
    };
    JsonHelper.readPrimeFile = function (filename) {
        return JsonHelper.read(filename + JsonHelper.PRIME_EXT);
    };
    JsonHelper.readMultiplePrimeFiles = function (filenames) {
        var promises = [];
        _each(filenames, function (filename) {
            promises.push(JsonHelper.readPrimeFile(filename));
        });
        return Promise.all(promises);
    };
    JsonHelper.writePrimeFile = function (filename, data) {
        return JsonHelper.write(filename + JsonHelper.PRIME_EXT, data);
    };
    JsonHelper.writeReference = function (data) {
        var referencePath = './data/reference.js';
        var referenceData = 'exports.reference = ' + JSON.stringify(data);
        fs.outputFile(referencePath, referenceData);
    };
    JsonHelper.INTEGER_EXT = '.int';
    JsonHelper.PRIME_EXT = '.prime';
    return JsonHelper;
}());
exports.JsonHelper = JsonHelper;
