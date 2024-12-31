import multer from "multer";

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
export const upload = multer({ storage });
