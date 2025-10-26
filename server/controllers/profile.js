// Import required modules using ES6 syntax
import Profile from "../models/Profile.js";

import User from "../models/User.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import mongoose from "mongoose";
import { convertSecondsToDuration } from "../utils/secToDuration.js";

// Method for updating a profile
export const updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
    
		
	role,
	coFounderExist,
	coFoundersFirstName ,
	coFoundersLastName ,
  	startUpName,
	state,
	city,
	address,
	industry,
	sector,
	businessDescription,
      contactNumber ,
     
    } = req.body;
    const id = req.user.id;

    // Find the profile by id
    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    });
    await user.save();

    // Update the profile fields
   profile.role=role,
	profile.coFounderExist=coFounderExist,
	profile.coFoundersFirstName=coFoundersFirstName ,
	profile.coFoundersLastName=coFoundersLastName  ,
  	profile.startUpName=startUpName,
	profile.state=state,
	profile.city = city,
	profile.address =address,
	profile.industry=industry,
	profile.sector=sector,
	profile.businessDescription=businessDescription,
    profile.contactNumber = contactNumber;
    

    // Save the updated profile
    await profile.save();

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete account controller
export const deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    const user = await User.findById({ _id: id });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete Associated Profile with the User
    await Profile.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(user.additionalDetails),
    });





    // Now Delete User
    await User.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      success: false, 
      message: "User Cannot be deleted successfully" 
    });
  }
};

// Get all user details
export const getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    
    console.log(userDetails);
    
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update display picture
export const updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    
    console.log(image);
    
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



