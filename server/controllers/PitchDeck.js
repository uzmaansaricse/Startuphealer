// pitchDeckController.js
import PitchDeck from "../models/PitchDeck.js";
import User from "../models/User.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import mongoose from "mongoose";

// Create pitch deck
export const createPitch = async (req, res) => {
  try {
    console.log("=== CREATE PITCH REQUEST ===");
    console.log("Body:", req.body);
    console.log("File:", req.files);
    console.log("User:", req.user);

    // ✅ FIX 1: Destructure body fields correctly
    const {
      startUpName,
      Tagline,
      sector,
      business,
      location,
      state,
      website,
      linkedIn,
      instagram,
      name,
      designation,
      teamName,
      teamDesignation,
    } = req.body;

    // ✅ FIX 2: Validate required text fields
    if (!startUpName || !startUpName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Startup name is required",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Founder name is required",
      });
    }

    // ✅ FIX 3: Get logo from correct file field
    // Check if file exists before accessing
    if (!req.files) {
      console.log("File not present in request");
      return res.status(400).json({
        success: false,
        message: "Logo image is required",
      });
    }

    const logoFile = req.files.logo; 

    console.log("Logo file details:", {
      filename: logoFile.filename,
      mimetype: logoFile.mimetype,
      size: logoFile.size,
      fieldname: logoFile.fieldname,
    });

    // ✅ FIX 4: Get user ID correctly
    const userId = req.user.id || req.user._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    // ✅ FIX 5: Validate user exists
    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ FIX 6: Upload image to Cloudinary
    // Pass the entire file object from multer
    const logoImage = await uploadImageToCloudinary(
      logoFile,
      process.env.FOLDER_NAME || "PitchDeck",
      1000,
      1000
    );

    if (!logoImage || !logoImage.secure_url) {
      console.error("Cloudinary upload response:", logoImage);
      return res.status(400).json({
        success: false,
        message: "Failed to upload logo image to cloud storage",
      });
    }

    console.log("Logo uploaded successfully:", logoImage.secure_url);

    // ✅ FIX 7: Create pitch deck with all required fields
    const pitch = await PitchDeck.create({
      startUpName: startUpName.trim(),
      Tagline: Tagline || "",
      sector: sector || "",
      business: business || "",
      location: location || "",
      state: state || "",
      website: website || "",
      linkedIn: linkedIn || "",
      instagram: instagram || "",
      name: name.trim(),
      designation: designation || "",
      teamName: teamName || "",
      teamDesignation: teamDesignation || "",
      logo: logoImage.secure_url,
    });

    console.log("Pitch deck created:", pitch._id);

    // ✅ FIX 8: Add pitch ID to user's pitchDecks array
    userDetails.pitchDecks.push(pitch._id);
    await userDetails.save();

    console.log("User updated with new pitch deck");

    return res.status(201).json({
      success: true,
      message: "Pitch deck created successfully",
      data: {
        pitch: pitch,
        userId: userId,
      },
    });
  } catch (error) {
    console.error("Error creating pitch deck:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while creating the pitch deck",
      error: error.message,
    });
  }
};

// Get all pitch decks for a user
export const getUserPitchDecks = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("pitchDecks");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pitch decks retrieved successfully",
      pitchDecks: user.pitchDecks,
    });
  } catch (error) {
    console.error("Error fetching pitch decks:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching pitch decks",
      error: error.message,
    });
  }
};

// Get single pitch deck
export const getPitchDeckById = async (req, res) => {
  try {
    const { pitchId } = req.params;

    // Validate if pitchId is valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(pitchId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pitch deck ID",
      });
    }

    const pitch = await PitchDeck.findById(pitchId);

    if (!pitch) {
      return res.status(404).json({
        success: false,
        message: "Pitch deck not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pitch deck retrieved successfully",
      pitch,
    });
  } catch (error) {
    console.error("Error fetching pitch deck:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching pitch deck",
      error: error.message,
    });
  }
};

// Update pitch deck
export const updatePitchDeck = async (req, res) => {
  try {
    const { pitchId } = req.params;
    const userId = req.user.id;
    const updates = req.body;

    // Validate pitch ID
    if (!mongoose.Types.ObjectId.isValid(pitchId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pitch deck ID",
      });
    }

    // Check if pitch exists
    const pitch = await PitchDeck.findById(pitchId);
    if (!pitch) {
      return res.status(404).json({
        success: false,
        message: "Pitch deck not found",
      });
    }

    // Check if user owns this pitch
    const user = await User.findById(userId);
    if (!user.pitchDecks.includes(pitchId)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this pitch deck",
      });
    }

    // Handle logo upload if new logo provided
    if (req.file) {
      const logoImage = await uploadImageToCloudinary(
        req.file,
        process.env.FOLDER_NAME,
        1000,
        1000
      );
      updates.logo = logoImage.secure_url;
    }

    const updatedPitch = await PitchDeck.findByIdAndUpdate(
      pitchId,
      updates,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Pitch deck updated successfully",
      pitch: updatedPitch,
    });
  } catch (error) {
    console.error("Error updating pitch deck:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating pitch deck",
      error: error.message,
    });
  }
};

// Delete pitch deck
export const deletePitchDeck = async (req, res) => {
  try {
    const { pitchId } = req.params;
    const userId = req.user.id;

    // Validate pitch ID
    if (!mongoose.Types.ObjectId.isValid(pitchId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pitch deck ID",
      });
    }

    // Check if pitch exists
    const pitch = await PitchDeck.findById(pitchId);
    if (!pitch) {
      return res.status(404).json({
        success: false,
        message: "Pitch deck not found",
      });
    }

    // Check if user owns this pitch
    const user = await User.findById(userId);
    if (!user.pitchDecks.includes(pitchId)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this pitch deck",
      });
    }

    // Delete pitch deck
    await PitchDeck.findByIdAndDelete(pitchId);

    // Remove from user's pitchDecks array
    user.pitchDecks = user.pitchDecks.filter(
      (id) => id.toString() !== pitchId
    );
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Pitch deck deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting pitch deck:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting pitch deck",
      error: error.message,
    });
  }
};
