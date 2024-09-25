require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('./config.js')[process.env.NODE_ENV || 'development'];
console.log(">>>>config: ", config)
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  charset: 'utf8mb4',  // Đảm bảo sử dụng UTF-8
  collate: 'utf8mb4_unicode_ci',  // Thứ tự sắp xếp dựa trên UTF-8
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
module.exports = sequelize;
