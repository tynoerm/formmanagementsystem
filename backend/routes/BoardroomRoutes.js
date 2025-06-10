import express from 'express';
import Boardroom from'../models/boardroomModel.js'; // Adjust the path as necessary

const router = express.Router();

// Create a new user or update existing user
router.post('/users', async (req, res) => {
  const { username, department } = req.body;
  try {
    const user = await Boardroom.findOneAndUpdate(
      { 'user.username': username },
      { 'user.department': department },
      { new: true, upsert: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error creating/updating user', error: err });
  }
});

// Get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Boardroom.find({}, 'bookings');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err });
  }
});

// Create a new booking
router.post('/bookings', async (req, res) => {
  const { date, time, agenda, invitees, bookedBy } = req.body;
  try {
    const result = await Boardroom.findOneAndUpdate(
      { 'user.username': bookedBy },
      { $push: { bookings: { date, time, agenda, invitees, bookedBy } } },
      { new: true, upsert: true }
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err });
  }
});

// Save meeting minutes
router.post('/minutes', async (req, res) => {
  const { date, minutes, summary, username } = req.body;
  try {
    const result = await Boardroom.findOneAndUpdate(
      { 'user.username': username },
      { $push: { meetingMinutes: { date, minutes, summary } } },
      { new: true, upsert: true }
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error saving meeting minutes', error: err });
  }
});

// Upload board report
router.post('/boardreports', async (req, res) => {
  const { report, username } = req.body; // Assuming report path is sent in the body
  try {
    const result = await Boardroom.findOneAndUpdate(
      { 'user.username': username },
      { $push: { boardReports: { report } } },
      { new: true, upsert: true }
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error uploading board report', error: err });
  }
});

export {router as boardroomRoutes}