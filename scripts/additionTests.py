from arithmetic import exponents

def emitImport():
    print 'import { AddExponents } from "../addition";'
    print 'import { IsArithmeticError } from "./utils";'
    print

def emitAdditionTest(left, right):
    total = left + right
    if total in exponents:
        emitNonErrorAdditionTest(left, right)
    else:
        emitErrorAdditionTest(left, right)
    
def emitNonErrorAdditionTest(left, right):
    typeName = getTestTypeBaseName(left, right)
    print "type %s = AddExponents<%d, %d>;" % (typeName, left, right)
    print "const %s: %s = %s;" % (typeName, typeName, left + right)
    print

def emitErrorAdditionTest(left, right):
    typeName = "%sIsError" % getTestTypeBaseName(left, right)
    print "type %s = IsArithmeticError<AddExponents<%d, %d>>;" % (typeName, left, right)
    print "const %s: %s = true;" % (typeName, typeName)
    print

def getTestTypeBaseName(left, right):
    return "SumOf%sAnd%s" % (getNumberTypeName(left), getNumberTypeName(right))

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