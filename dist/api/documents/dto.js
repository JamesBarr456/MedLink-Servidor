"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PatientDocumentsDto {
    static PatientDocumentsDTO(document) {
        return {
            url: document.url,
            name: document.name,
            type: document.type,
        };
    }
}
exports.default = PatientDocumentsDto;
