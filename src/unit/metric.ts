import { Exponent } from "../exponent";
import { GenericMeasure } from "../measure/genericMeasure";
import { Measure } from "../measure/measure";
import * as Quantity from "../quantity/quantities";
import { amperes, candelas, kilograms, meters, moles, seconds, steradians } from "./base";

export const hertz: Quantity.Frequency = seconds.inverse().withSymbol("Hz");
export const newtons: Quantity.Force = kilograms.times(meters.per(seconds.squared())).withSymbol("N");
export const pascals: Quantity.Pressure = newtons.per(meters.squared()).withSymbol("Pa");
export const joules: Quantity.Energy = newtons.times(meters).withSymbol("N");
export const watts: Quantity.Power = joules.per(seconds).withSymbol("J");
export const volts: Quantity.Voltage = watts.per(amperes).withSymbol("V");
export const coulombs: Quantity.ElectricCharge = amperes.times(seconds).withSymbol("C");
export const farads: Quantity.ElectricalCapacitance = coulombs.per(volts).withSymbol("F");
export const ohms: Quantity.ElectricalResistance = volts.per(amperes).withSymbol("Ω");
export const siemens: Quantity.ElectricalConductance = amperes.per(volts).withSymbol("S");
export const henrys: Quantity.ElectricalInductance = ohms.times(seconds).withSymbol("H");
export const webers: Quantity.MagneticFlux = joules.per(amperes).withSymbol("Wb");
export const teslas: Quantity.MagneticFluxDensity = volts.times(seconds.per(meters.squared())).withSymbol("T");
export const sieverts: Quantity.RadiationDose = joules.per(kilograms).withSymbol("Sv");
export const katals: Quantity.CatalyticActivity = moles.per(seconds).withSymbol("kat");
export const lumens: Quantity.LuminousFlux = candelas.times(steradians).withSymbol("lm");
export const luxes: Quantity.Illuminance = lumens.per(meters.squared()).withSymbol("lx");

// Prefixes

type Unit = Partial<{ [dimension: string]: Exponent }>;
type PrefixFn = <U extends Unit>(unit: GenericMeasure<U, number>) => GenericMeasure<U, number>;

// HACKHACK: Many of the typings here could be made more simple but instead use their base types to avoid absolute paths
// in the generated typings.
function prefix(symbolPrefix: string, multiplier: number): PrefixFn {
    return unit => {
        const { symbol } = unit;
        const newSymbol = symbol !== undefined ? `${symbolPrefix}${symbol}` : undefined;
        return Measure.of(multiplier, unit, newSymbol);
    };
}

export const yotta = prefix("Y", 1e24);
export const zetta = prefix("Z", 1e21);
export const exa = prefix("E", 1e18);
export const peta = prefix("P", 1e15);
export const tera = prefix("T", 1e12);
export const giga = prefix("G", 1e9);
export const mega = prefix("M", 1e6);
export const kilo = prefix("k", 1e3);
export const hecto = prefix("h", 100);
export const deca = prefix("da", 10);
export const deci = prefix("d", 0.1);
export const centi = prefix("c", 0.01);
export const milli = prefix("m", 1e-3);
export const micro = prefix("µ", 1e-6);
export const nano = prefix("n", 1e-9);
export const pico = prefix("p", 1e-12);
export const femto = prefix("f", 1e-15);
export const atto = prefix("y", 1e-18);
export const zepto = prefix("z", 1e-21);
export const yocto = prefix("y", 1e-24);
