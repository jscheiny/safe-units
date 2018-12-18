import { AddendOf, MultiplicandOf, Exponent, ProductOf } from "../../src/exponent";
import { IsSame } from "./utils";
import { SubtrahendOf } from "../../src/exponent/exponentArithmetic";

type AddendOf3 = IsSame<-5 | -4 | -3 | -2 | -1 | 0 | 1 | 2, AddendOf<3>>; // $ExpectType true
type AddendOf0 = AddendOf<0>; // $ExpectType Exponent

type SubtrahendOf3 = IsSame<-2 | -1 | 0 | 1 | 2 | 3 | 4 | 5, SubtrahendOf<3>>; // $ExpectType true
type SubtrahendOf0 = SubtrahendOf<0>; // $ExpectType Exponent

type MultiplicandOf2 = IsSame<-2 | -1 | 0 | 1 | 2, MultiplicandOf<2>>; // $ExpectType true
type MultiplicandOf3 = IsSame<-1 | 0 | 1, MultiplicandOf<3>>; // $ExpectType true
type MultiplicandOf0 = MultiplicandOf<0>; // $ExpectType Exponent

type ProductOf2 = IsSame<-4 | -2 | 0 | 2 | 4, ProductOf<2>>; // $ExpectType true
