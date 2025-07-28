// routes/parcels.js
const express = require('express');
const router = express.Router();
const { bookParcel, getMyParcels } = require('../controllers/parcelController');
const authMiddleware = require('../middleware/auth');

router.get('/booking/history', authMiddleware, getMyParcels);
router.post('/book', authMiddleware, bookParcel);

module.exports = router;
