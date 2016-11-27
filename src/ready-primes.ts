import * as Promise from 'bluebird';
import { JsonHelper } from './helpers/JsonHelper';
import { MathHelper } from './helpers/MathHelper';
import * as _flatten from 'lodash/flatten';
import * as _slice from 'lodash/slice';

export class ReadyPrimes {

    private static getMultiple(func: Function, chunks: number[], size: number, index: number = 0): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            func(chunks).then((data: any) => {
                resolve(_slice(_flatten(data), index, size + index));
            }).error(() => reject);
        });
    }


	/**
	 * Returns Promise, which when resolved, returns an Array of Primes of length required (size).
	 *
	 * @static
	 * @param {number} size
	 * @param {number} [index=0]
	 * @returns {Promise<any>}
	 *
	 * @memberOf ReadyPrimes
	 */
    static primes(size: number, index: number = 0): Promise<any> {
        if (index < 0) {
            index = 0;
        }
        if (index > MathHelper.REF.length.prime - size) {
            index = MathHelper.REF.length.prime - size;
        }
        let chunks: number[] = MathHelper.getPrimeChunks(size + index);
        return ReadyPrimes.getMultiple(JsonHelper.readMultiplePrimeFiles, chunks, size, index);
    }

	/**
	 * Returns Promise, which when resolved, returns Array with given length (size) of 0's and 1's corresponding to whether index is a Prime or not.
	 * Example:
	 *
	 *         *  *     *     *             *   ... primes
	 * [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ] ... Indexes
	 * [ 0, 0, 1, 1, 0, 1, 0, 1, 0, 0,  0,  1 ] ... result you will receive.
	 *
	 * Therefore, result Array[11] = 1 = true = prime
	 *
	 * @static
	 * @param {number} size
	 * @param {number} [index=0]
	 * @returns {Promise<any>}
	 *
	 * @memberOf ReadyPrimes
	 */
    static integers(size: number, index: number = 0): Promise<any> {
        if (index < 0) {
            index = 0;
        }
        if (index > MathHelper.REF.length.integer - size) {
            index = MathHelper.REF.length.integer - size;
        }
        let chunks: number[] = MathHelper.getIntegerChunks(size + index);
        return ReadyPrimes.getMultiple(JsonHelper.readMultipleIntegerFiles, chunks, size, index);
    }

	/**
	 * Returns Promise, which when resolved, returns true or false whether provided number is a Prime.
	 *
	 * @static
	 * @param {number} n
	 * @returns {Promise<any>}
	 *
	 * @memberOf ReadyPrimes
	 */
    static isPrime(n: number): Promise<any> {
        let chunk: number = MathHelper.getIntegerChunk(n);

        return new Promise((resolve: Function, reject: Function) => {
            JsonHelper.readIntegerFile(chunk).then((data: number[]) => {
                resolve(data[n] === 1);
            }).error((err) => {
                reject(false);
            });
        });
    }

}