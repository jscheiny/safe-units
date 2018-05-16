import { MultiplyExponents } from "../multiplication";
import { IsArithmeticError } from "../utils";

type ProductOfNegative5AndNegative5IsError = IsArithmeticError<MultiplyExponents<-5, -5>>;
const ProductOfNegative5AndNegative5IsError: ProductOfNegative5AndNegative5IsError = true;

type ProductOfNegative5AndNegative4IsError = IsArithmeticError<MultiplyExponents<-5, -4>>;
const ProductOfNegative5AndNegative4IsError: ProductOfNegative5AndNegative4IsError = true;

type ProductOfNegative5AndNegative3IsError = IsArithmeticError<MultiplyExponents<-5, -3>>;
const ProductOfNegative5AndNegative3IsError: ProductOfNegative5AndNegative3IsError = true;

type ProductOfNegative5AndNegative2IsError = IsArithmeticError<MultiplyExponents<-5, -2>>;
const ProductOfNegative5AndNegative2IsError: ProductOfNegative5AndNegative2IsError = true;

type ProductOfNegative5AndNegative1 = MultiplyExponents<-5, -1>;
const ProductOfNegative5AndNegative1: ProductOfNegative5AndNegative1 = 5;

type ProductOfNegative5And0 = MultiplyExponents<-5, 0>;
const ProductOfNegative5And0: ProductOfNegative5And0 = 0;

type ProductOfNegative5AndPositive1 = MultiplyExponents<-5, 1>;
const ProductOfNegative5AndPositive1: ProductOfNegative5AndPositive1 = -5;

type ProductOfNegative5AndPositive2IsError = IsArithmeticError<MultiplyExponents<-5, 2>>;
const ProductOfNegative5AndPositive2IsError: ProductOfNegative5AndPositive2IsError = true;

type ProductOfNegative5AndPositive3IsError = IsArithmeticError<MultiplyExponents<-5, 3>>;
const ProductOfNegative5AndPositive3IsError: ProductOfNegative5AndPositive3IsError = true;

type ProductOfNegative5AndPositive4IsError = IsArithmeticError<MultiplyExponents<-5, 4>>;
const ProductOfNegative5AndPositive4IsError: ProductOfNegative5AndPositive4IsError = true;

type ProductOfNegative5AndPositive5IsError = IsArithmeticError<MultiplyExponents<-5, 5>>;
const ProductOfNegative5AndPositive5IsError: ProductOfNegative5AndPositive5IsError = true;

type ProductOfNegative4AndNegative5IsError = IsArithmeticError<MultiplyExponents<-4, -5>>;
const ProductOfNegative4AndNegative5IsError: ProductOfNegative4AndNegative5IsError = true;

type ProductOfNegative4AndNegative4IsError = IsArithmeticError<MultiplyExponents<-4, -4>>;
const ProductOfNegative4AndNegative4IsError: ProductOfNegative4AndNegative4IsError = true;

type ProductOfNegative4AndNegative3IsError = IsArithmeticError<MultiplyExponents<-4, -3>>;
const ProductOfNegative4AndNegative3IsError: ProductOfNegative4AndNegative3IsError = true;

type ProductOfNegative4AndNegative2IsError = IsArithmeticError<MultiplyExponents<-4, -2>>;
const ProductOfNegative4AndNegative2IsError: ProductOfNegative4AndNegative2IsError = true;

type ProductOfNegative4AndNegative1 = MultiplyExponents<-4, -1>;
const ProductOfNegative4AndNegative1: ProductOfNegative4AndNegative1 = 4;

type ProductOfNegative4And0 = MultiplyExponents<-4, 0>;
const ProductOfNegative4And0: ProductOfNegative4And0 = 0;

type ProductOfNegative4AndPositive1 = MultiplyExponents<-4, 1>;
const ProductOfNegative4AndPositive1: ProductOfNegative4AndPositive1 = -4;

type ProductOfNegative4AndPositive2IsError = IsArithmeticError<MultiplyExponents<-4, 2>>;
const ProductOfNegative4AndPositive2IsError: ProductOfNegative4AndPositive2IsError = true;

