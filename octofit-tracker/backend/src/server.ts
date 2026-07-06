import express from 'express';
import dotenv from 'dotenv';
import './config/database';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', apiRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
