export declare type IntegersCollection = number[];
export declare type PrimeCollection = number[];
export declare type Collections = {
    primes: PrimeCollection;
    integers: IntegersCollection;
};
export declare type ReferenceObj = {
    first: number;
    last: number;
};
export declare type ReferenceCategory = {
    [chunk: number]: ReferenceObj;
};
export declare type ReferenceMetric = {
    prime: number;
    integer: number;
};
export declare type Reference = {
    integers: ReferenceCategory;
    primes: ReferenceCategory;
    last: ReferenceMetric;
    length: ReferenceMetric;
    chunkSize: number;
};
