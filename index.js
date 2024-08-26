const express = require('express');
const connectDB = require('./config/db');
const schoolRoutes = require('./routes/schoolRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/schools', schoolRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
