// routes/parcels.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { assignParcel } = require('../controllers/agentController');

router.get('/view/assignParcel', authMiddleware, assignParcel);

module.exports = router;