type ProductOfNegative4AndPositive3IsError = IsArithmeticError<MultiplyExponents<-4, 3>>;
const ProductOfNegative4AndPositive3IsError: ProductOfNegative4AndPositive3IsError = true;

type ProductOfNegative4AndPositive4IsError = IsArithmeticError<MultiplyExponents<-4, 4>>;
const ProductOfNegative4AndPositive4IsError: ProductOfNegative4AndPositive4IsError = true;

type ProductOfNegative4AndPositive5IsError = IsArithmeticError<MultiplyExponents<-4, 5>>;
const ProductOfNegative4AndPositive5IsError: ProductOfNegative4AndPositive5IsError = true;

type ProductOfNegative3AndNegative5IsError = IsArithmeticError<MultiplyExponents<-3, -5>>;
const ProductOfNegative3AndNegative5IsError: ProductOfNegative3AndNegative5IsError = true;

type ProductOfNegative3AndNegative4IsError = IsArithmeticError<MultiplyExponents<-3, -4>>;
const ProductOfNegative3AndNegative4IsError: ProductOfNegative3AndNegative4IsError = true;

type ProductOfNegative3AndNegative3IsError = IsArithmeticError<MultiplyExponents<-3, -3>>;
const ProductOfNegative3AndNegative3IsError: ProductOfNegative3AndNegative3IsError = true;

type ProductOfNegative3AndNegative2IsError = IsArithmeticError<MultiplyExponents<-3, -2>>;
const ProductOfNegative3AndNegative2IsError: ProductOfNegative3AndNegative2IsError = true;

type ProductOfNegative3AndNegative1 = MultiplyExponents<-3, -1>;
const ProductOfNegative3AndNegative1: ProductOfNegative3AndNegative1 = 3;

type ProductOfNegative3And0 = MultiplyExponents<-3, 0>;
const ProductOfNegative3And0: ProductOfNegative3And0 = 0;

type ProductOfNegative3AndPositive1 = MultiplyExponents<-3, 1>;
const ProductOfNegative3AndPositive1: ProductOfNegative3AndPositive1 = -3;

type ProductOfNegative3AndPositive2IsError = IsArithmeticError<MultiplyExponents<-3, 2>>;
const ProductOfNegative3AndPositive2IsError: ProductOfNegative3AndPositive2IsError = true;

type ProductOfNegative3AndPositive3IsError = IsArithmeticError<MultiplyExponents<-3, 3>>;
const ProductOfNegative3AndPositive3IsError: ProductOfNegative3AndPositive3IsError = true;

type ProductOfNegative3AndPositive4IsError = IsArithmeticError<MultiplyExponents<-3, 4>>;
const ProductOfNegative3AndPositive4IsError: ProductOfNegative3AndPositive4IsError = true;

type ProductOfNegative3AndPositive5IsError = IsArithmeticError<MultiplyExponents<-3, 5>>;
const ProductOfNegative3AndPositive5IsError: ProductOfNegative3AndPositive5IsError = true;

type ProductOfNegative2AndNegative5IsError = IsArithmeticError<MultiplyExponents<-2, -5>>;
const ProductOfNegative2AndNegative5IsError: ProductOfNegative2AndNegative5IsError = true;

type ProductOfNegative2AndNegative4IsError = IsArithmeticError<MultiplyExponents<-2, -4>>;
const ProductOfNegative2AndNegative4IsError: ProductOfNegative2AndNegative4IsError = true;

type ProductOfNegative2AndNegative3IsError = IsArithmeticError<MultiplyExponents<-2, -3>>;
const ProductOfNegative2AndNegative3IsError: ProductOfNegative2AndNegative3IsError = true;

type ProductOfNegative2AndNegative2 = MultiplyExponents<-2, -2>;
const ProductOfNegative2AndNegative2: ProductOfNegative2AndNegative2 = 4;

