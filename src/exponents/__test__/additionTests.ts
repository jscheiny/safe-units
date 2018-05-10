import { AddExponents } from "../addition";
import { IsArithmeticError } from "./utils";

type SumOfNegative5AndNegative5IsError = IsArithmeticError<AddExponents<-5, -5>>;
const SumOfNegative5AndNegative5IsError: SumOfNegative5AndNegative5IsError = true;

type SumOfNegative5AndNegative4IsError = IsArithmeticError<AddExponents<-5, -4>>;
const SumOfNegative5AndNegative4IsError: SumOfNegative5AndNegative4IsError = true;

type SumOfNegative5AndNegative3IsError = IsArithmeticError<AddExponents<-5, -3>>;
const SumOfNegative5AndNegative3IsError: SumOfNegative5AndNegative3IsError = true;

type SumOfNegative5AndNegative2IsError = IsArithmeticError<AddExponents<-5, -2>>;
const SumOfNegative5AndNegative2IsError: SumOfNegative5AndNegative2IsError = true;

type SumOfNegative5AndNegative1IsError = IsArithmeticError<AddExponents<-5, -1>>;
const SumOfNegative5AndNegative1IsError: SumOfNegative5AndNegative1IsError = true;

type SumOfNegative5And0 = AddExponents<-5, 0>;
const SumOfNegative5And0: SumOfNegative5And0 = -5;

type SumOfNegative5AndPositive1 = AddExponents<-5, 1>;
const SumOfNegative5AndPositive1: SumOfNegative5AndPositive1 = -4;

type SumOfNegative5AndPositive2 = AddExponents<-5, 2>;
const SumOfNegative5AndPositive2: SumOfNegative5AndPositive2 = -3;

type SumOfNegative5AndPositive3 = AddExponents<-5, 3>;
const SumOfNegative5AndPositive3: SumOfNegative5AndPositive3 = -2;

type SumOfNegative5AndPositive4 = AddExponents<-5, 4>;
const SumOfNegative5AndPositive4: SumOfNegative5AndPositive4 = -1;

type SumOfNegative5AndPositive5 = AddExponents<-5, 5>;
const SumOfNegative5AndPositive5: SumOfNegative5AndPositive5 = 0;

type SumOfNegative4AndNegative5IsError = IsArithmeticError<AddExponents<-4, -5>>;
const SumOfNegative4AndNegative5IsError: SumOfNegative4AndNegative5IsError = true;

type SumOfNegative4AndNegative4IsError = IsArithmeticError<AddExponents<-4, -4>>;
const SumOfNegative4AndNegative4IsError: SumOfNegative4AndNegative4IsError = true;

type SumOfNegative4AndNegative3IsError = IsArithmeticError<AddExponents<-4, -3>>;
const SumOfNegative4AndNegative3IsError: SumOfNegative4AndNegative3IsError = true;

type SumOfNegative4AndNegative2IsError = IsArithmeticError<AddExponents<-4, -2>>;
const SumOfNegative4AndNegative2IsError: SumOfNegative4AndNegative2IsError = true;

type SumOfNegative4AndNegative1 = AddExponents<-4, -1>;
const SumOfNegative4AndNegative1: SumOfNegative4AndNegative1 = -5;

type SumOfNegative4And0 = AddExponents<-4, 0>;
const SumOfNegative4And0: SumOfNegative4And0 = -4;

type SumOfNegative4AndPositive1 = AddExponents<-4, 1>;
const SumOfNegative4AndPositive1: SumOfNegative4AndPositive1 = -3;

type SumOfNegative4AndPositive2 = AddExponents<-4, 2>;
const SumOfNegative4AndPositive2: SumOfNegative4AndPositive2 = -2;

type SumOfNegative4AndPositive3 = AddExponents<-4, 3>;
const SumOfNegative4AndPositive3: SumOfNegative4AndPositive3 = -1;

type SumOfNegative4AndPositive4 = AddExponents<-4, 4>;
const SumOfNegative4AndPositive4: SumOfNegative4AndPositive4 = 0;

type SumOfNegative4AndPositive5 = AddExponents<-4, 5>;
const SumOfNegative4AndPositive5: SumOfNegative4AndPositive5 = 1;

