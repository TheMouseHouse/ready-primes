describe( 'JsonHelper', function () {

    describe( 'Static', function () {
        it( `INTEGER_EXT should return .int`, function () {
            assert.equal( JsonHelper.INTEGER_EXT, '.int' );
        });

        it( `PRIME_EXT should return .prime`, function () {
            assert.equal( JsonHelper.PRIME_EXT, '.prime' );
        });
    });

    describe( 'Write', function () {

        describe( '#write()', function () {
            it( `should write file named ${jsonTestFile} and return resolved Promise<true>`, function () {
                return JsonHelper.write( jsonTestFile, testData )
                    .then(( success ) => {
                        assert.isTrue( success );
                    });
            });
        });

        describe( '#writePrimeFile()', function () {
            it( `should write ${testFile}.prime and return resolved Promise<true>`, function () {
                return JsonHelper.writePrimeFile( 'test', primeTestData )
                    .then(( success ) => {
                        assert.isTrue( success );
                    });
            });
        });

        describe( '#writeIntegerFile()', function () {
            it( `should write ${testFile}.int and return resolved Promise<true>`, function () {
                return JsonHelper.writeIntegerFile( 'test', integerTestData )
                    .then(( success ) => {
                        assert.isTrue( success );
                    });
            });
        });

    });

    describe( 'Read', function () {

        describe( '#read()', function () {
            var returnedData = [];

            it( `should read file named ${jsonTestFile} and return resolved Promise<any>`, function () {
                return JsonHelper.read( jsonTestFile )
                    .then(( data ) => {
                        returnedData = data;
                        assert.deepEqual( data, testData );
                    });
            });

            it( `returned data should be an Object`, function () {
                assert.isObject( returnedData );
            });

            it( `returned data should be ${JSON.stringify( testData )}`, function () {
                assert.property( returnedData, 'value' );
                assert.propertyVal( returnedData, 'value', 'passed' );
                assert.deepEqual( returnedData, testData );
            });
        });

        describe( '#readPrimeFile()', function () {
            var returnedData = [];

            it( `should read ${testFile}.prime and return resolved Promise<number[]>`, function () {
                return JsonHelper.readPrimeFile( 'test' )
                    .then(( data ) => {
                        returnedData = data;
                        assert.isArray( data );
                        assert.deepEqual( data, primeTestData );
                    });
            });

            var primeDataLength = primeTestData.length;
            it( `returned data should have length ${primeDataLength}`, function () {
                assert.equal( returnedData.length, primeDataLength );
            });

            var firstTestPrime = _.first( primeTestData );
            it( `returned data should have ${firstTestPrime} as first value`, function () {
                assert.isNumber( _.first( returnedData ) );
                assert.equal( _.first( returnedData ), firstTestPrime );
            });

            it( `returned data should have ${lastTestPrime} as last value`, function () {
                assert.isNumber( _.last( returnedData ) );
                assert.equal( _.last( returnedData ), lastTestPrime );
            });
        });

        describe( '#readIntegerFile()', function () {
            var returnedData = [];

            it( `should read ${testFile}.int and return resolved Promise<number[]>`, function () {
                return JsonHelper.readIntegerFile( 'test' )
                    .then(( data ) => {
                        returnedData = data;
                        assert.isArray( data );
                        assert.deepEqual( data, integerTestData );
                    });
            });

            var testDataLength = integerTestData.length;
            it( `returned data should have length ${testDataLength}`, function () {
                assert.equal( returnedData.length, testDataLength );
            });

            var firstTestInteger = _.first( integerTestData );
            it( `returned data should have ${firstTestInteger} as first value`, function () {
                assert.isNumber( _.first( returnedData ) );
                assert.equal( _.first( returnedData ), firstTestInteger );
            });

            it( `returned data should have ${lastTestInteger} as last value`, function () {
                assert.isNumber( _.last( returnedData ) );
                assert.equal( _.last( returnedData ), lastTestInteger );
            });
        });

    });

    after( function () {
        cleanUpFile( jsonTestFile );
        cleanUpFile( testFile + JsonHelper.INTEGER_EXT );
        cleanUpFile( testFile + JsonHelper.PRIME_EXT );
    });

});