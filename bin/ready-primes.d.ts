declare module 'ready-primes' {
    export class ReadyPrimes {
        static primes(size: number, index?: number): Promise<any>;
        static integers(size: number, index?: number): Promise<any>;
        static isPrime(n: number): Promise<any>;
    }
}