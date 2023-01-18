import multer from "multer";
import mime from "mime";

import { randomUUID } from "node:crypto";

export const generatePhotoFilename = (mimeType: string) => {
    const randomFilename = `${randomUUID()}-${Date.now()}`;
    const fileExtension = mime.getExtension(mimeType);
    const filename = `${randomFilename}.${fileExtension}`;

    return filename;
}

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (request, file, callback) => {
        return callback(null, generatePhotoFilename(file.mimetype));
    }
})

const MAX_SIZE_IN_MEGABYTE = 6 * 1024 * 1024;

const VALIDE_MIME_TYPE = ["image/jpeg", "image/png"]

const fileFilter: multer.Options["fileFilter"] = (request, file, callback) => {
    if (VALIDE_MIME_TYPE.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("Error: The uploaded file must be a JPG or a PNG image"))
    }
}

export const multerOptions = {
    fileFilter,
    limits: {
        fileSize: MAX_SIZE_IN_MEGABYTE
    }
};

export const initMulterMiddleware = () => {
    return multer({ storage, ...multerOptions });
}
