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
// MODELS
const mongoose_1 = require("mongoose");
const model_1 = __importDefault(require("../patient/model"));
// DAOS
const dao_1 = __importDefault(require("../user/dao"));
class PatientDAO extends dao_1.default {
    constructor() {
        super(model_1.default);
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.default.findById(id)
                .populate([
                "clinicalData",
                "allergiesData",
                "pathologicalData",
                "nonPathologicalData",
                "familyInheritance",
                "vaccinationShedule",
                "authorizedDoctors",
                "medications",
                "documents",
            ])
                .lean();
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientId = new mongoose_1.Types.ObjectId(id);
            return yield model_1.default.findOneAndUpdate({ _id: patientId }, data, {
                new: true,
            })
                .populate([
                "clinicalData",
                "allergiesData",
                "familyInheritance",
                "pathologicalData",
                "nonPathologicalData",
                "vaccinationShedule",
                "medications",
                "documents",
            ])
                .lean();
        });
    }
}
exports.default = PatientDAO;
