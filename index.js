import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import AppRouter from './src/routes/index.js'

dotenv.config()
const app = express();

const PORT = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use(AppRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));