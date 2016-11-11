"use strict";
var _ = require('lodash');
var Startup = (function () {
    function Startup() {
    }
    Startup.go = function (keyword) {
        var results = [];
        _.each(Startup.PREFIX, function (prefix) {
            results.push(prefix + keyword);
        });
        _.each(Startup.SUFFIX, function (suffix) {
            results.push(keyword + suffix);
        });
        _.each(_.keys(Startup.REPLACE), function (key) {
            if (keyword.indexOf(key) > -1) {
                results.push(keyword.split(key).join(Startup.REPLACE[key]));
            }
        });
        var sample = keyword;
        _.each(_.keys(Startup.REPLACE), function (key) {
            if (sample.indexOf(key) > -1) {
                sample = sample.split(key).join(Startup.REPLACE[key]);
            }
        });
        results.push(sample);
        console.log(JSON.stringify(results));
        console.log('');
    };
    Startup.PREFIX = ['my', 'our', 'the', 'all', 'in', 'on', 'un'];
    Startup.SUFFIX = ['ly', 'sy', 'er', 'it', 'ie', 'io', 'am', 'ia', 'ora', 'ero', 'ist', 'ism', 'ium', 'ble', 'ify', 'ous', 'ing', 'oid', 'ine', 'ted', 'ed'];
    Startup.REPLACE = {
        oo: 'u',
        ee: 'i',
        i: 'y',
        le: 'l',
        z: 'x',
        ck: 'k',
        ph: 'f',
        c: 'k'
    };
    return Startup;
}());
exports.Startup = Startup;
var args = process.argv;
args.shift();
args.shift();
_.each(args, Startup.go);
