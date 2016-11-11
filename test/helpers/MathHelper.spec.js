describe( 'MathHelper', function () {

	describe( 'Static', function () {
		it( `CHUNK_SIZE should return ${1e4}`, function () {
			assert.equal( MathHelper.CHUNK_SIZE, 1e4 );
		});
	});


	describe( '#getChunkId( number )', function () {
		it( `should return 10000 for 10`, function () {
			var chunk = MathHelper.getChunkId( 10 );
			assert.equal( chunk, 10000 );
		});

		it( `should return 10000 for 10000`, function () {
			var chunk = MathHelper.getChunkId( 10000 );
			assert.equal( chunk, 10000 );
		});

		it( `should return 130000 for 123456`, function () {
			var chunk = MathHelper.getChunkId( 123456 );
			assert.equal( chunk, 130000 );
		});
	});

});