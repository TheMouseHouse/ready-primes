describe( 'MathHelper', function () {

	describe( '#getPrimeChunk( number )', function () {
		it( `should return 10000 for 7`, function () {
			var chunk = MathHelper.getPrimeChunk( 7 );
			assert.equal( chunk, 10000 );
		});

		it( `should return 10000 for 104729`, function () {
			var chunk = MathHelper.getPrimeChunk( 104729 );
			assert.equal( chunk, 10000 );
		});

		it( `should return 20000 for 104743`, function () {
			var chunk = MathHelper.getPrimeChunk( 104743 );
			assert.equal( chunk, 20000 );
		});

		it( `should return error for -1`, function () {
			var chunk = MathHelper.getPrimeChunk( -1 );
			assert.isNotOk( chunk );
		});
	});

	describe( '#getIntegerChunk( number )', function () {
		it( `should return 10000 for 10`, function () {
			var chunk = MathHelper.getIntegerChunk( 10 );
			assert.equal( chunk, 10000 );
		});

		it( `should return 10000 for 10000`, function () {
			var chunk = MathHelper.getIntegerChunk( 10000 );
			assert.equal( chunk, 10000 );
		});

		it( `should return 130000 for 123456`, function () {
			var chunk = MathHelper.getIntegerChunk( 123456 );
			assert.equal( chunk, 130000 );
		});

		it( `should return error for -1`, function () {
			var chunk = MathHelper.getIntegerChunk( -1 );
			assert.isNotOk( chunk );
		});
	});

});