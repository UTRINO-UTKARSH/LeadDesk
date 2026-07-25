const express = require('express');
const { createLead, getLeads, updateLeadStatus } = require('../Controllers/leadController');
const { protectRoute } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', createLead);
router.get('/', protectRoute, getLeads);
router.patch('/:id', protectRoute, updateLeadStatus);  // ← this line is the one that matters

module.exports = router;