import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config({});

const URI = process.env.MONGODB_URI;

const connectToDB = async () => {
  try {
    const db = await mongoose.connect(URI);
    console.log('Connected to Database');
    return db;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const disconnectFromDB = () => {
  return mongoose.connection.close();
};

// export them
export { connectToDB, disconnectFromDB };
