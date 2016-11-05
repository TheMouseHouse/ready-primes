"use strict";
var JsonHelper_1 = require('./helpers/JsonHelper');
var _chunk = require('lodash/chunk');
var _each = require('lodash/each');
var _fill = require('lodash/fill');
function sieve(limit) {
    var startTimer = new Date().getTime();
    var limitSqrt = Math.sqrt(limit);
    var sieve = [];
    var n;
    sieve[2] = true;
    sieve[3] = true;
    for (var x_1 = 1; x_1 <= limitSqrt; x_1++) {
        var xx = x_1 * x_1;
        for (var y = 1; y <= limitSqrt; y++) {
            var yy = y * y;
            if (xx + yy >= limit) {
                break;
            }
            n = (4 * xx) + (yy);
            if (n <= limit && (n % 12 === 1 || n % 12 === 5)) {
                sieve[n] = !sieve[n];
            }
            n = (3 * xx) + (yy);
            if (n <= limit && (n % 12 === 7)) {
                sieve[n] = !sieve[n];
            }
            n = (3 * xx) - (yy);
            if (x_1 > y && n <= limit && (n % 12 === 11)) {
                sieve[n] = !sieve[n];
            }
        }
    }
    var x;
    var i;
    for (n = 5; n <= limitSqrt; n++) {
        if (sieve[n]) {
            x = n * n;
            for (i = x; i <= limit; i += x) {
                sieve[i] = false;
            }
        }
    }
    var integers = _fill(Array(limit), 0);
    var primes = [];
    sieve.forEach(function (value, index) {
        if (value) {
            primes.push(index);
            integers[index] = 1;
        }
    });
    console.log('Run time:', ((new Date().getTime()) - startTimer) / 1000, 'ms');
    return { primes: primes, integers: integers };
}
function hasArg(needle) {
    return process.argv.indexOf(needle) > -1;
}
function getArgValue(needle) {
    var result = undefined;
    _each(process.argv, function (arg) {
        if (arg.substr(0, needle.length + 1) === needle + '=') {
            var split = arg.split('=');
            result = split[1];
        }
    });
    return result;
}
var hasRead = hasArg('-r');
var hasWrite = hasArg('-w');
if (hasRead && !hasWrite) {
    JsonHelper_1.JsonHelper.readPrimeFile(10000).then(function (response) {
        console.log('10000th Prime: ', response[response.length - 1]);
    });
}
if (hasWrite && !hasRead) {
    var all = sieve(Number(getArgValue('-size')) || 7e7);
    console.log('Primes found:', all.primes.length);
    console.log('Last prime:', all.primes[all.primes.length - 1]);
    var chunkSize_1 = Number(getArgValue('-chunk')) || 1e4;
    _each(_chunk(all.primes, chunkSize_1), function (chunk, index) {
        JsonHelper_1.JsonHelper.writePrimeFile((index + 1) * chunkSize_1, chunk);
    });
    all.integers.shift();
    _each(_chunk(all.integers, chunkSize_1), function (chunk, index) {
        if (index === 0) {
            chunk.reverse();
            chunk.push(0);
            chunk.reverse();
        }
        JsonHelper_1.JsonHelper.writeIntegerFile((index + 1) * chunkSize_1, chunk);
    });
}
