global.chai = require( 'chai' );
global.assert = chai.assert;
global.expect = chai.expect;
chai.should();
chai.config.includeStack = true;

process.env.NODE_ENV = 'test';

global.fs = require( 'fs' );
global._ = require( 'lodash' );
global.assert = require( 'chai' ).assert;

global.ReadyPrimes = require( '../bin/ready-primes' ).ReadyPrimes;
global.MathHelper = require( '../bin/helpers/MathHelper' ).MathHelper;
global.JsonHelper = require( '../bin/helpers/JsonHelper' ).JsonHelper;

global.testFile = 'test';
global.jsonTestFile = testFile + '.json';
global.testData = { "value": "passed" };
global.primeTestData = [ 2, 3, 5, 7 ];
global.integerTestData = [ 0, 0, 1, 1 ];
global.lastTestPrime = _.last( primeTestData );
global.lastTestInteger = _.last( integerTestData );

global.cleanUpFile = function ( filename ) {
    try {
        fs.unlink( './data/' + filename );
        console.info( 'Removed', filename );
    } catch ( err ) {
        console.warn( err );
    }
}