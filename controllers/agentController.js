const Parcel = require("../models/parcel");

const assignParcel = async (req, res) => {
  try {
    if (req.user.role !== "agent") {
      return res.status(403).json({ message: "Access denied" });
    }
    const agentId = req.user.id;

   const parcels = await Parcel.find({ assignedAgent: agentId })
         .sort({ createdAt: -1 });
   
       res.status(200).json({ success: true, parcels });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports ={assignParcel};