
describe( 'Ready-Primes', function () {

	describe( '#primes( size, index )', function () {
		it( `should return [2,3,5] for size=3,index=0`, function () {
			return ReadyPrimes.primes( 3, 0 )
				.then(( answer ) => {
					assert.deepEqual( answer, [ 2, 3, 5 ] );
				})
		});

		it( `should return [3,5,7] for size=3,index=1`, function () {
			return ReadyPrimes.primes( 3, 1 )
				.then(( answer ) => {
					assert.deepEqual( answer, [ 3, 5, 7 ] );
				})
		});

		it( `should return [] for size=2,index=${2e7}`, function () {
			return ReadyPrimes.primes( 2, 2e7 )
				.then(( answer ) => {
					assert.deepEqual( answer, [] );
				})
		});

		it( `should return [2,3,5] for size=3,index=-1`, function () {
			return ReadyPrimes.primes( 3, -1 )
				.then(( answer ) => {
					assert.deepEqual( answer, [ 2, 3, 5 ] );
				})
		});
	});

	describe( '#isPrime( number )', function () {
		it( `should return true for ${lastTestPrime}`, function () {
			return ReadyPrimes.isPrime( lastTestPrime )
				.then(( answer ) => {
					assert.isTrue( answer );
				})
		});
	});

});