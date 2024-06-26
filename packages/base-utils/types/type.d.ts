export declare const isString: (val: unknown) => val is string;
export declare const isNumber: (val: unknown) => val is number;
export declare const isBigint: (val: unknown) => val is bigint;
export declare const isBoolean: (val: unknown) => val is boolean;
export declare const isFunction: (val: unknown) => val is (...args: unknown[]) => unknown;
export declare const isSymbol: (val: unknown) => val is symbol;
export declare const isUndefined: (val: unknown) => val is undefined;
export declare const isNull: (val: unknown) => val is null;
export declare const isValueType: (val: unknown) => val is string | number | bigint | boolean | symbol;
