from arithmetic import exponents, tab

def emitImport():
    print 'import { Exponent, ArithmeticError } from "./common"'
    print

def emitNegationType():
    print "export type Negate<N extends Exponent> = MultiplyExponents<N, -1>;"
    print

def emitUncurriedMultiplicationType():
    print "export type MultiplyExponents<L extends Exponent, R extends Exponent>"
    first = True
    for left in exponents:
        prefix = "=" if first else ":"
        first = False
        if left == 0:
            print "%s%s L extends 0 ? 0" % (tab, prefix)
        elif left == 1:
            print "%s%s L extends 1 ? R" % (tab, prefix)
        else:
            print "%s%s L extends %d ? %s<R>" % (tab, prefix, left, getCurriedAdditionTypeName(left))
    emitErrorCase()

def emitCurriedMultiplicationType(left):
    print "type %s<N extends Exponent>" % getCurriedAdditionTypeName(left)
    first = True
    for right in exponents:
        product = left * right
        if product in exponents:
            prefix = "=" if first else ":"
            print "%s%s N extends %d ? %d" % (tab, prefix, right, product)
            first = False
    emitErrorCase()

def emitErrorCase():
    print "%s: ArithmeticError;" % tab
    print

def getCurriedAdditionTypeName(left):
    sign = "Negative" if left < 0 else "Positive"
    return "MultiplyBy%s%d" % (sign, abs(left))

def main():
    emitImport()
    emitNegationType()
    emitUncurriedMultiplicationType()
    for exp in exponents:
        if exp == 0 or exp == 1:
            continue
        emitCurriedMultiplicationType(exp)

if __name__ == '__main__':
    main()