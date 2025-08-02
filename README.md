# 📦 Courier Parcel Management System

A role-based parcel booking and delivery tracking platform with map integration and PDF/CSV reporting.

## 🧩 Project Overview

This system supports three user roles with separate dashboards and permissions:

- 👤 **Customer**
  - Register/login to the platform
  - Book new parcels
  - View personal booking list
  - Track parcel on map (pickup to destination)
  
- 🚚 **Agent**
  - Login to view assigned parcels
  - Update parcel delivery status
  - See optimized delivery route on map

- 🛠️ **Admin**
  - Login to view dashboard
  - View user and booking lists
  - Assign parcels to agents
  - Generate PDF and CSV reports

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS, React Leaflet
- **Backend**: Express.js, MongoDB, Mongoose
- **Authentication**: JWT (token-based)
- **Map Integration**: Leaflet + Routing Machine
- **PDF/CSV Export**: PDFKit, json2csv