type SumOfNegative3AndNegative5IsError = IsArithmeticError<AddExponents<-3, -5>>;
const SumOfNegative3AndNegative5IsError: SumOfNegative3AndNegative5IsError = true;

type SumOfNegative3AndNegative4IsError = IsArithmeticError<AddExponents<-3, -4>>;
const SumOfNegative3AndNegative4IsError: SumOfNegative3AndNegative4IsError = true;

type SumOfNegative3AndNegative3IsError = IsArithmeticError<AddExponents<-3, -3>>;
const SumOfNegative3AndNegative3IsError: SumOfNegative3AndNegative3IsError = true;

type SumOfNegative3AndNegative2 = AddExponents<-3, -2>;
const SumOfNegative3AndNegative2: SumOfNegative3AndNegative2 = -5;

type SumOfNegative3AndNegative1 = AddExponents<-3, -1>;
const SumOfNegative3AndNegative1: SumOfNegative3AndNegative1 = -4;

type SumOfNegative3And0 = AddExponents<-3, 0>;
const SumOfNegative3And0: SumOfNegative3And0 = -3;

type SumOfNegative3AndPositive1 = AddExponents<-3, 1>;
const SumOfNegative3AndPositive1: SumOfNegative3AndPositive1 = -2;

type SumOfNegative3AndPositive2 = AddExponents<-3, 2>;
const SumOfNegative3AndPositive2: SumOfNegative3AndPositive2 = -1;

type SumOfNegative3AndPositive3 = AddExponents<-3, 3>;
const SumOfNegative3AndPositive3: SumOfNegative3AndPositive3 = 0;

type SumOfNegative3AndPositive4 = AddExponents<-3, 4>;
const SumOfNegative3AndPositive4: SumOfNegative3AndPositive4 = 1;

type SumOfNegative3AndPositive5 = AddExponents<-3, 5>;
const SumOfNegative3AndPositive5: SumOfNegative3AndPositive5 = 2;

type SumOfNegative2AndNegative5IsError = IsArithmeticError<AddExponents<-2, -5>>;
const SumOfNegative2AndNegative5IsError: SumOfNegative2AndNegative5IsError = true;

type SumOfNegative2AndNegative4IsError = IsArithmeticError<AddExponents<-2, -4>>;
const SumOfNegative2AndNegative4IsError: SumOfNegative2AndNegative4IsError = true;

type SumOfNegative2AndNegative3 = AddExponents<-2, -3>;
const SumOfNegative2AndNegative3: SumOfNegative2AndNegative3 = -5;

type SumOfNegative2AndNegative2 = AddExponents<-2, -2>;
const SumOfNegative2AndNegative2: SumOfNegative2AndNegative2 = -4;

type SumOfNegative2AndNegative1 = AddExponents<-2, -1>;
const SumOfNegative2AndNegative1: SumOfNegative2AndNegative1 = -3;

type SumOfNegative2And0 = AddExponents<-2, 0>;
const SumOfNegative2And0: SumOfNegative2And0 = -2;

type SumOfNegative2AndPositive1 = AddExponents<-2, 1>;
const SumOfNegative2AndPositive1: SumOfNegative2AndPositive1 = -1;

type SumOfNegative2AndPositive2 = AddExponents<-2, 2>;
const SumOfNegative2AndPositive2: SumOfNegative2AndPositive2 = 0;

type SumOfNegative2AndPositive3 = AddExponents<-2, 3>;
const SumOfNegative2AndPositive3: SumOfNegative2AndPositive3 = 1;

type SumOfNegative2AndPositive4 = AddExponents<-2, 4>;
const SumOfNegative2AndPositive4: SumOfNegative2AndPositive4 = 2;

type SumOfNegative2AndPositive5 = AddExponents<-2, 5>;
const SumOfNegative2AndPositive5: SumOfNegative2AndPositive5 = 3;

type SumOfNegative1AndNegative5IsError = IsArithmeticError<AddExponents<-1, -5>>;
const SumOfNegative1AndNegative5IsError: SumOfNegative1AndNegative5IsError = true;

type SumOfNegative1AndNegative4 = AddExponents<-1, -4>;
const SumOfNegative1AndNegative4: SumOfNegative1AndNegative4 = -5;

