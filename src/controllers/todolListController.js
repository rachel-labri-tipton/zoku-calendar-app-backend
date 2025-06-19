const { TodoList } = require('../../models');

const todoListController = {
  // Create empty TodoList
  createEmptyList: async (req, res) => {
    try {
      const { title, description, color } = req.body;
      
      const todoList = await TodoList.create({
        title,
        description,
        color,
        userId: req.userId
      });

      res.status(201).json(todoList);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = todoListController;