import { Schema, model } from 'mongoose';

const livreSchema = new Schema({
    code: {
      type: String,
      required: true
    },
    titre: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    auteur: {
      type: String
    }
  });

export default model('Livre', livreSchema);
