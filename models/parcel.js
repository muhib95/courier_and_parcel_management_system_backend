// models/Parcel.js
const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pickupAddress: { type: String, required: true },
  pickupLocation: {
    lat: Number,
    lng: Number,
  },
  deliveryAddress: { type: String, required: true },
  deliveryLocation: {
    lat: Number,
    lng: Number,
  },
  parcelType: { type: String, enum: ['Small', 'Medium', 'Large'], required: true },
  paymentType: { type: String, enum: ['COD', 'Prepaid'], required: true },
  status: { type: String, enum: ['Booked', 'Assigned', 'Picked Up', 'In Transit', 'Delivered', 'Failed'], default: 'Booked' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Parcel', parcelSchema);
