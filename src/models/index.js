import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const DB_URL=process.env.DB_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

export default mongoose