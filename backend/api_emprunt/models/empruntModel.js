import { Schema, model } from 'mongoose';

const empruntSchema = new Schema({
  livre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Livre',
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  dateEmprunt: {
    type: Date,
    default: Date.now,
  },
  dateRetour: {
    type: Date,
    default: null,
  },
});

export default model('Emprunt', empruntSchema);
