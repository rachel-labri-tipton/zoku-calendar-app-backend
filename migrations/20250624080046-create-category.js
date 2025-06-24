'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      goalHours: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      weeklyGoal: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      monthlyGoal: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
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

    await queryInterface.addIndex('Categories', ['userId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};
