const express = require('express');
const router = express.Router();
const { Event } = require('../../models');
const auth = require('../middleware/auth.middleware');

// Create Event
router.post('/', async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      userId: req.userId
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all events for current user
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { userId: req.userId },
      order: [['startDate', 'ASC']]
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { 
        id: req.params.id,
        userId: req.userId
      }
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update event
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { 
        id: req.params.id,
        userId: req.userId
      }
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await event.update(req.body);
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { 
        id: req.params.id,
        userId: req.userId
      }
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await event.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;