from arithmetic import exponents, tab

def emitImport():
    print "// tslint:disable\n"
    print 'import { Exponent, ArithmeticError } from "./common";'
    print 'import { MultiplyByNegative1 } from "./multiplication";'
    print

def emitUncurriedDivisionType():
    print "export type DivideExponents<L extends Exponent, R extends Exponent>"
    first = True
    for right in exponents:
        prefix = "=" if first else ":"
        first = False
        if right == 0:
            print "%s%s R extends 0 ? ArithmeticError" % (tab, prefix)
        elif right == 1:
            print "%s%s R extends 1 ? L" % (tab, prefix)
        elif right == -1:
            print "%s%s R extends -1 ? MultiplyByNegative1<L>" % (tab, prefix)
        else:
            print "%s%s R extends %d ? %s<L>" % (tab, prefix, right, getCurriedDivisionTypeName(right))
    emitErrorCase()

def emitCurriedDivisionType(left):
    print "export type %s<N extends Exponent>" % getCurriedDivisionTypeName(left)
    first = True
    for right in exponents:
        if left == 0:
            continue
        product = float(right) / left
        if product in exponents:
            prefix = "=" if first else ":"
            print "%s%s N extends %d ? %d" % (tab, prefix, right, product)
            first = False
    emitErrorCase()

def emitErrorCase():
    print "%s: ArithmeticError;" % tab
    print

def getCurriedDivisionTypeName(left):
    sign = "Negative" if left < 0 else "Positive"
    return "DivideBy%s%d" % (sign, abs(left))

def main():
    emitImport()
    emitUncurriedDivisionType()
    for exp in exponents:
        if exp == 0 or exp == 1 or exp == -1:
            continue
        emitCurriedDivisionType(exp)

if __name__ == '__main__':
    main()