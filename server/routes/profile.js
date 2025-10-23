// Import the required modules using ES6 syntax
import express from "express";
const router = express.Router();

// Import middleware
import { auth } from "../middleware/auth.js";

// Import controllers
import {
 
  updateProfile,
 
  updateDisplayPicture,
 
} from "../controllers/profile.js";
import { deleteAccount } from "../controllers/profile.js";
import { getAllUserDetails } from "../controllers/profile.js";

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delete User Account
router.delete("/deleteProfile", auth, deleteAccount);

// Update Profile
router.put("/updateProfile", auth, updateProfile);

// Get User Details
router.get("/getUserDetails", auth, getAllUserDetails);



// Update Display Picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);


// Export the router
export default router;
