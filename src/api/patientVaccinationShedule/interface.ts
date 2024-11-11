import { Document } from "mongoose";

export default interface IPatitientVaccinationShedule extends Document {
    atBirth: { bcg: boolean; hepatitisB1: boolean };
    twoMonths: {
        pentavalent1: boolean;
        hepatitisB2: boolean;
        rotavirus1: boolean;
        pneumococcal1: boolean;
    };
    fourMonths: {
        pentavalent2: boolean;
        rotavirus2: boolean;
        pneumococcal2: boolean;
    };
    sixMonths: {
        pentavalent3: boolean;
        hepatitisB3: boolean;
        rotavirus3: boolean;
        influenza1: boolean;
    };
    sevenMonths: { influenza2: boolean };
    twelveMonths: { srp1: boolean; pneumococcal3: boolean };
    eighteenMonths: { pentavalent4: boolean };
    twoYears: { influenzaAnnual1: boolean };
    threeYears: { influenzaAnnual2: boolean };
    fourYears: { dpt: boolean; influenzaAnnual3: boolean };
    fiveYears: { influenzaAnnual4: boolean; vopOpv: boolean };
    elevenYears: { vph: boolean };
    otherVaccines: Boolean;
    otherVaccinesDetails: String;
}
