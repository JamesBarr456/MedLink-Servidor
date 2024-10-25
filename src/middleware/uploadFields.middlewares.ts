// UTILS
import fileUploader from "../utils/uploadFiles.utils";

export const uploadFields = fileUploader.fields([
    { name: "profile", maxCount: 1 },
    { name: "studies", maxCount: 10 },
]);