type SumOfNegative1AndNegative3 = AddExponents<-1, -3>;
const SumOfNegative1AndNegative3: SumOfNegative1AndNegative3 = -4;

type SumOfNegative1AndNegative2 = AddExponents<-1, -2>;
const SumOfNegative1AndNegative2: SumOfNegative1AndNegative2 = -3;

type SumOfNegative1AndNegative1 = AddExponents<-1, -1>;
const SumOfNegative1AndNegative1: SumOfNegative1AndNegative1 = -2;

type SumOfNegative1And0 = AddExponents<-1, 0>;
const SumOfNegative1And0: SumOfNegative1And0 = -1;

type SumOfNegative1AndPositive1 = AddExponents<-1, 1>;
const SumOfNegative1AndPositive1: SumOfNegative1AndPositive1 = 0;

type SumOfNegative1AndPositive2 = AddExponents<-1, 2>;
const SumOfNegative1AndPositive2: SumOfNegative1AndPositive2 = 1;

type SumOfNegative1AndPositive3 = AddExponents<-1, 3>;
const SumOfNegative1AndPositive3: SumOfNegative1AndPositive3 = 2;

type SumOfNegative1AndPositive4 = AddExponents<-1, 4>;
const SumOfNegative1AndPositive4: SumOfNegative1AndPositive4 = 3;

type SumOfNegative1AndPositive5 = AddExponents<-1, 5>;
const SumOfNegative1AndPositive5: SumOfNegative1AndPositive5 = 4;

type SumOf0AndNegative5 = AddExponents<0, -5>;
const SumOf0AndNegative5: SumOf0AndNegative5 = -5;

type SumOf0AndNegative4 = AddExponents<0, -4>;
const SumOf0AndNegative4: SumOf0AndNegative4 = -4;

type SumOf0AndNegative3 = AddExponents<0, -3>;
const SumOf0AndNegative3: SumOf0AndNegative3 = -3;

type SumOf0AndNegative2 = AddExponents<0, -2>;
const SumOf0AndNegative2: SumOf0AndNegative2 = -2;

type SumOf0AndNegative1 = AddExponents<0, -1>;
const SumOf0AndNegative1: SumOf0AndNegative1 = -1;

type SumOf0And0 = AddExponents<0, 0>;
const SumOf0And0: SumOf0And0 = 0;

type SumOf0AndPositive1 = AddExponents<0, 1>;
const SumOf0AndPositive1: SumOf0AndPositive1 = 1;

type SumOf0AndPositive2 = AddExponents<0, 2>;
const SumOf0AndPositive2: SumOf0AndPositive2 = 2;

type SumOf0AndPositive3 = AddExponents<0, 3>;
const SumOf0AndPositive3: SumOf0AndPositive3 = 3;

type SumOf0AndPositive4 = AddExponents<0, 4>;
const SumOf0AndPositive4: SumOf0AndPositive4 = 4;

type SumOf0AndPositive5 = AddExponents<0, 5>;
const SumOf0AndPositive5: SumOf0AndPositive5 = 5;

type SumOfPositive1AndNegative5 = AddExponents<1, -5>;
const SumOfPositive1AndNegative5: SumOfPositive1AndNegative5 = -4;

type SumOfPositive1AndNegative4 = AddExponents<1, -4>;
const SumOfPositive1AndNegative4: SumOfPositive1AndNegative4 = -3;

type SumOfPositive1AndNegative3 = AddExponents<1, -3>;
const SumOfPositive1AndNegative3: SumOfPositive1AndNegative3 = -2;

type SumOfPositive1AndNegative2 = AddExponents<1, -2>;
const SumOfPositive1AndNegative2: SumOfPositive1AndNegative2 = -1;

type SumOfPositive1AndNegative1 = AddExponents<1, -1>;
const SumOfPositive1AndNegative1: SumOfPositive1AndNegative1 = 0;

type SumOfPositive1And0 = AddExponents<1, 0>;
const SumOfPositive1And0: SumOfPositive1And0 = 1;

type SumOfPositive1AndPositive1 = AddExponents<1, 1>;
const SumOfPositive1AndPositive1: SumOfPositive1AndPositive1 = 2;

