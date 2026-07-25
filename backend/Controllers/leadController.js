const Lead = require('../models/leadModel');

const createLead = async (req, res) => {
  const { name, email, budget, message } = req.body;
  try {
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const lead = new Lead({ name, email, budget, message });
    await lead.save();

    res.status(201).json(lead);
  } catch (error) {
    console.error('Error in createLead controller:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error('Error in getLeads controller:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createLead, getLeads };
