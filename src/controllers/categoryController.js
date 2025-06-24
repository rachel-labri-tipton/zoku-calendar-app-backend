const { Category, TimeLog } = require('../../models');

const categoryController = {
  // Get all categories for a user
  async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll({
        where: { userId: req.userId },
        include: [{
          model: TimeLog,
          as: 'timeLogs',
          attributes: ['id', 'startTime', 'endTime', 'duration']
        }]
      });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new category
  async createCategory(req, res) {
    try {
      const category = await Category.create({
        ...req.body,
        userId: req.userId
      });
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update category
  async updateCategory(req, res) {
    try {
      const category = await Category.findOne({
        where: { 
          id: req.params.id,
          userId: req.userId 
        }
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      await category.update(req.body);
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete category
  async deleteCategory(req, res) {
    try {
      const category = await Category.findOne({
        where: { 
          id: req.params.id,
          userId: req.userId 
        }
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      if (category.isDefault) {
        return res.status(400).json({ error: 'Cannot delete default categories' });
      }

      await category.destroy();
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get category progress
  async getCategoryProgress(req, res) {
    try {
      const { id } = req.params;
      const { timeframe } = req.query; // 'weekly', 'monthly', or 'total'
      
      const category = await Category.findOne({
        where: { 
          id,
          userId: req.userId 
        }
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      const now = new Date();
      let startDate;

      switch(timeframe) {
        case 'weekly':
          startDate = new Date(now.setDate(now.getDate() - now.getDay()));
          break;
        case 'monthly':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        default:
          startDate = new Date(0); // Beginning of time for total
      }

      const timeLogs = await TimeLog.findAll({
        where: {
          categoryId: id,
          startTime: {
            [Op.gte]: startDate
          },
          endTime: {
            [Op.not]: null
          }
        },
        attributes: ['duration']
      });

      const totalHours = timeLogs.reduce((sum, log) => 
        sum + (log.duration || 0), 0) / 3600; // Convert seconds to hours

      const goal = timeframe === 'weekly' ? category.weeklyGoal : 
                   timeframe === 'monthly' ? category.monthlyGoal :
                   category.goalHours;

      const progress = {
        categoryId: id,
        categoryName: category.name,
        timeframe,
        hoursLogged: parseFloat(totalHours.toFixed(2)),
        goalHours: goal,
        percentComplete: goal ? parseFloat(((totalHours / goal) * 100).toFixed(2)) : null,
        remainingHours: goal ? parseFloat((goal - totalHours).toFixed(2)) : null
      };

      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update category goals
  async updateCategoryGoals(req, res) {
    try {
      const { id } = req.params;
      const { weeklyGoal, monthlyGoal, goalHours } = req.body;

      const category = await Category.findOne({
        where: { 
          id,
          userId: req.userId 
        }
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      await category.update({
        weeklyGoal: weeklyGoal >= 0 ? weeklyGoal : category.weeklyGoal,
        monthlyGoal: monthlyGoal >= 0 ? monthlyGoal : category.monthlyGoal,
        goalHours: goalHours >= 0 ? goalHours : category.goalHours
      });

      res.json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all category progress
  async getAllCategoryProgress(req, res) {
    try {
      const categories = await Category.findAll({
        where: { userId: req.userId },
        include: [{
          model: TimeLog,
          as: 'timeLogs',
          where: {
            startTime: {
              [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 7))
            },
            endTime: {
              [Op.not]: null
            }
          },
          required: false
        }]
      });

      const progress = categories.map(category => {
        const totalHours = category.timeLogs.reduce((sum, log) => 
          sum + (log.duration || 0), 0) / 3600;

        return {
          categoryId: category.id,
          categoryName: category.name,
          weeklyGoal: category.weeklyGoal,
          hoursLogged: parseFloat(totalHours.toFixed(2)),
          percentComplete: category.weeklyGoal ? 
            parseFloat(((totalHours / category.weeklyGoal) * 100).toFixed(2)) : null,
          remainingHours: category.weeklyGoal ? 
            parseFloat((category.weeklyGoal - totalHours).toFixed(2)) : null
        };
      });

      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};


module.exports = categoryController;