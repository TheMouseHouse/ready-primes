var assert = require( 'chai' ).assert;
var jsonHelper = require( '../../bin/helpers/JsonHelper' );

describe( 'Array', function () {
	describe( '#indexOf()', function () {
		it( 'should return -1 when the value is not present', function () {
			assert.equal( -1, [ 1, 2, 3 ].indexOf( 4 ) );
		});
	});
});