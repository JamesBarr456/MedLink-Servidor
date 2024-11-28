"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus_1 = __importDefault(require("../../constants/HttpStatus"));
const HttpError_utils_1 = __importDefault(require("../../utils/HttpError.utils"));
const dao_1 = __importDefault(require("./dao"));
const model_1 = __importDefault(require("./model"));
class PatientClinicalDataService {
    static createClinicalData(updateFields, patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientClinicalDataPayload = new model_1.default(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (updateFields.height && {
                    height: updateFields.height,
                })), (updateFields.weight && {
                    weight: updateFields.weight,
                })), (updateFields.bloodType && {
                    bloodType: updateFields.bloodType,
                })), (updateFields.bloodPressureTrend && {
                    bloodPressureTrend: updateFields.bloodPressureTrend,
                })), (updateFields.isDonor && {
                    isDonor: updateFields.isDonor,
                })), (updateFields.hasAllergies && {
                    hasAllergies: updateFields.hasAllergies,
                })), (updateFields.hasChronicDiseases && {
                    hasChronicDiseases: updateFields.hasChronicDiseases,
                })), (updateFields.hasHealthyLifestyle && {
                    hasHealthyLifestyle: updateFields.hasHealthyLifestyle,
                })), { patientId }));
                const createdClinicalData = yield dao_1.default.create(patientClinicalDataPayload);
                return createdClinicalData;
            }
            catch (err) {
                const error = new HttpError_utils_1.default(err.description || err.message, err.details || err.message, err.status || HttpStatus_1.default.SERVER_ERROR);
                throw error;
            }
        });
    }
}
exports.default = PatientClinicalDataService;
