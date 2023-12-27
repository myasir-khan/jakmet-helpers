'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes, schema) => {
    class Configuration extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Configuration.init(
        {
            config_id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            user_id: DataTypes.STRING,
            category: DataTypes.STRING,
            openai_key: DataTypes.STRING,
            ai_model: DataTypes.STRING,
            price_class: DataTypes.STRING,
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            modelName: `${schema}_configuration`,
            tableName: 'configuration',
            schema,
            createdAt: false,
            updatedAt: false
        });
    return Configuration;
};
