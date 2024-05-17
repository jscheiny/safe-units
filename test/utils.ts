export type Expect<T extends true> = T;
export type ExpectFalse<T extends false> = T;
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
export type Equivalent<X, Y> = [X] extends [Y] ? ([Y] extends [X] ? true : false) : false;

export function value<T>(_value: T): { hasType: <U>() => Equal<T, U> } {
    return { hasType: <_U>() => true as any };
}

export function expectTrue(_value: true) {}
