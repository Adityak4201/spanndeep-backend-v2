require("dotenv").config();
const mongoose = require("mongoose");
const { Sequelize } = require('sequelize');//mysql orm sequelize

//setting up mysql connection
const sequelize = new Sequelize(process.env.DB_MYSQL_NAME, process.env.DB_MYSQL_USER, process.env.DB_MYSQL_PASSWORD, {
  host: process.env.DB_MYSQL_HOST,
  dialect: 'mysql'
});
//function to check mysql connection
const checkConnection=async ()=>{
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
checkConnection()



const connectMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to Database 🌱"));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = { connectMongoDB,sequelize };
