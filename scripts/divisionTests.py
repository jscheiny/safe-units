from arithmetic import exponents

def emitImport():
    print "// tslint:disable\n"
    print 'import { DivideExponents } from "../Division";'
    print 'import { IsArithmeticError } from "../utils";'
    print

def emitDivisionTest(left, right):
    if right == 0:
        emitErrorDivisionTest(left, right)
    else:
        quotient = float(left) / right
        if quotient in exponents:
            emitNonErrorDivisionTest(left, right)
        else:
            emitErrorDivisionTest(left, right)
    
def emitNonErrorDivisionTest(left, right):
    typeName = getTestTypeBaseName(left, right)
    print "type %s = DivideExponents<%d, %d>;" % (typeName, left, right)
    print "const %s: %s = %s;" % (typeName, typeName, left / right)
    print

def emitErrorDivisionTest(left, right):
    typeName = "%sIsError" % getTestTypeBaseName(left, right)
    print "type %s = IsArithmeticError<DivideExponents<%d, %d>>;" % (typeName, left, right)
    print "const %s: %s = true;" % (typeName, typeName)
    print

def getTestTypeBaseName(left, right):
    return "QuotientOf%sAnd%s" % (getNumberTypeName(left), getNumberTypeName(right))

def getNumberTypeName(value):
    if value == 0:
        return "0"
    sign = "Positive" if value > 0 else "Negative"
    return "%s%d" % (sign, abs(value))

def main():
    emitImport()
    for left in exponents:
        for right in exponents:
            emitDivisionTest(left, right)

if __name__ == '__main__':
    main()