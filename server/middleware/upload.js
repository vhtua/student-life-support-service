import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

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
    const attachments = req.files;
    console.log("Before", attachments.length);
    const generateUniqueFilename = (originalname) => {
      const fileExtension = path.extname(originalname);

      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();
      const currentDate = dd + mm + yyyy;
      const timestamp = Date.now();
      const hash = bcrypt.hashSync(originalname + timestamp, 10);
      return `${currentDate}-${hash.replace(/\//g, '')}${fileExtension}`;
    };

    const uniqueFilename = generateUniqueFilename(file.originalname);
    file.hashedfilename = uniqueFilename; // Add the generated hashed filename to the file object

    cb(null, uniqueFilename);
  },
});

// Initialize multer with the storage engine
const upload = multer({ storage });

export default upload;