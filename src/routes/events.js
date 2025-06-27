const express = require('express');
const router = express.Router();
const { Event } = require('../../models');
const auth = require('../middleware/auth.middleware');

router.use(auth);

// Create Event
router.post('/', async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const event = await Event.create({
      ...req.body,
      userId: req.user.id
    });
    
    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const events = await Event.findAll({
      where: { userId: req.user.id },
      order: [['startDate', 'ASC']]
    });
    
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get event by ID
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
    console.error('Get event by ID error:', error);
    res.status(500).json({ error: error.message });
  }
})

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