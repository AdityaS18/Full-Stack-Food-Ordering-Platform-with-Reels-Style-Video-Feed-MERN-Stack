const foodModel = require('../models/fooditem.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require("uuid");

// Create Food Item (Food Partner Only)
async function createFood(req, res) {
    try {
        // Check if video file is provided
        if (!req.file) {
            return res.status(400).json({ message: "Video file is required" });
        }

        // Upload video to ImageKit
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

        // Create food item in database
        const foodItem = await foodModel.create({
            name: req.body.name || "Food item",
            video: fileUploadResult.url,  // Store the uploaded video URL
            description: req.body.description || "",
            foodPartner: req.foodPartner._id
        });

        // Return success response
        res.status(201).json({
            message: "Food item created successfully",
            foodItem
        });

    } catch (err) {
        console.error("Error creating food item:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createFood
};
