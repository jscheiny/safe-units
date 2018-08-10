import {
    AddendOf,
    DivisorOf,
    FactorOf,
    MultiplicandOf,
    NonZeroExponent,
    ProductOf,
    SubtrahendOf,
} from "../exponentArithmetic";
import { Exponent, IsSame } from "../generated/common";

type AddendOfWorks = IsSame<-5 | -4 | -3 | -2 | -1 | 0 | 1 | 2, AddendOf<3>>;
const AddendOfWorks: AddendOfWorks = true;

type SubtrahendWorks = IsSame<-3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5, SubtrahendOf<3>>;
const SubtrahendWorks: SubtrahendWorks = true;

type MultiplicandWorks = IsSame<-2 | -1 | 0 | 1 | 2, MultiplicandOf<2>>;
const MultiplicandWorks: MultiplicandWorks = true;

type MultiplicandOf0Works = IsSame<Exponent, MultiplicandOf<0>>;
const MultiplicandOf0Works: MultiplicandOf0Works = true;

type DivisorWorks = IsSame<-4 | -2 | 2 | 4, DivisorOf<4>>;
const DivisorWorks: DivisorWorks = true;

type DivisorOf0Works = IsSame<NonZeroExponent, DivisorOf<0>>;
const DivisorOf0Works: DivisorOf0Works = true;

type ProductWorks = IsSame<-4 | 2 | 0 | 2 | 4, ProductOf<2>>;
const ProductWorks: ProductWorks = true;

type FactorWorks = IsSame<-4 | -2 | -1 | 1 | 2 | 4, FactorOf<4>>;
const FactorWorks: FactorWorks = true;
