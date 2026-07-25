const Lead = require('../models/leadModel');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_BUDGETS = ['< $1k', '$1k - $5k', '$5k - $20k', '$20k+', ''];
const VALID_STATUSES = ['new', 'contacted', 'closed'];

const createLead = async (req, res) => {
  const { name, email, budget, message } = req.body;
  try {
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (name.trim().length > 100) {
      return res.status(400).json({ message: 'Name is too long' });
    }
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ message: 'A valid email is required' });
    }
    if (budget && !VALID_BUDGETS.includes(budget)) {
      return res.status(400).json({ message: 'Invalid budget range' });
    }
    if (message && message.length > 2000) {
      return res.status(400).json({ message: 'Message is too long' });
    }

    const lead = new Lead({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      budget: budget || '',
      message: message ? message.trim() : '',
    });
    await lead.save();

    res.status(201).json(lead);
  } catch (error) {
    console.error('Error in createLead controller:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getLeads = async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = {};

    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [{ name: regex }, { email: regex }];
    }
    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ message: 'Invalid status filter' });
      }
      filter.status = status;
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error('Error in getLeads controller:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateLeadStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Status must be new, contacted, or closed' });
    }

    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json(lead);
  } catch (error) {
    console.error('Error in updateLeadStatus controller:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createLead, getLeads, updateLeadStatus };