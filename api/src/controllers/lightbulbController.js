const { getLightbulbById, createLightbulb, updateLightbulbById, deleteLightbulbById, getAllLightbulbs, deleteAllLightbulbs } = require('../models/lightbulbModel');

// POST: Create a new lightbulb
exports.createLightbulb = async (req, res) => {
  const { name } = req.body;
  const owner = req.headers['x-user-sub'] || null;  // Fetch owner from headers, or null if not provided

  if (!name) {
    return res.status(400).json({ error: 'Name is required to create a lightbulb.' });
  }

  try {
    const createdLightbulb = await createLightbulb(name, owner);
    res.status(201).json({
      message: `Lightbulb '${name}' created successfully.`,
      id: createdLightbulb.id  // Return the created lightbulb's ID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET: Get the status of a lightbulb by ID, or all lightbulbs if no ID is provided
exports.getLightbulb = async (req, res) => {
  console.log('Request Headers:', req.headers);
  const { id } = req.params;

  if (!id) {
    // No ID provided, return all lightbulbs
    try {
      const lightbulbs = await getAllLightbulbs();
      const lightbulbsWithStatus = lightbulbs.map(bulb => ({
        ...bulb,
        status: bulb.status === true ? 'on' : bulb.status === false ? 'off' : 'unknown'
      }));
      return res.status(200).json(lightbulbsWithStatus);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while fetching lightbulbs.' });
    }
  }

  // Fetch lightbulb by ID
  try {
    const bulb = await getLightbulbById(id);
    if (!bulb) {
      return res.status(404).json({ error: 'Lightbulb not found.' });
    }
    return res.status(200).json({ id: bulb.id, name: bulb.name, status: bulb.status ? 'on' : 'off', owner: bulb.owner });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching the lightbulb.' });
  }
};

// PUT: Update lightbulb status by ID
exports.updateLightbulb = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const owner = req.headers['x-user-sub'] || null;  // Fetch owner from headers, or null if not provided

  if (!id || !status) {
    return res.status(400).json({ error: 'ID and status ("on" or "off") are required to update the lightbulb.' });
  }

  let statusBoolean;
  if (status === 'on') {
    statusBoolean = true;
  } else if (status === 'off') {
    statusBoolean = false;
  } else {
    return res.status(400).json({ error: 'Status must be either "on" or "off".' });
  }

  try {
    const updated = await updateLightbulbById(id, statusBoolean, owner);
    if (!updated) {
      return res.status(404).json({ error: `Lightbulb with ID ${id} not found or you do not have permission.` });
    }
    return res.status(200).json({ message: `Lightbulb with ID ${id} updated successfully.` });
  } catch (error) {
    return res.status(403).json({ error: 'You are not authorized to update this lightbulb.' });
  }
};

// DELETE: Delete a lightbulb by ID
exports.deleteLightbulb = async (req, res) => {
  const { id } = req.params;
  const owner = req.headers['x-user-sub'] || null;  // Fetch owner from headers, or null if not provided

  if (!id) {
    return res.status(400).json({ error: 'ID is required to delete a lightbulb.' });
  }

  try {
    const deleted = await deleteLightbulbById(id, owner);
    if (!deleted) {
      return res.status(404).json({ error: `Lightbulb with ID ${id} not found or you do not have permission.` });
    }
    return res.status(200).json({ message: `Lightbulb with ID ${id} deleted successfully.` });
  } catch (error) {
    return res.status(403).json({ error: 'You are not authorized to delete this lightbulb.' });
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
