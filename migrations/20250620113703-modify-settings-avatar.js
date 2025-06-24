'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // First try to add the column
      await queryInterface.addColumn('Settings', 'avatar', {
        type: Sequelize.STRING,
        allowNull: true
      });
    } catch (error) {
      // Column might already exist, proceed to modify it
      console.log('Column might already exist, proceeding to modify');
    }

    // Then modify the column
    await queryInterface.changeColumn('Settings', 'avatar', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    try {
      // Restore previous state
      await queryInterface.changeColumn('Settings', 'avatar', {
        type: Sequelize.STRING,
        defaultValue: '/avatars/default.png'
      });
    } catch (error) {
      // If column doesn't exist, just remove it
      await queryInterface.removeColumn('Settings', 'avatar');
    }
  }
};