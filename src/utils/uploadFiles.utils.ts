// LIBRARIES
import multer from "multer";
// UTILS
import { rootPath } from "./path.utils";

const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        if (file.fieldname === "avatar") {
            cb(null, rootPath + "/public/uploads/avatars");
        } else if (file.fieldname === "studies") {
            cb(null, rootPath + "/public/uploads/studies");
        } else {
            cb(null, rootPath + "/public/uploads/others");
        }
    },
    filename: (_req, file, cb) => {
        cb(
            null,
            `${Date.now()}-${file.originalname
                .replace(/\s/g, "-")
                .toLowerCase()}`
        );
    },
});

const fileUploader = multer({ storage });

export default fileUploader;
