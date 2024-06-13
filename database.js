const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const dbName = 'employee';
    const mongoURL = `mongodb://localhost:27017/${dbName}`;
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    await mongoose.connect(mongoURL, mongoOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
};

module.exports = connectToDatabase;
