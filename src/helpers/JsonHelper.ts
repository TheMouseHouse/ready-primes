/// <reference path="../../typings/jsonfile.d.ts" />

import * as jsonfile from 'jsonfile';
import * as Promise from 'bluebird';

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

	static writeIntegerFile( filename: string | number, data: any ): Promise<any> {
		return JsonHelper.write( filename + JsonHelper.INTEGER_EXT, data );
	}

	static readPrimeFile( filename: string | number ): Promise<any> {
		return JsonHelper.read( filename + JsonHelper.PRIME_EXT );
	}

	static writePrimeFile( filename: string | number, data: any ): Promise<any> {
		return JsonHelper.write( filename + JsonHelper.PRIME_EXT, data );
	}

}