// routes/parcels.js
const express = require('express');
const router = express.Router();
const { bookParcel, getMyParcels, getParcelById } = require('../controllers/parcelController');
const authMiddleware = require('../middleware/auth');

router.get('/booking/history', authMiddleware, getMyParcels);
router.get('/single/booking/history/:id', authMiddleware, getParcelById);
router.post('/book', authMiddleware, bookParcel);

module.exports = router;
