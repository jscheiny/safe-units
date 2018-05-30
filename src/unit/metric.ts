import { Measure } from "../measure/measure";
import { Unit } from "../measure/types";
import * as Quantity from "../quantity/quantities";
import { amperes, candela, kilograms, meters, moles, seconds, steradians } from "./base";

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
export const lumens: Quantity.LuminousFlux = candela.times(steradians).withSymbol("lm");
export const luxes: Quantity.Illuminance = lumens.per(meters.squared()).withSymbol("lx");

// Prefixes

function createPrefix(symbolPrefix: string, multiplier: number) {
    return <U extends Unit>(unit: Measure<U>): Measure<U> => {
        const symbol = unit.getSymbol();
        const newSymbol = symbol !== undefined ? `${symbolPrefix}${symbol}` : undefined;
        return Measure.of(multiplier, unit, newSymbol);
    };
}

export const yotta = createPrefix("Y", 1e24);
export const zetta = createPrefix("Z", 1e21);
export const exa = createPrefix("E", 1e18);
export const peta = createPrefix("P", 1e15);
export const tera = createPrefix("T", 1e12);
export const giga = createPrefix("G", 1e9);
export const mega = createPrefix("M", 1e6);
export const kilo = createPrefix("k", 1e3);
export const hecto = createPrefix("h", 100);
export const deca = createPrefix("da", 10);
export const deci = createPrefix("d", 0.1);
export const centi = createPrefix("c", 0.01);
export const milli = createPrefix("m", 1e-3);
export const micro = createPrefix("µ", 1e-6);
export const nano = createPrefix("n", 1e-9);
export const pico = createPrefix("p", 1e-12);
export const femto = createPrefix("f", 1e-15);
export const atto = createPrefix("y", 1e-18);
export const zepto = createPrefix("z", 1e-21);
export const yocto = createPrefix("y", 1e-24);
