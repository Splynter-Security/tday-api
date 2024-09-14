const express = require('express');
const router = express.Router();
const { createLightbulb, updateLightbulb, getLightbulb, deleteLightbulb, deleteAllLightbulbs, getAllLightbulbs } = require('../controllers/lightbulbController');

// Routes
router.post('/', createLightbulb);         // Create a lightbulb
router.put('/', updateLightbulb);          // Update lightbulb status
router.get('/:name', getLightbulb);        // Get lightbulb status by name
router.delete('/', deleteLightbulb);       // Delete a lightbulb
router.delete('/delete-all', deleteAllLightbulbs); // Delete all lightbulbs
router.get('/', getAllLightbulbs);  // Route to get all lightbulbs


module.exports = router;
