import express from 'express';
import amqp from 'amqplib';
import Emprunt from '../models/Emprunt.js';

const routes = express.Router();

var connection, channel;
const qLivreS = process.env.q1;
const qNotif = process.env.q3;

const connectRabbitMQ = async () => {
  const ch = process.env.url_rabbit;
  connection = await amqp.connect(ch);
  channel = await connection.createChannel();
  channel.assertQueue(qLivreS);
  channel.assertQueue(qNotif);
};

connectRabbitMQ().then(() => {
  console.log('Connected to rabbit');
});

// POST - Add a new emprunt
routes.post('/', async (req, res) => {
  try {
    const { livreId, clientId } = req.body;
    // Assuming you have validated the livreId and clientId, create a new Emprunt
    const newEmprunt = new Emprunt({ livre: livreId, client: clientId });
    await newEmprunt.save();

    //si en ajoute une emprunt on doit supprimer le livre
    channel.sendToQueue(qLivreS, Buffer.from(JSON.stringify(livreId)));

    res.status(201).json(newEmprunt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST - Return a livre (mark an emprunt as returned)
routes.post('/return', async (req, res) => {
  try {
    const { empruntId } = req.body;
    const emprunt = await Emprunt.findById(empruntId);
    if (!emprunt) {
      return res.status(404).json({ error: 'Emprunt not found' });
    }
    // Mark the emprunt as returned by updating the dateRetour field
    emprunt.dateRetour = new Date();
    await emprunt.save();

    //si le client retourne le livre on notife les client
    channel.sendToQueue(qNotif, Buffer.from(JSON.stringify(emprunt.livre)));

    res.status(200).json(emprunt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET - Retrieve all emprunts of a specific client
routes.get('/:idClient', async (req, res) => {
  try {
    const emprunts = await Emprunt.find({ client: req.params.idClient });
    res.status(200).json(emprunts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default routes;
