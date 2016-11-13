import * as _map from 'lodash/map';
import { reference } from '../../data/reference.js';

export class MathHelper {

	static CHUNK_SIZE: number = reference.chunkSize;
	static INTEGER_LENGTH: number = reference.length.integer;
	static PRIMES_LENGTH: number = reference.length.prime;

	static getPrimeChunk( n: number ): number {
		const N: number = n > MathHelper.PRIMES_LENGTH ? MathHelper.PRIMES_LENGTH : n;
		return MathHelper.getChunk( N );
	}

	static getIntegerChunk( n: number ): number {
		const N: number = n > MathHelper.INTEGER_LENGTH ? MathHelper.INTEGER_LENGTH : n;
		return MathHelper.getChunk( N );
	}

	private static getChunk( n: number ): number {
		return Math.ceil( n / MathHelper.CHUNK_SIZE ) * MathHelper.CHUNK_SIZE;
	}

	static getPrimeChunks( n: number ): number[] {
		return MathHelper.mapChunks( MathHelper.getPrimeChunk( n ) );
	}

	static getIntegerChunks( n: number ): number[] {
		return MathHelper.mapChunks( MathHelper.getIntegerChunk( n ) );
	}

	private static mapChunks( max: number ): number[] {
		const chunks: number = max / MathHelper.CHUNK_SIZE;
		return _map( Array( chunks ), ( value: number, index: number ) => { return ( index + 1 ) * MathHelper.CHUNK_SIZE; });
	}
}