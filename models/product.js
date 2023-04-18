import { Model, DataTypes } from 'sequelize';

('use strict');
class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
          },
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            notEmpty: true,
            isFloat: true,
            min: 0.01,
          },
        },
        inventory: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
          validate: {
            isInt: true,
            min: 0,
          },
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
      }
    );
  }
}

export default Product;
