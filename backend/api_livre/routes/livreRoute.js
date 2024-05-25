import express from 'express';
import amqp from 'amqplib';
import BookModel from '../models/livreLivre.js';

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

  channel.consume(qLivreS, (data) => {
    const code = data.content.toString();

    BookModel.deleteOne({ code }).then(() => {
      console.log('livre supprimé');
    });
  });
});

routes.get('/livres', async (req, res) => {
  try {
    const livres = await BookModel.find();
    if (livres.length > 0) {
      res.status(200).json(livres);
    } else {
      res.status(404).json({ message: 'Aucun livre trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

routes.get('/:idLivre', async (req, res) => {
  const { idLivre } = req.params;
  try {
    const livre = await BookModel.findById(idLivre);
    if (livre) {
      res.status(200).json(livre);
    } else {
      res.status(404).json({ message: 'Livre non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

routes.post('/', async (req, res) => {
  const nouveauLivre = req.body;
  try {
    const livre = await BookModel.create(nouveauLivre);

    //si on ajoute un nouveau livre en notif les client de ca
    channel.sendToQueue(qNotif, Buffer.from(JSON.stringify(livre)));

    res.status(201).json(livre);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

routes.put('/:idLivre', async (req, res) => {
  const { idLivre } = req.params;
  const donneesLivreModifie = req.body;
  try {
    const livreModifie = await BookModel.findByIdAndUpdate(
      idLivre,
      donneesLivreModifie,
      { new: true }
    );
    if (livreModifie) {
      res.status(200).json(livreModifie);
    } else {
      res.status(404).json({ message: 'Livre non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

routes.delete('/:idLivre', async (req, res) => {
  const { idLivre } = req.params;
  try {
    const livreSupprime = await BookModel.findByIdAndDelete(idLivre);
    if (livreSupprime) {
      res.status(200).json(livreSupprime);
    } else {
      res.status(404).json({ message: 'Livre non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

export default routes;
