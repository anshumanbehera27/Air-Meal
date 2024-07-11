import foodModel from "../models/food.js";
import fs from 'fs';
import path from 'path';

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error('Error fetching food list:', error);
        res.status(500).json({ success: false, message: "Error fetching food list" });
    }
};

// Add a new food item
const addFood = async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const imageFilename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imageFilename,
        });

        await food.save();
        res.status(201).json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error('Error adding food:', error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};

// Remove a food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete image file
        fs.unlink(path.join('uploads', food.image), (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.error('Error removing food:', error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};

export { listFood, addFood, removeFood };
