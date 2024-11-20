import IPatientVaccinationShedule from "./interface";

export default class PatientVaccinationSheduleDto {
    static patientVaccinationSheduleDTO(
        patientVaccinationShedule: IPatientVaccinationShedule
    ): Partial<IPatientVaccinationShedule> {
        return {
            atBirth: {
                hepatitisB1: patientVaccinationShedule.atBirth.hepatitisB1,
                bcg: patientVaccinationShedule.atBirth.bcg,
            },
            twoMonths: {
                pentavalent1: patientVaccinationShedule.twoMonths.pentavalent1,
                hepatitisB2: patientVaccinationShedule.twoMonths.hepatitisB2,
                rotavirus1: patientVaccinationShedule.twoMonths.rotavirus1,
                pneumococcal1:
                    patientVaccinationShedule.twoMonths.pneumococcal1,
            },
            fourMonths: {
                pentavalent2: patientVaccinationShedule.fourMonths.pentavalent2,
                rotavirus2: patientVaccinationShedule.fourMonths.rotavirus2,
                pneumococcal2:
                    patientVaccinationShedule.fourMonths.pneumococcal2,
            },
            sixMonths: {
                pentavalent3: patientVaccinationShedule.sixMonths.pentavalent3,
                hepatitisB3: patientVaccinationShedule.sixMonths.hepatitisB3,
                rotavirus3: patientVaccinationShedule.sixMonths.rotavirus3,
                influenza1: patientVaccinationShedule.sixMonths.influenza1,
            },
            sevenMonths: {
                influenza2: patientVaccinationShedule.sevenMonths.influenza2,
            },
            twelveMonths: {
                srp1: patientVaccinationShedule.twelveMonths.srp1,
                pneumococcal3:
                    patientVaccinationShedule.twelveMonths.pneumococcal3,
            },
            eighteenMonths: {
                pentavalent4:
                    patientVaccinationShedule.eighteenMonths.pentavalent4,
            },
            twoYears: {
                influenzaAnnual1:
                    patientVaccinationShedule.twoYears.influenzaAnnual1,
            },
            threeYears: {
                influenzaAnnual2:
                    patientVaccinationShedule.threeYears.influenzaAnnual2,
            },
            fourYears: {
                dpt: patientVaccinationShedule.fourYears.dpt,
                influenzaAnnual3:
                    patientVaccinationShedule.fourYears.influenzaAnnual3,
            },
            fiveYears: {
                influenzaAnnual4:
                    patientVaccinationShedule.fiveYears.influenzaAnnual4,
                vopOpv: patientVaccinationShedule.fiveYears.vopOpv,
            },
            elevenYears: {
                vph: patientVaccinationShedule.elevenYears.vph,
            },
            otherVaccines: patientVaccinationShedule.otherVaccines,
            ...(patientVaccinationShedule.otherVaccinesDetails
                ? {
                      otherVaccinesDetails:
                          patientVaccinationShedule.otherVaccinesDetails,
                  }
                : {}),
        };
    }
}
