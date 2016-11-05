import * as jsonfile from 'jsonfile';
import * as _chunk from 'lodash/chunk';
import * as _each from 'lodash/each';
import * as _fill from 'lodash/fill';

function noop() {
}

function sieve( limit ): { integers: number[], primes: number[]} {
	const startTimer: number = new Date().getTime();
	const limitSqrt          = Math.sqrt( limit );
	let sieve: boolean[]     = [];
	let n;

	sieve[ 2 ] = true;
	sieve[ 3 ] = true;

	for ( let x = 1; x <= limitSqrt; x++ ) {
		let xx = x * x;
		for ( let y = 1; y <= limitSqrt; y++ ) {
			let yy = y * y;
			if ( xx + yy >= limit ) {
				break;
			}
			// first quadratic using m = 12 and r in R1 = {r : 1, 5}
			n = (4 * xx) + (yy);
			if ( n <= limit && (n % 12 == 1 || n % 12 == 5) ) {
				sieve[ n ] = !sieve[ n ];
			}
			// second quadratic using m = 12 and r in R2 = {r : 7}
			n = (3 * xx) + (yy);
			if ( n <= limit && (n % 12 == 7) ) {
				sieve[ n ] = !sieve[ n ];
			}
			// third quadratic using m = 12 and r in R3 = {r : 11}
			n = (3 * xx) - (yy);
			if ( x > y && n <= limit && (n % 12 == 11) ) {
				sieve[ n ] = !sieve[ n ];
			}
		}
	}

	let x: number;
	let i: number;

	// false each prime's multiples
	for ( n = 5; n <= limitSqrt; n++ ) {
		if ( sieve[ n ] ) {
			x = n * n;
			for ( i = x; i <= limit; i += x ) {
				sieve[ i ] = false;
			}
		}
	}

	let integers: number[] = _fill( Array( limit ), 0 );
	let primes: number[]   = [];

	sieve.forEach( ( value: boolean, index: number ) => {
		if ( value ) {
			primes.push( index );
			integers[ index ] = 1;
		}
	} );
	console.log( 'Run time:', ((new Date().getTime()) - startTimer) / 1000, 'ms' );

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