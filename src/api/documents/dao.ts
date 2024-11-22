import { Types } from "mongoose";
import IDocument from "./interface";
import Document from "./model";

export default class DocumentDAO {
    static async saveManyDocuments(
        files: IDocument[]
    ): Promise<Types.ObjectId[]> {
        const bulkOps = files.map((file) => ({
            insertOne: {
                document: file,
            },
        }));

        const documentsSaved = await Document.bulkWrite(bulkOps);
        const documentIds = Object.values(documentsSaved.insertedIds);
        return documentIds;
    }
}
