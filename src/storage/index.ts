import multer, {Multer, StorageEngine} from "multer";

const storage: StorageEngine = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "src\\uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
})

const upload: Multer = multer({storage});

export default upload