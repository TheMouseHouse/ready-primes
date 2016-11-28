# ReadyPrimes (Standard)

Pre-calculated collections of prime numbers, natural numbers with distinguished primes and methods to retrieve them.

Get any number of Primes in **milliseconds** !!!

Standard version is limited to **78,498** primes and **1,000,000** integers.
If you need **more** get [ReadyPrimes Extended](https://www.npmjs.com/package/ready-primes-extended).


## Install
```
npm install ready-primes
```

ReadyPrimes will generate necessary files post install.

----------


## Usage

```js
const ReadyPrimes = require('ready-primes');

ReadyPrimes.primes(4).then( (result) => {
    console.log(result);
    // output: [ 2, 3, 5, 7 ]
});

ReadyPrimes.integers(7).then( (result) => {
    console.log(result);
    // output: [ 0, 0, 1, 1, 0, 1, 0, 1 ]
});

ReadyPrimes.isPrime(11).then( (result) => {
    console.log(result);
    // output: true
});
```

## Methods

### primes ( size, index? )
`size: int` - length of desired result array  
`index: int (optional)` - start position. Default is 0  
**returns:** `Promise < int[] >`

```js
ReadyPrimes.primes(4).then( (result) => {
    console.log(result);
    // output: [ 2, 3, 5, 7 ]
});

ReadyPrimes.primes(4, 2).then( (result) => {
    console.log(result);
    // output: [ 5, 7, 11, 13 ]
});
```

### integers ( size, index? )
`size: int` - the length of desired result array  
`index: int (optional)` - start position. Default is 0  
**returns:** `Promise < int[] >`

The result is an Array of 1's and 0's, where the index inside the Array determines the actual integer.
The length of the result is always `size + 1`, since Array indexes start from 0.

Example:
Array[11] = 1, because it is a prime
Array[12] = 0, because it is not a prime

```js
ReadyPrimes.integers(7).then( (result) => {
    console.log(result);
    // output: [ 0, 0, 1, 1, 0, 1, 0, 1 ]
});

ReadyPrimes.integers(7, 2).then( (result) => {
    console.log(result);
    // output: [ 1, 1, 0, 1, 0, 1, 0, 1 ]
});
```

### isPrime ( n )
`n: int` - number to look-up  
**returns:** `Promise < boolean >`

```js
ReadyPrimes.isPrime(11).then( (result) => {
    console.log(result);
    // output: true
});
```

