'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('image_labels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time_stamp: {
        type: Sequelize.DATE
      },
      file_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.FLOAT
      },
      input_uri: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('image_labels');
  }
};