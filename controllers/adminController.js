const Parcel = require("../models/parcel");
const User = require("../models/user");
const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find({}, "-password"); // exclude password field
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const getAllBooking = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const parcels = await Parcel.find({}, "-password").sort({ createdAt: -1 });
    res.json({ success: true, parcels });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const getSingleBooking = async (req, res) => {
  try {
    const parcelId = req.params.id;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find parcel by ID
    const parcel = await Parcel.findById(parcelId)
      .populate("assignedAgent", "name phone")
      .populate("customer", "name phone");

    if (!parcel) {
      return res
        .status(404)
        .json({ success: false, message: "Parcel not found" });
    }
    res.json({ success: true, parcel });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const assignParcel = async (req, res) => {
  try {
    const io = req.app.get("io");
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const { parcelId } = req.params;
    const { agentId } = req.body;

    // Validate agent exists and has role 'Delivery Agent'
    const agent = await User.findById(agentId);
    if (!agent || agent.role !== "agent") {
      return res.status(400).json({ message: "Invalid agent" });
    }
    // Find parcel and check if already assigned
    const existingParcel = await Parcel.findById(parcelId);
    if (!existingParcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    if (existingParcel.assignedAgent) {
      return res
        .status(400)
        .json({ message: "Parcel already assigned to an agent" });
    }
    // Assign agent to parcel
    const parcel = await Parcel.findByIdAndUpdate(
      parcelId,
      {
        assignedAgent: agentId,
        status: "Assigned",
      },
      { new: true }
    ).populate("assignedAgent", "name phone email");

    if (!parcel) {
      return res
        .status(404)
        .json({ success: false, message: "Parcel not found" });
    }
    io.emit("statusUpdated", {
      parcelId,
      status: parcel?.status,
    });

    res.json({ success: true, message: "Agent assigned successfully", parcel });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const getAgents = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find({ role: "agent" }, "-password"); // exclude password field
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const getDashboardMetrics = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // 1. Daily Bookings (booked today)
    const dailyBookings = await Parcel.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    // 2. Failed Deliveries (status === "failed")
    const failedDeliveries = await Parcel.countDocuments({ status: "Failed" });

    // 3. Total COD Amounts for today (created today and has COD)
    const codResult = await Parcel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay },
          paymentType: "COD", // Assuming you store this way
        },
      },
      {
        $group: {
          _id: null,
          totalCOD: { $sum: "$price" },
        },
      },
    ]);

    const totalCODAmount = codResult[0]?.totalCOD || 0;

    res.json({
      dailyBookings,
      failedDeliveries,
      totalCODAmount,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getUsers,
  getAllBooking,
  getSingleBooking,
  assignParcel,
  getAgents,
  getDashboardMetrics
};
