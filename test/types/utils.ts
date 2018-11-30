export type IsSame<A, B> = IsSameImpl<{ t: A }, { t: B }>;
type IsSameImpl<A, B> = A extends B ? (B extends A ? true : false) : false;