type ProductOfNegative2AndNegative1 = MultiplyExponents<-2, -1>;
const ProductOfNegative2AndNegative1: ProductOfNegative2AndNegative1 = 2;

type ProductOfNegative2And0 = MultiplyExponents<-2, 0>;
const ProductOfNegative2And0: ProductOfNegative2And0 = 0;

type ProductOfNegative2AndPositive1 = MultiplyExponents<-2, 1>;
const ProductOfNegative2AndPositive1: ProductOfNegative2AndPositive1 = -2;

type ProductOfNegative2AndPositive2 = MultiplyExponents<-2, 2>;
const ProductOfNegative2AndPositive2: ProductOfNegative2AndPositive2 = -4;

type ProductOfNegative2AndPositive3IsError = IsArithmeticError<MultiplyExponents<-2, 3>>;
const ProductOfNegative2AndPositive3IsError: ProductOfNegative2AndPositive3IsError = true;

type ProductOfNegative2AndPositive4IsError = IsArithmeticError<MultiplyExponents<-2, 4>>;
const ProductOfNegative2AndPositive4IsError: ProductOfNegative2AndPositive4IsError = true;

type ProductOfNegative2AndPositive5IsError = IsArithmeticError<MultiplyExponents<-2, 5>>;
const ProductOfNegative2AndPositive5IsError: ProductOfNegative2AndPositive5IsError = true;

type ProductOfNegative1AndNegative5 = MultiplyExponents<-1, -5>;
const ProductOfNegative1AndNegative5: ProductOfNegative1AndNegative5 = 5;

type ProductOfNegative1AndNegative4 = MultiplyExponents<-1, -4>;
const ProductOfNegative1AndNegative4: ProductOfNegative1AndNegative4 = 4;

type ProductOfNegative1AndNegative3 = MultiplyExponents<-1, -3>;
const ProductOfNegative1AndNegative3: ProductOfNegative1AndNegative3 = 3;

type ProductOfNegative1AndNegative2 = MultiplyExponents<-1, -2>;
const ProductOfNegative1AndNegative2: ProductOfNegative1AndNegative2 = 2;

type ProductOfNegative1AndNegative1 = MultiplyExponents<-1, -1>;
const ProductOfNegative1AndNegative1: ProductOfNegative1AndNegative1 = 1;

type ProductOfNegative1And0 = MultiplyExponents<-1, 0>;
const ProductOfNegative1And0: ProductOfNegative1And0 = 0;

type ProductOfNegative1AndPositive1 = MultiplyExponents<-1, 1>;
const ProductOfNegative1AndPositive1: ProductOfNegative1AndPositive1 = -1;

type ProductOfNegative1AndPositive2 = MultiplyExponents<-1, 2>;
const ProductOfNegative1AndPositive2: ProductOfNegative1AndPositive2 = -2;

type ProductOfNegative1AndPositive3 = MultiplyExponents<-1, 3>;
const ProductOfNegative1AndPositive3: ProductOfNegative1AndPositive3 = -3;

type ProductOfNegative1AndPositive4 = MultiplyExponents<-1, 4>;
const ProductOfNegative1AndPositive4: ProductOfNegative1AndPositive4 = -4;

type ProductOfNegative1AndPositive5 = MultiplyExponents<-1, 5>;
const ProductOfNegative1AndPositive5: ProductOfNegative1AndPositive5 = -5;

type ProductOf0AndNegative5 = MultiplyExponents<0, -5>;
const ProductOf0AndNegative5: ProductOf0AndNegative5 = 0;

type ProductOf0AndNegative4 = MultiplyExponents<0, -4>;
const ProductOf0AndNegative4: ProductOf0AndNegative4 = 0;

type ProductOf0AndNegative3 = MultiplyExponents<0, -3>;
const ProductOf0AndNegative3: ProductOf0AndNegative3 = 0;

type ProductOf0AndNegative2 = MultiplyExponents<0, -2>;
const ProductOf0AndNegative2: ProductOf0AndNegative2 = 0;

