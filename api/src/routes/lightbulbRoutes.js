const express = require('express');
const router = express.Router();
const { createLightbulb, updateLightbulb, getLightbulb, deleteLightbulb, deleteAllLightbulbs } = require('../controllers/lightbulbController');

// Routes
router.post('/', createLightbulb);                          // Create a lightbulb
router.get('/:id?', getLightbulb);                          // Get lightbulb status by ID (or all lightbulbs if no ID)
router.put('/:id', updateLightbulb);                        // Update lightbulb status by ID
router.delete('/delete-all', deleteAllLightbulbs);          // Delete all lightbulbs
router.delete('/:id', deleteLightbulb);                     // Delete a lightbulb by ID


module.exports = router;
