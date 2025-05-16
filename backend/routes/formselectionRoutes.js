import mongoose from "mongoose";
import express from "express";

const router = express.Router();

// Allowed MongoDB collection names
const allowedCollections = [
  'ivendusers',
  'meatmatrix',
  'vpn',
  'changeofcontrol',
  'domainaccess',
  'internetaccess',
];

// GET /api/forms?collection=collectionName
router.get('/', async (req, res) => {
  const { collection } = req.query;

  if (!collection || !allowedCollections.includes(collection)) {
    return res.status(400).json({ error: 'Invalid or missing collection name.' });
  }

  try {
    const db = mongoose.connection.db;
    const rawData = await db.collection(collection).find({}).toArray();

    const cleanedData = rawData.map(doc => ({
      ...doc,
      _id: doc._id?.toString(),
    }));

    const fieldSet = new Set();
    cleanedData.forEach(doc => {
      Object.keys(doc).forEach(key => fieldSet.add(key));
    });

    const columns = Array.from(fieldSet).filter(k => k !== '__v').sort();

    res.json({ data: cleanedData, columns });
  } catch (err) {
    console.error(`Error fetching from ${collection}:`, err);
    res.status(500).json({ error: 'Server error while fetching data.' });
  }
});


export { router as formselectionRoutes };
