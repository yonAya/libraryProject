import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default model('Client', clientSchema);
