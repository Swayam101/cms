import multer from "multer";

const whitelist = ["text/csv"];

const diskStorageGenerator = (savePath: string) => {
  return multer.diskStorage({
    destination: savePath,
    filename: (_req, file, cb) => {
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    },
  });
};

const uploaderGenerator = (storage: multer.StorageEngine) => {
  return multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024,
    },
    fileFilter: (_req, file, cb) => {
      if (!whitelist.includes(file.mimetype)) {
        return cb(new Error("Unsupported File Format"));
      }
      cb(null, true);
    },
  });
};

const customerDataDiskStorage = diskStorageGenerator("./uploads/bulk-holiday");
const uploadCustomerData = uploaderGenerator(customerDataDiskStorage);

export default uploadCustomerData.single("file");
