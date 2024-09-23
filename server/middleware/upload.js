import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

// Initialize multer with the storage engine
const upload = multer({ storage });

export default upload;