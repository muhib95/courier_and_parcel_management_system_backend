// app.js
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const parcelRoutes = require('./routes/parcel');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req,res)=>{
res.send('Server is running');
 });
app.use('/api/auth', authRoutes);
app.use('/api/parcels', parcelRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app; // Export the app instance
