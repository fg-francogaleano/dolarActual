import mongoose, { Schema, model, models } from 'mongoose';

const NewsSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true, unique: true }, // Clave única para evitar duplicados
  pubDate: { type: Date, required: true, index: true }, // Indexado para ordenar rápido
  description: { type: String },
  creator: { type: String, required: true, index: true }, // Indexado para filtrar por medio
  image: { type: String },
  category: { type: String, index: true }, // Categoría normalizada (ej: 'economia')
  // Campo especial para búsqueda de texto completo
  searchableText: { type: String } 
}, { 
  timestamps: true 
});

// Índice compuesto de texto para búsquedas ultra-rápidas (reemplaza tu .filter() en memoria)
NewsSchema.index({ title: 'text', description: 'text', searchableText: 'text' });

const News = models.News || model('News', NewsSchema);

export default News