type SumOfPositive1AndPositive2 = AddExponents<1, 2>;
const SumOfPositive1AndPositive2: SumOfPositive1AndPositive2 = 3;

type SumOfPositive1AndPositive3 = AddExponents<1, 3>;
const SumOfPositive1AndPositive3: SumOfPositive1AndPositive3 = 4;

type SumOfPositive1AndPositive4 = AddExponents<1, 4>;
const SumOfPositive1AndPositive4: SumOfPositive1AndPositive4 = 5;

type SumOfPositive1AndPositive5IsError = IsArithmeticError<AddExponents<1, 5>>;
const SumOfPositive1AndPositive5IsError: SumOfPositive1AndPositive5IsError = true;

type SumOfPositive2AndNegative5 = AddExponents<2, -5>;
const SumOfPositive2AndNegative5: SumOfPositive2AndNegative5 = -3;

type SumOfPositive2AndNegative4 = AddExponents<2, -4>;
const SumOfPositive2AndNegative4: SumOfPositive2AndNegative4 = -2;

type SumOfPositive2AndNegative3 = AddExponents<2, -3>;
const SumOfPositive2AndNegative3: SumOfPositive2AndNegative3 = -1;

type SumOfPositive2AndNegative2 = AddExponents<2, -2>;
const SumOfPositive2AndNegative2: SumOfPositive2AndNegative2 = 0;

type SumOfPositive2AndNegative1 = AddExponents<2, -1>;
const SumOfPositive2AndNegative1: SumOfPositive2AndNegative1 = 1;

type SumOfPositive2And0 = AddExponents<2, 0>;
const SumOfPositive2And0: SumOfPositive2And0 = 2;

type SumOfPositive2AndPositive1 = AddExponents<2, 1>;
const SumOfPositive2AndPositive1: SumOfPositive2AndPositive1 = 3;

type SumOfPositive2AndPositive2 = AddExponents<2, 2>;
const SumOfPositive2AndPositive2: SumOfPositive2AndPositive2 = 4;

type SumOfPositive2AndPositive3 = AddExponents<2, 3>;
const SumOfPositive2AndPositive3: SumOfPositive2AndPositive3 = 5;

type SumOfPositive2AndPositive4IsError = IsArithmeticError<AddExponents<2, 4>>;
const SumOfPositive2AndPositive4IsError: SumOfPositive2AndPositive4IsError = true;

type SumOfPositive2AndPositive5IsError = IsArithmeticError<AddExponents<2, 5>>;
const SumOfPositive2AndPositive5IsError: SumOfPositive2AndPositive5IsError = true;

type SumOfPositive3AndNegative5 = AddExponents<3, -5>;
const SumOfPositive3AndNegative5: SumOfPositive3AndNegative5 = -2;

type SumOfPositive3AndNegative4 = AddExponents<3, -4>;
const SumOfPositive3AndNegative4: SumOfPositive3AndNegative4 = -1;

type SumOfPositive3AndNegative3 = AddExponents<3, -3>;
const SumOfPositive3AndNegative3: SumOfPositive3AndNegative3 = 0;

type SumOfPositive3AndNegative2 = AddExponents<3, -2>;
const SumOfPositive3AndNegative2: SumOfPositive3AndNegative2 = 1;

type SumOfPositive3AndNegative1 = AddExponents<3, -1>;
const SumOfPositive3AndNegative1: SumOfPositive3AndNegative1 = 2;

type SumOfPositive3And0 = AddExponents<3, 0>;
const SumOfPositive3And0: SumOfPositive3And0 = 3;

type SumOfPositive3AndPositive1 = AddExponents<3, 1>;
const SumOfPositive3AndPositive1: SumOfPositive3AndPositive1 = 4;

type SumOfPositive3AndPositive2 = AddExponents<3, 2>;
const SumOfPositive3AndPositive2: SumOfPositive3AndPositive2 = 5;

type SumOfPositive3AndPositive3IsError = IsArithmeticError<AddExponents<3, 3>>;
const SumOfPositive3AndPositive3IsError: SumOfPositive3AndPositive3IsError = true;

type SumOfPositive3AndPositive4IsError = IsArithmeticError<AddExponents<3, 4>>;
const SumOfPositive3AndPositive4IsError: SumOfPositive3AndPositive4IsError = true;

