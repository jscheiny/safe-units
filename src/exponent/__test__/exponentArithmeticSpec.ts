import { IsSame } from "../common";
import { AddendOf, MultiplicandOf, ProductOf } from "../exponentArithmetic";
import { Exponent } from "../generated/exponent";

type AddendOf3Works = IsSame<-5 | -4 | -3 | -2 | -1 | 0 | 1 | 2, AddendOf<3>>;
const AddendOf3Works: AddendOf3Works = true;

type AddendOf0Works = IsSame<Exponent, AddendOf<0>>;
const AddendOf0Works: AddendOf0Works = true;

type MultiplicandOf2Works = IsSame<-2 | -1 | 0 | 1 | 2, MultiplicandOf<2>>;
const MultiplicandOf2Works: MultiplicandOf2Works = true;

type MultiplicandOf3Works = IsSame<-1 | 0 | 1, MultiplicandOf<3>>;
const MultiplicandOf3Works: MultiplicandOf3Works = true;

type MultiplicandOf0Works = IsSame<Exponent, MultiplicandOf<0>>;
const MultiplicandOf0Works: MultiplicandOf0Works = true;

type ProductOfWorks = IsSame<-4 | -2 | 0 | 2 | 4, ProductOf<2>>;
const ProductOfWorks: ProductOfWorks = true;
