import { generatePhotoFilename } from './multer'

describe("generatePhotoFilename", () => {
    test.each([
        ["image/png", "png"],
        ["image/jpeg", "jpeg"]
    ])("Generate filename with correct extention when passed mimetype '%s'", (mimeType, expectedFileExtansion) => {
        const fullFilename = generatePhotoFilename(mimeType);
        const [, fileExtension] = fullFilename.split(".");

        expect(fileExtension).toEqual(expectedFileExtansion);
    })
})