type ProductOf0AndNegative1 = MultiplyExponents<0, -1>;
const ProductOf0AndNegative1: ProductOf0AndNegative1 = 0;

type ProductOf0And0 = MultiplyExponents<0, 0>;
const ProductOf0And0: ProductOf0And0 = 0;

type ProductOf0AndPositive1 = MultiplyExponents<0, 1>;
const ProductOf0AndPositive1: ProductOf0AndPositive1 = 0;

type ProductOf0AndPositive2 = MultiplyExponents<0, 2>;
const ProductOf0AndPositive2: ProductOf0AndPositive2 = 0;

type ProductOf0AndPositive3 = MultiplyExponents<0, 3>;
const ProductOf0AndPositive3: ProductOf0AndPositive3 = 0;

type ProductOf0AndPositive4 = MultiplyExponents<0, 4>;
const ProductOf0AndPositive4: ProductOf0AndPositive4 = 0;

type ProductOf0AndPositive5 = MultiplyExponents<0, 5>;
const ProductOf0AndPositive5: ProductOf0AndPositive5 = 0;

type ProductOfPositive1AndNegative5 = MultiplyExponents<1, -5>;
const ProductOfPositive1AndNegative5: ProductOfPositive1AndNegative5 = -5;

type ProductOfPositive1AndNegative4 = MultiplyExponents<1, -4>;
const ProductOfPositive1AndNegative4: ProductOfPositive1AndNegative4 = -4;

type ProductOfPositive1AndNegative3 = MultiplyExponents<1, -3>;
const ProductOfPositive1AndNegative3: ProductOfPositive1AndNegative3 = -3;

type ProductOfPositive1AndNegative2 = MultiplyExponents<1, -2>;
const ProductOfPositive1AndNegative2: ProductOfPositive1AndNegative2 = -2;

type ProductOfPositive1AndNegative1 = MultiplyExponents<1, -1>;
const ProductOfPositive1AndNegative1: ProductOfPositive1AndNegative1 = -1;

type ProductOfPositive1And0 = MultiplyExponents<1, 0>;
const ProductOfPositive1And0: ProductOfPositive1And0 = 0;

type ProductOfPositive1AndPositive1 = MultiplyExponents<1, 1>;
const ProductOfPositive1AndPositive1: ProductOfPositive1AndPositive1 = 1;

type ProductOfPositive1AndPositive2 = MultiplyExponents<1, 2>;
const ProductOfPositive1AndPositive2: ProductOfPositive1AndPositive2 = 2;

type ProductOfPositive1AndPositive3 = MultiplyExponents<1, 3>;
const ProductOfPositive1AndPositive3: ProductOfPositive1AndPositive3 = 3;

type ProductOfPositive1AndPositive4 = MultiplyExponents<1, 4>;
const ProductOfPositive1AndPositive4: ProductOfPositive1AndPositive4 = 4;

type ProductOfPositive1AndPositive5 = MultiplyExponents<1, 5>;
const ProductOfPositive1AndPositive5: ProductOfPositive1AndPositive5 = 5;

type ProductOfPositive2AndNegative5IsError = IsArithmeticError<MultiplyExponents<2, -5>>;
const ProductOfPositive2AndNegative5IsError: ProductOfPositive2AndNegative5IsError = true;

type ProductOfPositive2AndNegative4IsError = IsArithmeticError<MultiplyExponents<2, -4>>;
const ProductOfPositive2AndNegative4IsError: ProductOfPositive2AndNegative4IsError = true;

type ProductOfPositive2AndNegative3IsError = IsArithmeticError<MultiplyExponents<2, -3>>;
const ProductOfPositive2AndNegative3IsError: ProductOfPositive2AndNegative3IsError = true;

type ProductOfPositive2AndNegative2 = MultiplyExponents<2, -2>;
const ProductOfPositive2AndNegative2: ProductOfPositive2AndNegative2 = -4;

type ProductOfPositive2AndNegative1 = MultiplyExponents<2, -1>;
const ProductOfPositive2AndNegative1: ProductOfPositive2AndNegative1 = -2;

