/// <reference types="bluebird" />
import * as Promise from 'bluebird';

declare module 'ready-primes' {
    class ReadyPrimes {
        private static getMultiple(func, chunks, size, index?);
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
        static primes(size: number, index?: number): Promise<any>;
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
        static integers(size: number, index?: number): Promise<any>;
        /**
         * Returns Promise, which when resolved, returns true or false whether provided number is a Prime.
         *
         * @static
         * @param {number} n
         * @returns {Promise<any>}
         *
         * @memberOf ReadyPrimes
         */
        static isPrime(n: number): Promise<any>;
    }

}