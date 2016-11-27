import * as _map from 'lodash/map';
import * as _each from 'lodash/each';
import { reference } from '../../data/reference.js';
import { Reference, ReferenceObj } from './../generate';

export class MathHelper {

	static readonly REF: Reference = reference;

	static getPrimeChunk( n: number ): number {
		if ( n >= MathHelper.REF.last.prime ) {
			return Math.ceil( MathHelper.REF.length.prime / MathHelper.REF.chunkSize ) * MathHelper.REF.chunkSize;
		}
		let found: number;
		_each( reference.primes, ( chunk: ReferenceObj, index: string ) => {
			if ( n >= chunk.first && n <= chunk.last ) {
				found = Number( index );
				return false;
			}
		});
		return Number( found );
	}

	static getIntegerChunk( n: number ): number {
		const N: number = n > MathHelper.REF.length.integer ? MathHelper.REF.length.integer : n;
		return Math.ceil( N / MathHelper.REF.chunkSize ) * MathHelper.REF.chunkSize;
	}

	static getPrimeChunks( n: number ): number[] {
		return MathHelper.mapChunks( MathHelper.getPrimeChunk( n ) );
	}

	static getIntegerChunks( n: number ): number[] {
		return MathHelper.mapChunks( MathHelper.getIntegerChunk( n ) );
	}

	private static mapChunks( max: number ): number[] {
		const chunks: number = max / MathHelper.REF.chunkSize;
		return _map( Array( chunks ), ( value: number, index: number ) => { return ( index + 1 ) * MathHelper.REF.chunkSize; });
	}
}