type ProductOfPositive2And0 = MultiplyExponents<2, 0>;
const ProductOfPositive2And0: ProductOfPositive2And0 = 0;

type ProductOfPositive2AndPositive1 = MultiplyExponents<2, 1>;
const ProductOfPositive2AndPositive1: ProductOfPositive2AndPositive1 = 2;

type ProductOfPositive2AndPositive2 = MultiplyExponents<2, 2>;
const ProductOfPositive2AndPositive2: ProductOfPositive2AndPositive2 = 4;

type ProductOfPositive2AndPositive3IsError = IsArithmeticError<MultiplyExponents<2, 3>>;
const ProductOfPositive2AndPositive3IsError: ProductOfPositive2AndPositive3IsError = true;

type ProductOfPositive2AndPositive4IsError = IsArithmeticError<MultiplyExponents<2, 4>>;
const ProductOfPositive2AndPositive4IsError: ProductOfPositive2AndPositive4IsError = true;

type ProductOfPositive2AndPositive5IsError = IsArithmeticError<MultiplyExponents<2, 5>>;
const ProductOfPositive2AndPositive5IsError: ProductOfPositive2AndPositive5IsError = true;

type ProductOfPositive3AndNegative5IsError = IsArithmeticError<MultiplyExponents<3, -5>>;
const ProductOfPositive3AndNegative5IsError: ProductOfPositive3AndNegative5IsError = true;

type ProductOfPositive3AndNegative4IsError = IsArithmeticError<MultiplyExponents<3, -4>>;
const ProductOfPositive3AndNegative4IsError: ProductOfPositive3AndNegative4IsError = true;

type ProductOfPositive3AndNegative3IsError = IsArithmeticError<MultiplyExponents<3, -3>>;
const ProductOfPositive3AndNegative3IsError: ProductOfPositive3AndNegative3IsError = true;

type ProductOfPositive3AndNegative2IsError = IsArithmeticError<MultiplyExponents<3, -2>>;
const ProductOfPositive3AndNegative2IsError: ProductOfPositive3AndNegative2IsError = true;

type ProductOfPositive3AndNegative1 = MultiplyExponents<3, -1>;
const ProductOfPositive3AndNegative1: ProductOfPositive3AndNegative1 = -3;

type ProductOfPositive3And0 = MultiplyExponents<3, 0>;
const ProductOfPositive3And0: ProductOfPositive3And0 = 0;

type ProductOfPositive3AndPositive1 = MultiplyExponents<3, 1>;
const ProductOfPositive3AndPositive1: ProductOfPositive3AndPositive1 = 3;

type ProductOfPositive3AndPositive2IsError = IsArithmeticError<MultiplyExponents<3, 2>>;
const ProductOfPositive3AndPositive2IsError: ProductOfPositive3AndPositive2IsError = true;

type ProductOfPositive3AndPositive3IsError = IsArithmeticError<MultiplyExponents<3, 3>>;
const ProductOfPositive3AndPositive3IsError: ProductOfPositive3AndPositive3IsError = true;

type ProductOfPositive3AndPositive4IsError = IsArithmeticError<MultiplyExponents<3, 4>>;
const ProductOfPositive3AndPositive4IsError: ProductOfPositive3AndPositive4IsError = true;

type ProductOfPositive3AndPositive5IsError = IsArithmeticError<MultiplyExponents<3, 5>>;
const ProductOfPositive3AndPositive5IsError: ProductOfPositive3AndPositive5IsError = true;

type ProductOfPositive4AndNegative5IsError = IsArithmeticError<MultiplyExponents<4, -5>>;
const ProductOfPositive4AndNegative5IsError: ProductOfPositive4AndNegative5IsError = true;

type ProductOfPositive4AndNegative4IsError = IsArithmeticError<MultiplyExponents<4, -4>>;
const ProductOfPositive4AndNegative4IsError: ProductOfPositive4AndNegative4IsError = true;

type ProductOfPositive4AndNegative3IsError = IsArithmeticError<MultiplyExponents<4, -3>>;
const ProductOfPositive4AndNegative3IsError: ProductOfPositive4AndNegative3IsError = true;

