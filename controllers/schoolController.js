const School = require('../models/School');
const { calculateDistance } = require('../utils/distanceCalculator');

// Add School
exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude == null || longitude == null) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newSchool = new School({ name, address, latitude, longitude });
        await newSchool.save();
        res.status(201).json({ message: 'School added successfully', school: newSchool });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// List Schools
exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (latitude == null || longitude == null) {
        return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }

    try {
        const schools = await School.find();
        const sortedSchools = schools.map(school => {
            const distance = calculateDistance(
                latitude, longitude, 
                school.latitude, school.longitude
            );
            return { ...school._doc, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
