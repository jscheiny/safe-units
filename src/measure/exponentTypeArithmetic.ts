export type Negative<N> = N extends number
    ? `${N}` extends `-${infer Pos extends number}`
        ? Pos
        : `-${N}` extends `${infer Neg extends number}`
          ? Neg
          : 0
    : never;

export type AddIntegers<
    Left extends number,
    Right extends number,
> = `${Left}` extends `-${infer LeftAbs extends number}`
    ? `${Right}` extends `-${infer RightAbs extends number}`
        ? Negative<AddPositiveIntegers<LeftAbs, RightAbs>>
        : Negative<SubtractPositiveIntegers<LeftAbs, Right>>
    : `${Right}` extends `-${infer RightAbs extends number}`
      ? SubtractPositiveIntegers<Left, RightAbs>
      : AddPositiveIntegers<Left, Right>;

type AddPositiveIntegers<Left extends number, Right extends number> = CoerceNumber<
    [...TupleOfSize<Left>, ...TupleOfSize<Right>]["length"]
>;

export type SubtractIntegers<Left extends number, Right extends number> = AddIntegers<Left, Negative<Right>>;

type SubtractPositiveIntegers<Left extends number, Right extends number> =
    TupleOfSize<Left> extends [...infer Diff, ...TupleOfSize<Right>]
        ? Diff["length"]
        : TupleOfSize<Right> extends [...infer Diff, ...TupleOfSize<Left>]
          ? Negative<Diff["length"]>
          : 0;

type CoerceNumber<N> = N extends number ? N : 0;

type TupleOfSize<N, BuiltTuple extends Array<1> = []> = BuiltTuple["length"] extends N
    ? BuiltTuple
    : TupleOfSize<N, [...BuiltTuple, 1]>;
