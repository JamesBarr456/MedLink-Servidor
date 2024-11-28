"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClinicDto {
    static clinicDTO(clinic) {
        return Object.assign({ id: clinic._id, name: clinic.name, address: clinic.address }, (clinic.openingHours
            ? { openingHours: clinic.openingHours }
            : {}));
    }
}
exports.default = ClinicDto;
