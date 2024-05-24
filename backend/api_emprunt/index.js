import express from 'express';
import mongoose from 'mongoose';
// import livrerouter from './routes/livrerouter.js';
// import clientrouter from './routes/clientrouter.js';
import empruntrouter from './routes/empruntRoutes.js';

const app = express();
app.use(express.json());

const port = process.env.port;
const url_mongoose = process.env.url_mongoose;

mongoose
  .connect(url_mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api/v1/livre', livrerouter);
app.use('/api/v1/client', clientrouter);
app.use('/api/v1/emprunt', empruntrouter);

app.listen(port, (err) => {
  if (err) console.log('Unable to start server');
  else console.log('server started at' + err);
});
