import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/clientRoutes.js';

const app = express();
const url_mongoose = process.env.url_mongoose;
const port = process.env.port;

app.use(express.json());
app.use(cors());

mongoose
  .connect(url_mongoose)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use('/api/v1/client', routes);

app.listen(port, (err) => {
  if (err) console.log('Unable to start server');
  else console.log('server started at' + err);
});
