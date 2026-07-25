const express = require('express');
const { createLead, getLeads } = require('../Controllers/leadController');
const { protectRoute } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', createLead);          // public: form submission
router.get('/', protectRoute, getLeads); // admin only: view leads

module.exports = router;
