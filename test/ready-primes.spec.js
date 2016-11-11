
describe( 'Ready-Primes', function () {

	describe( '#isPrime( number )', function () {
		it( `should return true for ${lastTestPrime}`, function () {
			return ReadyPrimes.isPrime( lastTestPrime )
				.then(( answer ) => {
					assert.isTrue( answer );
				})
		});
	});

});