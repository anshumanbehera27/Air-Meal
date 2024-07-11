import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import path from 'path';

// Create a router instance
const foodRouter = express.Router();

// Image Storage Engine (Saving Image to uploads folder & rename it)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure the uploads directory exists
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        // Use a timestamp and original filename to ensure uniqueness
        const fileExtension = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, fileExtension);
        cb(null, `${Date.now()}-${baseName}${fileExtension}`);
    }
});

const upload = multer({ storage: storage });

// List all food items
foodRouter.get('/list', listFood);

// Add a new food item with file upload
foodRouter.post('/add', upload.single('image'), addFood);

// how to assess the image 
// Remove a food item
foodRouter.delete('/remove', removeFood); // Changed to DELETE for RESTful approach

export default foodRouter;
