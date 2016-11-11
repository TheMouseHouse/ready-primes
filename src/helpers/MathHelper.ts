export class MathHelper {

	static CHUNK_SIZE: number = 1e4;

	static getChunkId( n: number ): number {
		return Math.ceil( n / MathHelper.CHUNK_SIZE ) * MathHelper.CHUNK_SIZE;
	}
}