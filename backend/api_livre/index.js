import express from 'express';
import mongoose from 'mongoose';
import livre from './routes/livreRoute.js';

const port = process.env.port;
const url_mongoose = process.env.url_mongoose;
const app = express();

app.use(express.json());

mongoose
  .connect(url_mongoose)
  .then(() => {
    console.log('Connected to mongo');
  })
  .catch((err) => {
    console.log('Unable to connect to mongo : ' + err);
  });

app.use('/livre/api/v1/livre', livre);

app.listen(port, (err) => {
  if (err) console.log('Unable to start server :' + err);
  else console.log('Server started at ' + port);
});
