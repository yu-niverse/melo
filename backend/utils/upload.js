import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
})

const s3Storage = multerS3({
  s3: s3,
  bucket: "melo-app",
  acl: "public-read",
});

function checkImageType(file, cb) {
  const fileExts = [".png", ".jpg", ".jpeg"];
  const isAllowedExt = fileExts.includes(
      path.extname(file.originalname.toLowerCase())
  );
  const isAllowedMimeType = file.mimetype.startsWith("image/");
  if (isAllowedExt && isAllowedMimeType) {
      return cb(null, true); // no errors
  } else {
      cb("Error: File type not allowed!");
  }
}

export const uploadImage = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
      checkImageType(file, callback)
  },
  limits: {
      fileSize: 1024 * 1024 * 2, // 2MB
  }
})

export const uploadAudio = multer({
  storage: s3Storage,
  limits: {
      fileSize: 1024 * 1024 * 5, // 5MB
  }
})
