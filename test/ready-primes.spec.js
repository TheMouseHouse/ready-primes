
describe( 'Ready-Primes', function () {

	describe( '#isPrime( number )', function () {
		var lastTestPrime = _.last( primeTestData );
		it( `should return true for ${lastTestPrime}`, function () {
			return ReadyPrimes.isPrime( lastTestPrime )
				.then(( answer ) => {
					assert.isTrue( answer );
				})
		});
	});

});