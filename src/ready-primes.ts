import * as Promise from 'bluebird';
import { JsonHelper } from './helpers/JsonHelper';
import { MathHelper } from './helpers/MathHelper';

export class ReadyPrimes {

	static isPrime( n: number ): Promise<any> {
		let chunk: number = MathHelper.getChunkId( n );

		return new Promise(( resolve: Function, reject: Function ) => {
			JsonHelper.readIntegerFile( chunk ).then(( data: number[] ) => {
				resolve( data[ n ] === 1 );
			}).error(( err ) => {
				reject( false );
			});
		});
	}

}