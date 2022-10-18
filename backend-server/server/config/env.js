const env = {
  database: "monitoring_system",
  username: "root",
  password: "secret",
  host: "mysql-container1",
  dialect: "mysql",
  port:3306,
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
};
 
module.exports = env;
