const { Settings } = require('../../models');

const settingsController = {
  async getSettings(req, res) {
    try {
      const settings = await Settings.findOne({
        where: { userId: req.userId }
      });
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateSettings(req, res) {
    try {
      const [settings] = await Settings.findOrCreate({
        where: { userId: req.userId },
        defaults: {
          theme: 'light',
          notifications: true,
          language: 'en',
          timezone: 'UTC',
          startOfWeek: 0
        }
      });

      await settings.update(req.body);
      res.json(settings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = settingsController;