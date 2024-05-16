// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import livrerouter from './routes/livrerouter.js';
// import clientrouter from './routes/clientrouter.js';
// import empruntrouter from './routes/empruntrouter.js';

// dotenv.config();

// const app = express();
// app.use(express.json());

// const port = process.env.PORT || 3000;

// mongoose
//   .connect(process.env.URL_MONGO, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//   });

// // Routes
// app.use('/api/v1/livre', livrerouter);
// app.use('/api/v1/client', clientrouter);
// app.use('/api/v1/emprunt', empruntrouter);
