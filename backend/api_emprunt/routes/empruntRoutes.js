// import express from 'express';
// const routes = express.Router();

// // Import the Emprunt model
// import Emprunt from '../models/Emprunt.js';

// // POST - Add a new emprunt
// routes.post('/', async (req, res) => {
//   try {
//     const { livreId, clientId } = req.body;
//     // Here, you would typically verify if the livreId and clientId are valid
//     // and perform necessary checks before proceeding with the emprunt

//     // Assuming you have validated the livreId and clientId, create a new Emprunt
//     const newEmprunt = new Emprunt({ livre: livreId, client: clientId });
//     await newEmprunt.save();
//     res.status(201).json(newEmprunt);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // POST - Return a livre (mark an emprunt as returned)
// routes.post('/return', async (req, res) => {
//   try {
//     const { empruntId } = req.body;
//     const emprunt = await Emprunt.findById(empruntId);
//     if (!emprunt) {
//       return res.status(404).json({ error: 'Emprunt not found' });
//     }
//     // Mark the emprunt as returned by updating the dateRetour field
//     emprunt.dateRetour = new Date();
//     await emprunt.save();
//     res.status(200).json(emprunt);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // GET - Retrieve all emprunts of a specific client
// routes.get('/:idClient', async (req, res) => {
//   try {
//     const emprunts = await Emprunt.find({ client: req.params.idClient });
//     res.status(200).json(emprunts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// export default router;
