
import express from 'express';
import BookModel from '../models/livreLivre';

const routes = express.Router();

routes.get('/api/v1/livre/:idLivre', async (req, res) => {
    const { idLivre } = req.params;
    try {
        const livre = await BookModel.findById(idLivre);
        if (livre) {
            res.status(200).json(livre);
        } else {
            res.status(404).json({ message: "Livre non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

routes.post('/api/v1/livre', async (req, res) => {
    const nouveauLivre = req.body;
    try {
        const livre = await BookModel.create(nouveauLivre);
        res.status(201).json(livre);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

routes.put('/api/v1/livre/:idLivre', async (req, res) => {
    const { idLivre } = req.params;
    const donneesLivreModifie = req.body;
    try {
        const livreModifie = await BookModel.findByIdAndUpdate(idLivre, donneesLivreModifie, { new: true });
        if (livreModifie) {
            res.status(200).json(livreModifie);
        } else {
            res.status(404).json({ message: "Livre non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

routes.delete('/api/v1/livre/:idLivre', async (req, res) => {
    const { idLivre } = req.params;
    try {
        const livreSupprime = await BookModel.findByIdAndDelete(idLivre);
        if (livreSupprime) {
            res.status(200).json(livreSupprime);
        } else {
            res.status(404).json({ message: "Livre non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

export default routes;

