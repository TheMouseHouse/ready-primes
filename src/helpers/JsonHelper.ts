/// <reference path="../../typings/jsonfile.d.ts" />

import * as jsonfile from 'jsonfile';
import * as fs from 'fs-extra';
import * as Promise from 'bluebird';
import * as _each from 'lodash/each';

export class JsonHelper {

	static INTEGER_EXT: string = '.int';
	static PRIME_EXT: string = '.prime';

	static read( filename: string | number ): Promise<any> {
		return new Promise(( resolve: Function, reject: Function ) => {
			jsonfile.readFile( `./data/${filename}`, {}, ( err: any, chunk: number[] ) => {
				if ( err ) {
					reject( err );
				} else {
					resolve( chunk );
				}

			});
		});
	}

	static write( filename: string | number, data: any ): Promise<any> {
		return new Promise(( resolve: Function, reject: Function ) => {
			jsonfile.writeFile( `./data/${filename}`, data, {}, ( err: any ) => {
				if ( err ) {
					console.log( err );
					reject( false );
				} else {
					resolve( true );
				}
			});
		});
	}

	static readIntegerFile( filename: string | number ): Promise<any> {
		return JsonHelper.read( filename + JsonHelper.INTEGER_EXT );
	}

	static readMultipleIntegerFiles( filenames: number[] | string[] ): Promise<any> {
		let promises: Promise<any>[] = [];
		_each( filenames, ( filename: number | string ) => {
			promises.push( JsonHelper.readIntegerFile( filename ) );
		});
		return Promise.all( promises );
	}

	static writeIntegerFile( filename: string | number, data: any ): Promise<any> {
		return JsonHelper.write( filename + JsonHelper.INTEGER_EXT, data );
	}

	static readPrimeFile( filename: string | number ): Promise<any> {
		return JsonHelper.read( filename + JsonHelper.PRIME_EXT );
	}

	static readMultiplePrimeFiles( filenames: number[] | string[] ): Promise<any> {
		let promises: Promise<any>[] = [];
		_each( filenames, ( filename: number | string ) => {
			promises.push( JsonHelper.readPrimeFile( filename ) );
		});
		return Promise.all( promises );
	}

	static writePrimeFile( filename: string | number, data: any ): Promise<any> {
		return JsonHelper.write( filename + JsonHelper.PRIME_EXT, data );
	}

	static writeReference( data: any ): void {
		const referencePath: string = './data/reference.js';
		const referenceData: string = 'exports.reference = ' + JSON.stringify( data );

		fs.outputFile( referencePath, referenceData );
	}

}