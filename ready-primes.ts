import * as jsonfile_p from 'jsonfile-promised';
import * as Promise from 'bluebird';

export interface IReadyPrimes {
	getCollection( size: number ): number[]
}

export default class ReadyPrimes implements IReadyPrimes {

	getCollection( size: number ): number[] {
		return [ size ];
	}

	static readIntegers( limit: number ): Promise<number[]> {
		return jsonfile_p.readFile( './data/' + limit + '.int' );
	}
}

ReadyPrimes.readIntegers( 10000 ).then( ( response )=> {
	console.log( response )
} );