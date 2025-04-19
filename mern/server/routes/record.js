import express from 'express';

import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Route to get all records
router.get('/', async (req, res) => {
  try {
    const records = await db.collection('records').find({}).toArray();
    res.json(records).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await db.collection('records').findOne({ _id: ObjectId(req.params.id) });
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(record).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new record
router.post('/', async (req, res) => {
  try {
    const newRecord = req.body;
    const result = await db.collection('records').insertOne(newRecord);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding record' });
  }
});

// Route to update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRecord = req.body;
    const result = await db.collection('records').findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { $set: updatedRecord },
      { returnOriginal: false }
    );
    if (!result.value) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(result.value).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating record' });
  }
});

// Route to delete a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.collection('records').deleteOne({ _id: ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting record' });
  }
});

export default router;