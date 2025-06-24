const { TimeLog, Category, Todo, TodoList, Event } = require('../../models');
const { Op } = require('sequelize');

const timeLogController = {
  // Start time tracking
  async startTimeLog(req, res) {
    try {
      const { type, todoId, todoListId, eventId, categoryId, notes } = req.body;
      
      const timeLog = await TimeLog.create({
        startTime: new Date(),
        type,
        todoId,
        todoListId,
        eventId,
        categoryId,
        notes,
        userId: req.userId
      });

      res.status(201).json(timeLog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Stop time tracking
  async stopTimeLog(req, res) {
    try {
      const timeLog = await TimeLog.findOne({
        where: { 
          id: req.params.id,
          userId: req.userId,
          endTime: null
        }
      });

      if (!timeLog) {
        return res.status(404).json({ error: 'Active time log not found' });
      }

      timeLog.endTime = new Date();
      await timeLog.save();
      
      res.json(timeLog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get daily summary
  async getDailySummary(req, res) {
    try {
      const date = new Date(req.query.date);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      const timeLogs = await TimeLog.findAll({
        where: {
          userId: req.userId,
          startTime: {
            [Op.between]: [startOfDay, endOfDay]
          }
        },
        include: [
          { model: Category, as: 'category' },
          { model: Todo, as: 'todo' },
          { model: TodoList, as: 'todoList' },
          { model: Event, as: 'event' }
        ]
      });

      const summary = {
        totalTime: 0,
        byCategory: {},
        timeLogs
      };

      timeLogs.forEach(log => {
        if (log.duration) {
          summary.totalTime += log.duration;
          if (log.category) {
            summary.byCategory[log.category.name] = 
              (summary.byCategory[log.category.name] || 0) + log.duration;
          }
        }
      });

      res.json(summary);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete time log
  async deleteTimeLog(req, res) {
    try {
      const timeLog = await TimeLog.findOne({
        where: { 
          id: req.params.id,
          userId: req.userId 
        }
      });

      if (!timeLog) {
        return res.status(404).json({ error: 'Time log not found' });
      }

      await timeLog.destroy();
      res.json({ message: 'Time log deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = timeLogController;