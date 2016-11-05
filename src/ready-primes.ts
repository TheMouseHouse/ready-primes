import * as Promise from 'bluebird';
import { JsonHelper } from './helpers/JsonHelper';

export interface IReadyPrimes {
	getCollection( size: number ): number[];
}

export default class ReadyPrimes implements IReadyPrimes {
	// private static CHUNK_SIZE: number = 1e4;

	getCollection( size: number ): number[] {
		return [ size ];
	}

	static readIntegers( limit: number ): Promise<any> {
		return JsonHelper.read( limit.toString() );
	}
}

ReadyPrimes.readIntegers( 10000 ).then(( response ) => {
	console.log( response );
});