// routes/parcels.js
const express = require('express');
const router = express.Router();
const { bookParcel } = require('../controllers/parcelController');
const authMiddleware = require('../middleware/auth');

router.post('/book', authMiddleware, bookParcel);

module.exports = router;
