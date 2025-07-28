// controllers/parcelController.js
const Parcel = require('../models/parcel');

const bookParcel = async (req, res) => {
  try {
    const {
      pickupAddress,
      pickupLocation,
      deliveryAddress,
      deliveryLocation,
      parcelType,
      paymentType
    } = req.body || {};
     if (
      !pickupAddress ||
      !pickupLocation?.lat ||
      !pickupLocation?.lng ||
      !deliveryAddress ||
      !deliveryLocation?.lat ||
      !deliveryLocation?.lng ||
      !parcelType ||
      !paymentType
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missing: {
          pickupAddress: !!pickupAddress,
          pickupLocation: pickupLocation?.lat && pickupLocation?.lng,
          deliveryAddress: !!deliveryAddress,
          deliveryLocation: deliveryLocation?.lat && deliveryLocation?.lng,
          parcelType: !!parcelType,
          paymentType: !!paymentType
        }
      });
    }

    const customerId = req.user.id; // from JWT middleware

    const parcel = await Parcel.create({
      customer: customerId,
      pickupAddress,
      pickupLocation,
      deliveryAddress,
      deliveryLocation,
      parcelType,
      paymentType
    });

    res.status(201).json({ success: true, parcel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Parcel booking failed' });
  }
};
const getMyParcels = async (req, res) => {
  try {
    const customerId = req.user.id; // from auth middleware

    const parcels = await Parcel.find({ customer: customerId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, parcels });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};

module.exports = { bookParcel, getMyParcels };
