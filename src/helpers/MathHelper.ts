import * as _map from 'lodash/map';
import { reference } from '../../data/reference.js';

export class MathHelper {

	static CHUNK_SIZE: number = reference.chunkSize;
	static LIMIT: number = reference.length.integer;

	static getChunkId( n: number ): number {
		return Math.ceil( n / MathHelper.CHUNK_SIZE ) * MathHelper.CHUNK_SIZE;
	}

	static getChunks( n: number ): number[] {
		const max: number = MathHelper.getChunkId( n );
		const chunks: number = max / MathHelper.CHUNK_SIZE;
		return _map( Array( chunks ), ( value: number, index: number ) => { return ( index + 1 ) * MathHelper.CHUNK_SIZE; });
	}
}