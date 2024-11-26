import { IClinic } from "./interface";

export default class ClinicDto {
    static clinicDTO(clinic: IClinic): Partial<IClinic> {
        return {
            id: clinic._id,
            name: clinic.name,
            address: clinic.address,
            ...(clinic.openingHours
                ? { openingHours: clinic.openingHours }
                : {}),
        };
    }
}
