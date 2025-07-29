const Parcel = require('../models/parcel');
const User = require('../models/user');
const getUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const users = await User.find({}, '-password'); // exclude password field
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
const getAllBooking = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
const parcels = await Parcel.find({}, '-password');
    res.json({ success: true, parcels });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
const getSingleBooking = async (req, res) => {
  try {
    const parcelId = req.params.id;
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
      // Find parcel by ID
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
      return res.status(404).json({ success: false, message: 'Parcel not found' });
    }
    res.json({ success: true, parcel });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = {getUsers, getAllBooking, getSingleBooking};