import express from 'express';
import amqp from 'amqplib';
import Client from '../models/clientModel.js';

const routes = express.Router();

var connection, channel;
const url_rabbit = process.env.url_rabbit;
const qRequest = process.env.qRequest; // Queue for incoming requests
const qResponse = process.env.qResponse; // Queue for outgoing responses

const connectRabbitMQ = async () => {
  connection = await amqp.connect(url_rabbit);
  channel = await connection.createChannel();
  await channel.assertQueue(qRequest);
  await channel.assertQueue(qResponse);
};

const getClientEmails = async () => {
  const clients = await Client.find({}).select('email').lean();
  return clients.map((client) => client.email);
};

connectRabbitMQ().then(() => {
  console.log('Client service connected to RabbitMQ');

  channel.consume(qRequest, async (msg) => {
    const clientEmails = await getClientEmails();
    channel.sendToQueue(qResponse, Buffer.from(JSON.stringify(clientEmails)));
    channel.ack(msg);
  });
});

// GET - Retrieve information of a specific client by ID
routes.get('/:idClient', async (req, res) => {
  try {
    const client = await Client.findById(req.params.idClient);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST - Add a new client
routes.post('/', async (req, res) => {
  try {
    const { nom, prenom, email } = req.body;
    const newClient = new Client({ nom, prenom, email });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT - Update a client by ID
routes.put('/:idClient', async (req, res) => {
  try {
    const { nom, prenom, email } = req.body;
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.idClient,
      { nom, prenom, email },
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(200).json(updatedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE - Delete a client by ID
routes.delete('/:idClient', async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.idClient);
    if (!deletedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default routes;
