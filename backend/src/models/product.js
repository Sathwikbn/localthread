// backend/src/models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  originalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  vendorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  sizes: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  colors: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  ratingAverage: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
  },
  ratingCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  // timestamps (createdAt, updatedAt) are added by default
});

module.exports = { Product };
