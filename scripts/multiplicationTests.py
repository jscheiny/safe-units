from arithmetic import exponents

def emitImport():
    print 'import { MultiplyExponents } from "../multiplication";'
    print 'import { IsArithmeticError } from "./utils";'
    print

def emitAdditionTest(left, right):
    product = left * right
    if product in exponents:
        emitNonErrorMultiplicationTest(left, right)
    else:
        emitErrorMultiplicationTest(left, right)
    
def emitNonErrorMultiplicationTest(left, right):
    typeName = getTestTypeBaseName(left, right)
    print "type %s = MultiplyExponents<%d, %d>;" % (typeName, left, right)
    print "const %s: %s = %s;" % (typeName, typeName, left * right)
    print

def emitErrorMultiplicationTest(left, right):
    typeName = "%sIsError" % getTestTypeBaseName(left, right)
    print "type %s = IsArithmeticError<MultiplyExponents<%d, %d>>;" % (typeName, left, right)
    print "const %s: %s = true;" % (typeName, typeName)
    print

def getTestTypeBaseName(left, right):
    return "ProductOf%sAnd%s" % (getNumberTypeName(left), getNumberTypeName(right))

def getNumberTypeName(value):
    if value == 0:
        return "0"
    sign = "Positive" if value > 0 else "Negative"
    return "%s%d" % (sign, abs(value))

def main():
    emitImport()
    for left in exponents:
        for right in exponents:
            emitAdditionTest(left, right)

if __name__ == '__main__':
    main()