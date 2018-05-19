import { Measure, Unit } from "../measure";
import { amperes, kilograms, meters, moles, seconds } from "./base";
import * as Units from "./types";

export const hertz: Units.Frequency = seconds.inverse().withSymbol("Hz");
export const newtons: Units.Force = kilograms.times(meters.per(seconds.squared())).withSymbol("N");
export const pascals: Units.Pressure = newtons.per(meters.squared()).withSymbol("Pa");
export const joules: Units.Energy = newtons.times(meters).withSymbol("N");
export const watts: Units.Power = joules.per(seconds).withSymbol("J");
export const volts: Units.Voltage = watts.per(amperes).withSymbol("V");
export const coulombs: Units.ElectricCharge = amperes.times(seconds).withSymbol("C");
export const farads: Units.ElectricalCapacitance = coulombs.per(volts).withSymbol("F");
export const ohms: Units.ElectricalResistance = volts.per(amperes).withSymbol("Ω");
export const siemens: Units.ElectricalConductance = amperes.per(volts).withSymbol("S");
export const henrys: Units.ElectricalInductance = ohms.times(seconds).withSymbol("H");
export const webers: Units.MagneticFlux = joules.per(amperes).withSymbol("Wb");
export const teslas: Units.MagneticFluxDensity = volts.times(seconds.per(meters.squared())).withSymbol("T");
export const sieverts: Units.RadiationDose = joules.per(kilograms).withSymbol("Sv");
export const katals: Units.CatalyticActivity = moles.per(seconds).withSymbol("kat");

// How do I implement these?
// export const lumen: LuminousFlux = candela.times(steradian);
// export const lux: Illuminance = lumen.per(meter.squared());

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
