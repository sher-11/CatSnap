import multer from 'multer';
import * as path from 'path';

const upload = multer({ dest: "../../public/uploads" })

// const storage = multer.diskStorage({
//   destination: "../../public/uploads",
//   filename(req: any, file: any, cb: any) {
//     cb(
//       undefined,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// var upload = multer({ storage : storage}).single('fileUpload');

export { upload };
