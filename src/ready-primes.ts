import * as Promise from 'bluebird';
import { JsonHelper } from './helpers/JsonHelper';
import { MathHelper } from './helpers/MathHelper';
import * as _flatten from 'lodash/flatten';
import * as _slice from 'lodash/slice';
import * as _takeRight from 'lodash/takeRight';

export class ReadyPrimes {

	private static getMultiple( func: Function, chunks: number[], size: number, index: number = 0 ): Promise<any> {
		return new Promise(( resolve: Function, reject: Function ) => {
			func( chunks ).then(( data: any ) => {
				resolve( _slice( _flatten( data ), index, size + index ) );
			}).error(() => reject );
		});
	}

	static primes( size: number, index: number = 0 ): Promise<any> {
		if ( index < 0 ) {
			index = 0;
		}
		if ( index > MathHelper.REF.length.prime - size ) {
			index = MathHelper.REF.length.prime - size;
		}
		let chunks: number[] = MathHelper.getPrimeChunks( size + index );
		return ReadyPrimes.getMultiple( JsonHelper.readMultiplePrimeFiles, chunks, size, index );
	}

	static integers( size: number, index: number = 0 ): Promise<any> {
		if ( index < 0 ) {
			index = 0;
		}
		if ( index > MathHelper.REF.length.integer - size ) {
			index = MathHelper.REF.length.integer - size;
		}
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