import * as fs from 'fs-extra';
import { JsonHelper } from './helpers/JsonHelper';
import * as _chunk from 'lodash/chunk';
import * as _each from 'lodash/each';
import * as _fill from 'lodash/fill';
import * as _last from 'lodash/last';

type IntegersCollection = number[];
type PrimeCollection = number[];
type Collections = { primes: PrimeCollection, integers: IntegersCollection };
type ReferenceObj = { first: number, last: number };
type ReferenceCategory = { [chunk: number]: ReferenceObj };
type ReferenceMetric = { prime: number, integer: number };
type Reference = {
    integers: ReferenceCategory,
    primes: ReferenceCategory,
    last: ReferenceMetric,
    length: ReferenceMetric,
    chunkSize: number
};

function sieve(limit: number): Collections {
    const startTimer: number = new Date().getTime();
    const limitSqrt: number = Math.sqrt(limit);
    let sieve: boolean[] = [];
    let n: number;

    sieve[2] = true;
    sieve[3] = true;

    for (let x: number = 1; x <= limitSqrt; x++) {
        let xx: number = x * x;

        for (let y: number = 1; y <= limitSqrt; y++) {
            let yy: number = y * y;
            if (xx + yy >= limit) {
                break;
            }
            // first quadratic using m = 12 and r in R1 = {r : 1, 5}
            n = (4 * xx) + (yy);
            if (n <= limit && (n % 12 === 1 || n % 12 === 5)) {
                sieve[n] = !sieve[n];
            }
            // second quadratic using m = 12 and r in R2 = {r : 7}
            n = (3 * xx) + (yy);
            if (n <= limit && (n % 12 === 7)) {
                sieve[n] = !sieve[n];
            }
            // third quadratic using m = 12 and r in R3 = {r : 11}
            n = (3 * xx) - (yy);
            if (x > y && n <= limit && (n % 12 === 11)) {
                sieve[n] = !sieve[n];
            }
        }
    }

    let x: number;
    let i: number;

    // false each prime's multiples
    for (n = 5; n <= limitSqrt; n++) {
        if (sieve[n]) {
            x = n * n;
            for (i = x; i <= limit; i += x) {
                sieve[i] = false;
            }
        }
    }

    let integers: number[] = _fill(Array(limit), 0);
    let primes: number[] = [];

    sieve.forEach((value: boolean, index: number) => {
        if (value) {
            primes.push(index);
            integers[index] = 1;
        }
    });
    console.log('Run time:', ((new Date().getTime()) - startTimer) / 1000, 'seconds');

    return { primes: primes, integers: integers };
}

function hasArg(needle: string): boolean {
    return process.argv.indexOf(needle) > -1;
}

function getArgValue(needle: string): string {
    let result: string = undefined;
    _each(process.argv, (arg: string) => {
        if (arg.substr(0, needle.length + 1) === needle + '=') {
            let split: string[] = arg.split('=');
            result = split[1];
        }
    });
    return result;
}

let hasRead: boolean = hasArg('-r');
let hasWrite: boolean = hasArg('-w');
let size: number = Number(getArgValue('-size')) || 1e6;
let chunkSize: number = Number(getArgValue('-chunk')) || 1e4;

if (hasRead && !hasWrite) {
    JsonHelper.readPrimeFile(10000).then((response) => {
        console.log('10000th Prime: ', response[response.length - 1]);
    });
}

if (hasWrite && !hasRead) {
    console.log('Generating primes. Limited to', size);
    console.log('Approximate ETA:', Math.floor(Math.floor(3e5 / 7e7 * size) / 10) / 1000, 'seconds');

    fs.emptyDir('./data', (err: any) => {
        if (!err) {
            let all: Collections = sieve(size + 1);
            let referenceData: Reference = {
                integers: {},
                primes: {},
                last: {
                    prime: all.primes[all.primes.length - 1],
                    integer: size
                },
                length: {
                    prime: all.primes.length,
                    integer: size
                },
                chunkSize: chunkSize
            };

            console.log('Primes found:', all.primes.length);
            console.log('Last prime:', all.primes[all.primes.length - 1]);

            _each(_chunk(all.primes, chunkSize), (chunk: PrimeCollection, index: number) => {
                const chunkName: number = (index + 1) * chunkSize;
                referenceData.primes[chunkName] = <ReferenceObj>{ first: chunk[0], last: _last(chunk) };
                JsonHelper.writePrimeFile(chunkName, chunk);
            });

            all.integers.shift();
            _each(_chunk(all.integers, chunkSize), (chunk: IntegersCollection, index: number) => {
                if (index === 0) {
                    chunk.reverse();
                    chunk.push(0);
                    chunk.reverse();
                }
                const chunkName: number = (index + 1) * chunkSize;
                let first: number = chunkName - chunkSize;
                referenceData.integers[chunkName] = <ReferenceObj>{ first: first === 0 ? first : first + 1, last: chunkName };
                JsonHelper.writeIntegerFile(chunkName, chunk);
            });

            JsonHelper.writeReference(referenceData);
        }
    });
}