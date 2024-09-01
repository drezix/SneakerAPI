const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;

try{
  connect = () => {
    mongoose.connect(
    `mongodb+srv://${dbuser}:${dbpassword}@back-end.wd27k.mongodb.net/?retryWrites=true&w=majority&appName=Back-End`
  );
  console.log('Connected to the database');
  }
} catch (error) {
  console.log('Error connecting to the database', error);
}
  
  mongoose.connection.on('error', err => {
    logError(err);
  });

connect();

module.exports = mongoose;