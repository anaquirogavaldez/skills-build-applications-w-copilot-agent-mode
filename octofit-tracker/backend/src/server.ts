import express from 'express';
import dotenv from 'dotenv';
import './config/database';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
