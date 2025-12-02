import mongoose, { Schema, model, models } from "mongoose";

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true, unique: true },
    pubDate: { type: Date, required: true, index: true },
    description: { type: String },
    creator: { type: String, required: true, index: true },
    image: { type: String },
    category: { type: String, index: true },
    source: { type: String },
    favicon: { type: String }, // NUEVO CAMPO EN SCHEMA
    searchableText: { type: String },
  },
  {
    timestamps: true,
  }
);

NewsSchema.index({
  title: "text",
  description: "text",
  searchableText: "text",
});

// NUEVO ÍNDICE TTL: 1296000 segundos = 15 Días
// MongoDB borrará documentos donde 'pubDate' sea más viejo de 15 días.
NewsSchema.index({ pubDate: 1 }, { expireAfterSeconds: 259200 });

// Lógica de desarrollo para recargar modelo
if (process.env.NODE_ENV === "development" && models.News) {
  delete models.News;
}

const News = models.News || model("News", NewsSchema);

export default News;

// import mongoose, { Schema, model, models } from 'mongoose';

// const NewsSchema = new Schema({
//   title: { type: String, required: true },
//   link: { type: String, required: true, unique: true }, // Clave única para evitar duplicados
//   pubDate: { type: Date, required: true, index: true }, // Indexado para ordenar rápido
//   description: { type: String },
//   creator: { type: String, required: true, index: true }, // Indexado para filtrar por medio
//   image: { type: String },
//   category: { type: String, index: true }, // Categoría normalizada (ej: 'economia')
//   // Campo especial para búsqueda de texto completo
//   searchableText: { type: String }
// }, {
//   timestamps: true
// });

// // Índice compuesto de texto para búsquedas ultra-rápidas (reemplaza tu .filter() en memoria)
// NewsSchema.index({ title: 'text', description: 'text', searchableText: 'text' });

// const News = models.News || model('News', NewsSchema);

// export default News
