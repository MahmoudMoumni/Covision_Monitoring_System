const env = require('./env.js');
const Process= require('../models/process.js');
const Notification= require('../models/notification.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username , env.password, {
  host:env.host,
  port:env.port ,
  dialect: env.dialect,
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
  
});
 
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Process =Process(sequelize, Sequelize);
db.Notification =Notification(sequelize, Sequelize);


module.exports = db;