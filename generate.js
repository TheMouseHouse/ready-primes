"use strict";
var _fill = require('lodash/fill');
function noop() {
}
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
            // first quadratic using m = 12 and r in R1 = {r : 1, 5}
            n = (4 * xx) + (yy);
            if (n <= limit && (n % 12 == 1 || n % 12 == 5)) {
                sieve[n] = !sieve[n];
            }
            // second quadratic using m = 12 and r in R2 = {r : 7}
            n = (3 * xx) + (yy);
            if (n <= limit && (n % 12 == 7)) {
                sieve[n] = !sieve[n];
            }
            // third quadratic using m = 12 and r in R3 = {r : 11}
            n = (3 * xx) - (yy);
            if (x_1 > y && n <= limit && (n % 12 == 11)) {
                sieve[n] = !sieve[n];
            }
        }
    }
    var x;
    var i;
    // false each prime's multiples
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
// let all = sieve( Number( process.argv[ 2 ] ) || 7e7 );
// console.log( 'Primes found:', all.primes.length );
// console.log( 'Last prime:', all.primes[ all.primes.length - 1 ] );
//
// let chunkSize = Number( process.argv[ 3 ] ) || 1e4;
//
// _each( _chunk( all.primes, chunkSize ), ( chunk: number[], index: number ) => {
// 	jsonfile.writeFile( `./data/${(index + 1) * chunkSize}.prime`, chunk, noop );
// } );
//
// all.integers.shift();
// _each( _chunk( all.integers, chunkSize ), ( chunk: number[], index: number ) => {
// 	if ( index === 0 ) {
// 		chunk.reverse();
// 		chunk.push( 0 );
// 		chunk.reverse();
// 	}
// 	jsonfile.writeFile( `./data/${(index + 1) * chunkSize}.int`, chunk, noop );
// } );
// jsonfile.readFile('./data/10000.prime', (err:any, obj:any) => {
// 	console.dir(obj);
// }); 
