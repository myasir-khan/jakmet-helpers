'use strict';
const {
    Model, NOW
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Zone extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Zone.init(
        {
            zone: DataTypes.STRING,
            is_available: DataTypes.BOOLEAN
        },
        {
            sequelize,
            modelName: 'zones',
            schema: 'search_admin',
            createdAt: false,
            updatedAt: false
        });
    return Zone;
};