type ProductOfPositive4AndNegative2IsError = IsArithmeticError<MultiplyExponents<4, -2>>;
const ProductOfPositive4AndNegative2IsError: ProductOfPositive4AndNegative2IsError = true;

type ProductOfPositive4AndNegative1 = MultiplyExponents<4, -1>;
const ProductOfPositive4AndNegative1: ProductOfPositive4AndNegative1 = -4;

type ProductOfPositive4And0 = MultiplyExponents<4, 0>;
const ProductOfPositive4And0: ProductOfPositive4And0 = 0;

type ProductOfPositive4AndPositive1 = MultiplyExponents<4, 1>;
const ProductOfPositive4AndPositive1: ProductOfPositive4AndPositive1 = 4;

type ProductOfPositive4AndPositive2IsError = IsArithmeticError<MultiplyExponents<4, 2>>;
const ProductOfPositive4AndPositive2IsError: ProductOfPositive4AndPositive2IsError = true;

type ProductOfPositive4AndPositive3IsError = IsArithmeticError<MultiplyExponents<4, 3>>;
const ProductOfPositive4AndPositive3IsError: ProductOfPositive4AndPositive3IsError = true;

type ProductOfPositive4AndPositive4IsError = IsArithmeticError<MultiplyExponents<4, 4>>;
const ProductOfPositive4AndPositive4IsError: ProductOfPositive4AndPositive4IsError = true;

type ProductOfPositive4AndPositive5IsError = IsArithmeticError<MultiplyExponents<4, 5>>;
const ProductOfPositive4AndPositive5IsError: ProductOfPositive4AndPositive5IsError = true;

type ProductOfPositive5AndNegative5IsError = IsArithmeticError<MultiplyExponents<5, -5>>;
const ProductOfPositive5AndNegative5IsError: ProductOfPositive5AndNegative5IsError = true;

type ProductOfPositive5AndNegative4IsError = IsArithmeticError<MultiplyExponents<5, -4>>;
const ProductOfPositive5AndNegative4IsError: ProductOfPositive5AndNegative4IsError = true;

type ProductOfPositive5AndNegative3IsError = IsArithmeticError<MultiplyExponents<5, -3>>;
const ProductOfPositive5AndNegative3IsError: ProductOfPositive5AndNegative3IsError = true;

type ProductOfPositive5AndNegative2IsError = IsArithmeticError<MultiplyExponents<5, -2>>;
const ProductOfPositive5AndNegative2IsError: ProductOfPositive5AndNegative2IsError = true;

type ProductOfPositive5AndNegative1 = MultiplyExponents<5, -1>;
const ProductOfPositive5AndNegative1: ProductOfPositive5AndNegative1 = -5;

type ProductOfPositive5And0 = MultiplyExponents<5, 0>;
const ProductOfPositive5And0: ProductOfPositive5And0 = 0;

type ProductOfPositive5AndPositive1 = MultiplyExponents<5, 1>;
const ProductOfPositive5AndPositive1: ProductOfPositive5AndPositive1 = 5;

type ProductOfPositive5AndPositive2IsError = IsArithmeticError<MultiplyExponents<5, 2>>;
const ProductOfPositive5AndPositive2IsError: ProductOfPositive5AndPositive2IsError = true;

type ProductOfPositive5AndPositive3IsError = IsArithmeticError<MultiplyExponents<5, 3>>;
const ProductOfPositive5AndPositive3IsError: ProductOfPositive5AndPositive3IsError = true;

type ProductOfPositive5AndPositive4IsError = IsArithmeticError<MultiplyExponents<5, 4>>;
const ProductOfPositive5AndPositive4IsError: ProductOfPositive5AndPositive4IsError = true;

type ProductOfPositive5AndPositive5IsError = IsArithmeticError<MultiplyExponents<5, 5>>;
const ProductOfPositive5AndPositive5IsError: ProductOfPositive5AndPositive5IsError = true;
