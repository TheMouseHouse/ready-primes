import * as Promise from 'bluebird';
import { JsonHelper } from './helpers/JsonHelper';
import { MathHelper } from './helpers/MathHelper';
import * as _flatten from 'lodash/flatten';
import * as _slice from 'lodash/slice';

export class ReadyPrimes {

	private static getMultiple( func: Function, chunks: number[], size: number, index: number = 0 ): Promise<any> {
		return new Promise(( resolve: Function, reject: Function ) => {
			func( chunks ).then(( data: any ) => {
				resolve( _slice( _flatten( data ), index, size + index ) );
			}).error(() => reject );
		});
	}

	static primes( size: number, index: number = 0 ): Promise<any> {
		let chunks: number[] = MathHelper.getPrimeChunks( size + index );
		return ReadyPrimes.getMultiple( JsonHelper.readMultiplePrimeFiles, chunks, size, index );
	}

	static integers( size: number, index: number = 0 ): Promise<any> {
		let chunks: number[] = MathHelper.getIntegerChunks( size + index );
		return ReadyPrimes.getMultiple( JsonHelper.readMultipleIntegerFiles, chunks, size, index );
	}

	static isPrime( n: number ): Promise<any> {
		let chunk: number = MathHelper.getIntegerChunk( n );

		return new Promise(( resolve: Function, reject: Function ) => {
			JsonHelper.readIntegerFile( chunk ).then(( data: number[] ) => {
				resolve( data[ n ] === 1 );
			}).error(( err ) => {
				reject( false );
			});
		});
	}

}

const startTimer: number = new Date().getTime();
let endTime: number = 0;
ReadyPrimes.primes( 4, 2e7 ).then(( data: number[] ) => {
	endTime = new Date().getTime() - startTimer;
	console.log( data );
	console.log( 'Response in', endTime, 'ms' );
});