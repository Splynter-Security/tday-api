const { getLightbulbByName, createLightbulb, updateLightbulbStatus, deleteLightbulb, deleteAllLightbulbs, getAllLightbulbs } = require('../models/lightbulbModel');

// POST: Create a new lightbulb
exports.createLightbulb = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required to create a lightbulb.' });
  }
  try {
    await createLightbulb(name);
    res.status(201).json({ message: `Lightbulb '${name}' created successfully.` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT: Update lightbulb status (on/off)
exports.updateLightbulb = async (req, res) => {
  const { name, status } = req.body;

  // Validate input
  if (!name || !status) {
    return res.status(400).json({ error: 'Name and status ("on" or "off") are required to update the lightbulb.' });
  }

  // Convert "on"/"off" to boolean true/false
  let statusBoolean;
  if (status === 'on') {
    statusBoolean = true;
  } else if (status === 'off') {
    statusBoolean = false;
  } else {
    return res.status(400).json({ error: 'Status must be either "on" or "off".' });
  }

  try {
    // Log the request data
    console.log(`Updating lightbulb '${name}' to status: ${statusBoolean}`);

    // Update the lightbulb status in the database
    await updateLightbulbStatus(name, statusBoolean);

    res.status(200).json({ message: 'Lightbulb status updated successfully.' });
  } catch (error) {
    // Log the actual error
    console.error('Error while updating lightbulb:', error);
    res.status(500).json({ error: 'An error occurred while updating the lightbulb status.' });
  }
};

// GET: Get the status of a lightbulb
exports.getLightbulb = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ error: 'Name is required to get the status of the lightbulb.' });
  }
  try {
    const bulb = await getLightbulbByName(name);
    res.status(200).json({ name: bulb.name, status: bulb.status ? 'on' : 'off' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// DELETE: Delete a lightbulb
exports.deleteLightbulb = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required to delete a lightbulb.' });
  }
  try {
    await deleteLightbulb(name);
    res.status(200).json({ message: `Lightbulb '${name}' deleted successfully.` });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// DELETE: Delete all lightbulbs
exports.deleteAllLightbulbs = async (req, res) => {
    try {
      await deleteAllLightbulbs();
      res.status(200).json({ message: 'All lightbulbs deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting all lightbulbs.' });
    }
  };

  // Controller for fetching all lightbulbs
exports.getAllLightbulbs = async (req, res) => {
  try {
    const lightbulbs = await getAllLightbulbs();
    
    // Log lightbulbs before conversion
    console.log('Fetched lightbulbs from DB:', lightbulbs);
    
    // Map the result to convert boolean status to 'on'/'off'
    const lightbulbsWithStatus = lightbulbs.map(bulb => ({
      ...bulb,
      // Convert boolean status to 'on'/'off', and handle null or undefined values
      status: bulb.status === true ? 'on' : bulb.status === false ? 'off' : 'unknown'
    }));
    
    // Log the transformed lightbulbs
    console.log('Transformed lightbulbs:', lightbulbsWithStatus);

    res.status(200).json(lightbulbsWithStatus);  // Send the modified response
  } catch (error) {
    console.error('Error in getAllLightbulbs:', error);
    res.status(500).json({ error: 'An error occurred while fetching lightbulbs.' });
  }
};
