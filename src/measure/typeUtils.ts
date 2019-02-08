/** Returns true if T represents a single string literal and not a union or `string`. */
export type IsSingleStringLiteral<T extends string> = string extends T
    ? false
    : IsSingleStringLiteralHelper<T> extends never ? true : false;

type IsSingleStringLiteralHelper<T, TCopy = T> = T extends string ? Exclude<TCopy, T> : never;
