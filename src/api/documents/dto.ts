import IDocument from "./interface";

export default class PatientDocumentsDto {
    static PatientDocumentsDTO(document: IDocument): Partial<IDocument> {
        return {
            url: document.url,
            name: document.name,
            type: document.type,
        };
    }
}
