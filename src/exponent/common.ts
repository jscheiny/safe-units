export type ArithmeticError = "UnitError" & "Arithmetic out of bounds";
export const ArithmeticError = "Arithmetic out of bounds";

export type IsArithmeticError<T> = T extends ArithmeticError ? true : false;

export type IsSame<A, B> = IsSameImpl<{ t: A }, { t: B }>;
type IsSameImpl<A, B> = A extends B ? (B extends A ? true : never) : never;
