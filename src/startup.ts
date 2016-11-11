import * as _ from 'lodash';

export class Startup {

	static PREFIX: string[] = [ 'my', 'our', 'the', 'all', 'in', 'on', 'un' ];
	static SUFFIX: string[] = [ 'ly', 'sy', 'er', 'it', 'ie', 'io', 'am', 'ia', 'ora', 'ero', 'ist', 'ism', 'ium', 'ble', 'ify', 'ous', 'ing', 'oid', 'ine', 'ted', 'ed' ];

	static REPLACE: { [ key: string ]: string } = {
		oo: 'u',
		ee: 'i',
		i: 'y',
		le: 'l',
		z: 'x',
		ck: 'k',
		ph: 'f',
		c: 'k'
	};

	static go( keyword: string ): void {
		let results: string[] = [];

		_.each( Startup.PREFIX, ( prefix: string ) => {
			results.push( prefix + keyword );
		});

		_.each( Startup.SUFFIX, ( suffix: string ) => {
			results.push( keyword + suffix );
		});

		_.each( _.keys( Startup.REPLACE ), ( key: any ) => {
			if ( keyword.indexOf( key ) > -1 ) {
				results.push( keyword.split( key ).join( Startup.REPLACE[ key ] ) );
			}
		});

		let sample: string = keyword;
		_.each( _.keys( Startup.REPLACE ), ( key: any ) => {
			if ( sample.indexOf( key ) > -1 ) {
				sample = sample.split( key ).join( Startup.REPLACE[ key ] );
			}
		});
		results.push( sample );

		console.log( JSON.stringify( results ) );
		console.log( '' );
	}

}

let args: string[] = process.argv;
args.shift();
args.shift();

_.each( args, Startup.go );