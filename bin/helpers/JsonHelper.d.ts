/// <reference path="../../typings/jsonfile.d.ts" />
/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare class JsonHelper {
    static INTEGER_EXT: string;
    static PRIME_EXT: string;
    static read(filename: string | number): Promise<any>;
    static write(filename: string | number, data: any): Promise<any>;
    static readIntegerFile(filename: string | number): Promise<any>;
    static readMultipleIntegerFiles(filenames: number[] | string[]): Promise<any>;
    static writeIntegerFile(filename: string | number, data: any): Promise<any>;
    static readPrimeFile(filename: string | number): Promise<any>;
    static readMultiplePrimeFiles(filenames: number[] | string[]): Promise<any>;
    static writePrimeFile(filename: string | number, data: any): Promise<any>;
    static writeReference(data: any): void;
}
