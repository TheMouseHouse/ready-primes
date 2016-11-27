import { Reference } from './../generate';
export declare class MathHelper {
    static readonly REF: Reference;
    static getPrimeChunk(n: number): number;
    static getIntegerChunk(n: number): number;
    static getPrimeChunks(n: number): number[];
    static getIntegerChunks(n: number): number[];
    private static mapChunks(max);
}
