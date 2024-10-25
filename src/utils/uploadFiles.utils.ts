// LIBRARIES
import multer from "multer";
// UTILS
import { rootPath } from "./path.utils";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "profile") {
            cb(null, rootPath + "/public/uploads/profiles");
        } else if (file.fieldname === "studies") {
            cb(null, rootPath + "/public/uploads/studies");
        } else {
            cb(null, rootPath + "/public/uploads/others");
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileUploader = multer({ storage });

export default fileUploader;
