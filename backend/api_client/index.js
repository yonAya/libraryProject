import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/clientRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.url_mongoose)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use('/api/v1/client', routes);

app.listen(process.env.port, (err) => {
  if (err) console.log('Unable to start server');
  else console.log('server started at 3000');
});
