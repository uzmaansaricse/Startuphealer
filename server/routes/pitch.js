// routes/pitchDeckRoutes.js
import express from "express";
const router = express.Router();

// Import middleware
import { auth } from "../middleware/auth.js";

// Import all controllers
import {
  createPitch,
  getUserPitchDecks,
  getPitchDeckById,
  updatePitchDeck,
  deletePitchDeck,
} from "../controllers/PitchDeck.js";

// ============================================
// CREATE ROUTES
// ============================================

// Create a new pitch deck
// POST /api/pitch/createPitch
// Body: startUpName, Tagline, sector, business, location, state, website, linkedIn, instagram, name, designation, teamName, teamDesignation
// File: logo (image)
router.post("/createPitch", auth, createPitch);

// ============================================
// READ ROUTES
// ============================================

// Get all pitch decks for authenticated user
// GET /api/pitch/myPitchDecks
router.get("/myPitchDecks", auth, getUserPitchDecks);

// Get single pitch deck by ID
// GET /api/pitch/:pitchId
router.get("/:pitchId", auth, getPitchDeckById);

// ============================================
// UPDATE ROUTES
// ============================================

// Update pitch deck by ID
// PUT /api/pitch/:pitchId
// Body: Any fields to update (startUpName, Tagline, sector, etc.)
// File: logo (optional)
router.put("/:pitchId", auth, updatePitchDeck);

// ============================================
// DELETE ROUTES
// ============================================

// Delete pitch deck by ID
// DELETE /api/pitch/:pitchId
router.delete("/:pitchId", auth, deletePitchDeck);

// Export the router
export default router;
