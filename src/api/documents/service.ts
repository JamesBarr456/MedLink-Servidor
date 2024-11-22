import HTTP_STATUS from "../../constants/HttpStatus";
import { PatientFields } from "../../constants/PatientFields";
import { MulterFiles } from "../../interfaces/file.interface";
import HttpError from "../../utils/HttpError.utils";
import { ITokenPayload } from "../auth/interface";
import { PatientResponse } from "../patient/interface";
import PatientService from "../patient/service";
import DocumentDAO from "./dao";
import IDocument from "./interface";

export default class DocumentsService {
    static async createOrUpdateDocuments(
        user: ITokenPayload,
        files: MulterFiles
    ): Promise<Partial<PatientResponse>> {
        try {
            const documentPayload = files.studies.map((file) => {
                return {
                    url: `/uploads/studies/${file.filename}`,
                    name: file.originalname,
                    type: file.mimetype,
                    date: new Date(),
                } as IDocument;
            });

            const documentsSaved = await DocumentDAO.saveManyDocuments(
                documentPayload
            );

            const patientUpdated: Partial<PatientResponse> =
                await PatientService.addMedicalInformation(
                    user,
                    documentsSaved,
                    PatientFields.DOCUMENTS
                );

            return patientUpdated;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );

            throw error;
        }
    }
}
