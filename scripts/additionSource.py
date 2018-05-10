from arithmetic import exponents, tab

def emitImport():
    print 'import { Exponent, ArithmeticError } from "./common"'
    print

def emitUncurriedAdditionType():
    print "export type AddExponents<L extends Exponent, R extends Exponent>"
    first = True
    for left in exponents:
        prefix = "=" if first else ":"
        first = False
        if left == 0:
            print "%s%s L extends 0 ? R" % (tab, prefix)
        else:
            print "%s%s L extends %d ? %s<R>" % (tab, prefix, left, getCurriedAdditionTypeName(left))
    emitErrorCase()

def emitCurriedAdditionType(left):
    print "type %s<N extends Exponent>" % getCurriedAdditionTypeName(left)
    first = True
    for right in exponents:
        total = left + right
        if total in exponents:
            prefix = "=" if first else ":"
            print "%s%s N extends %d ? %d" % (tab, prefix, right, total)
            first = False
    emitErrorCase()

def emitErrorCase():
    print "%s: ArithmeticError;" % tab
    print

def getCurriedAdditionTypeName(left):
    operation = "Subtract" if left < 0 else "Add"
    return "%s%d" % (operation, abs(left))

def main():
    emitImport()
    emitUncurriedAdditionType()
    for exp in exponents:
        if exp == 0:
            continue
        emitCurriedAdditionType(exp)

if __name__ == '__main__':
    main()