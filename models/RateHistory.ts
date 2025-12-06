import mongoose, { Schema, model, models } from 'mongoose';

// Esquema para guardar los valores de un día específico
const RateHistorySchema = new Schema({
  date: { type: String, required: true, unique: true, index: true }, // Formato "YYYY-MM-DD"
  rates: { 
    type: Map, 
    of: new Schema({
      compra: Number,
      venta: Number,
      nombre: String
    }, { _id: false })
  }
}, { 
  timestamps: true 
});

// Fix para recarga en desarrollo Next.js
if (process.env.NODE_ENV === 'development' && models.RateHistory) {
  delete models.RateHistory;
}

const RateHistory = models.RateHistory || model('RateHistory', RateHistorySchema);

export default RateHistory