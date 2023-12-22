'use strict';
const {
    Model, NOW
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Domain extends Model {
        static associate(models) {
            // define association here
        }
    }
    Domain.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            domain: DataTypes.STRING,
            description: DataTypes.STRING(1000),
            parent_domain: DataTypes.STRING,
            created_by: DataTypes.STRING,
            is_deleted: DataTypes.BOOLEAN,
            created_at: {
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            modelName: 'domains',
            schema: 'search_admin',
            createdAt: false,
            updatedAt: false
        });
    return Domain;
};