type SumOfPositive3AndPositive5IsError = IsArithmeticError<AddExponents<3, 5>>;
const SumOfPositive3AndPositive5IsError: SumOfPositive3AndPositive5IsError = true;

type SumOfPositive4AndNegative5 = AddExponents<4, -5>;
const SumOfPositive4AndNegative5: SumOfPositive4AndNegative5 = -1;

type SumOfPositive4AndNegative4 = AddExponents<4, -4>;
const SumOfPositive4AndNegative4: SumOfPositive4AndNegative4 = 0;

type SumOfPositive4AndNegative3 = AddExponents<4, -3>;
const SumOfPositive4AndNegative3: SumOfPositive4AndNegative3 = 1;

type SumOfPositive4AndNegative2 = AddExponents<4, -2>;
const SumOfPositive4AndNegative2: SumOfPositive4AndNegative2 = 2;

type SumOfPositive4AndNegative1 = AddExponents<4, -1>;
const SumOfPositive4AndNegative1: SumOfPositive4AndNegative1 = 3;

type SumOfPositive4And0 = AddExponents<4, 0>;
const SumOfPositive4And0: SumOfPositive4And0 = 4;

type SumOfPositive4AndPositive1 = AddExponents<4, 1>;
const SumOfPositive4AndPositive1: SumOfPositive4AndPositive1 = 5;

type SumOfPositive4AndPositive2IsError = IsArithmeticError<AddExponents<4, 2>>;
const SumOfPositive4AndPositive2IsError: SumOfPositive4AndPositive2IsError = true;

type SumOfPositive4AndPositive3IsError = IsArithmeticError<AddExponents<4, 3>>;
const SumOfPositive4AndPositive3IsError: SumOfPositive4AndPositive3IsError = true;

type SumOfPositive4AndPositive4IsError = IsArithmeticError<AddExponents<4, 4>>;
const SumOfPositive4AndPositive4IsError: SumOfPositive4AndPositive4IsError = true;

type SumOfPositive4AndPositive5IsError = IsArithmeticError<AddExponents<4, 5>>;
const SumOfPositive4AndPositive5IsError: SumOfPositive4AndPositive5IsError = true;

type SumOfPositive5AndNegative5 = AddExponents<5, -5>;
const SumOfPositive5AndNegative5: SumOfPositive5AndNegative5 = 0;

type SumOfPositive5AndNegative4 = AddExponents<5, -4>;
const SumOfPositive5AndNegative4: SumOfPositive5AndNegative4 = 1;

type SumOfPositive5AndNegative3 = AddExponents<5, -3>;
const SumOfPositive5AndNegative3: SumOfPositive5AndNegative3 = 2;

type SumOfPositive5AndNegative2 = AddExponents<5, -2>;
const SumOfPositive5AndNegative2: SumOfPositive5AndNegative2 = 3;

type SumOfPositive5AndNegative1 = AddExponents<5, -1>;
const SumOfPositive5AndNegative1: SumOfPositive5AndNegative1 = 4;

type SumOfPositive5And0 = AddExponents<5, 0>;
const SumOfPositive5And0: SumOfPositive5And0 = 5;

type SumOfPositive5AndPositive1IsError = IsArithmeticError<AddExponents<5, 1>>;
const SumOfPositive5AndPositive1IsError: SumOfPositive5AndPositive1IsError = true;

type SumOfPositive5AndPositive2IsError = IsArithmeticError<AddExponents<5, 2>>;
const SumOfPositive5AndPositive2IsError: SumOfPositive5AndPositive2IsError = true;

type SumOfPositive5AndPositive3IsError = IsArithmeticError<AddExponents<5, 3>>;
const SumOfPositive5AndPositive3IsError: SumOfPositive5AndPositive3IsError = true;

type SumOfPositive5AndPositive4IsError = IsArithmeticError<AddExponents<5, 4>>;
const SumOfPositive5AndPositive4IsError: SumOfPositive5AndPositive4IsError = true;

type SumOfPositive5AndPositive5IsError = IsArithmeticError<AddExponents<5, 5>>;
const SumOfPositive5AndPositive5IsError: SumOfPositive5AndPositive5IsError = true;

