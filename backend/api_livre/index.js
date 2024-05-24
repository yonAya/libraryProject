import express from 'express';
import mongoose from 'mongoose';
import livre from './routes/livreRoute.js';
import cors from 'cors'
const port = process.env.port;
const url_mongoose = process.env.url_mongoose;
const app = express();

app.use(express.json());
app.use(cors({origin : ['http://localhost:3000'],credentials : true}))
mongoose
  .connect('mongodb://127.0.0.1:27017/dbclients')
  .then(() => {
    console.log('Connected to mongo');
  })
  .catch((err) => {
    console.log('Unable to connect to mongo : ' + err);
  });

app.use('/api/v1/livre', livre);

app.listen( 3001, (err) => {
  if (err) console.log('Unable to start server :' + err);
  else console.log('Server started at ' + port);
});
