const express = require('express');
const { getUsers, getAllBooking, getSingleBooking, assignParcel } = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/allUser', authMiddleware, getUsers);
router.get('/allBooking', authMiddleware, getAllBooking);
router.get('/singleBooking/:id', authMiddleware, getSingleBooking);
router.patch('/:parcelId/assignAgent', authMiddleware, assignParcel);

module.exports = router;