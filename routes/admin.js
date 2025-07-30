const express = require('express');
const { getUsers, getAllBooking, getSingleBooking, assignParcel, getAgents } = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/allUser', authMiddleware, getUsers);
router.get('/allAgent', authMiddleware, getAgents);
router.get('/allBooking', authMiddleware, getAllBooking);
router.get('/singleBooking/:id', authMiddleware, getSingleBooking);
router.patch('/:parcelId/assignAgent', authMiddleware, assignParcel);

module.exports = router;