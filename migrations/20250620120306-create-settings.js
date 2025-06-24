'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Settings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      theme: {
        type: Sequelize.STRING,
        defaultValue: 'light'
      },
      notifications: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      language: {
        type: Sequelize.STRING,
        defaultValue: 'en'
      },
      timezone: {
        type: Sequelize.STRING,
        defaultValue: 'UTC'
      },
      startOfWeek: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Settings');
  }
};