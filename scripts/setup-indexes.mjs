import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// 1. Cargar variables de entorno manualmente
// (Next.js las carga automático, pero este script corre fuera de Next)
const loadEnv = () => {
  const envLocal = path.resolve(process.cwd(), '.env.local');
  const env = path.resolve(process.cwd(), '.env');

  if (fs.existsSync(envLocal)) {
    dotenv.config({ path: envLocal });
    console.log('📂 Cargado .env.local');
  } else if (fs.existsSync(env)) {
    dotenv.config({ path: env });
    console.log('📂 Cargado .env');
  } else {
    console.warn('⚠️ No se encontró archivo .env. Asegúrate de tener MONGODB_URI seteada.');
  }
};

loadEnv();

const uri = process.env.MONGODB_URI;

async function run() {
  if (!uri) {
    console.error('❌ Error: MONGODB_URI no está definida.');
    process.exit(1);
  }

  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(uri);
    console.log('✅ Conectado.');

    const db = mongoose.connection.db;
    const collection = db.collection('news'); // Nombre de tu colección en minúscula/plural

    // --- PASO A: LIMPIEZA (OPCIONAL) ---
    // Intentamos borrar índices viejos para evitar conflictos de nombres
    try {
      // Listar índices actuales para ver qué hay
      const indexes = await collection.indexes();
      const indexNames = indexes.map(i => i.name).filter(n => n !== '_id_');
      
      if (indexNames.length > 0) {
        console.log(`🧹 Eliminando índices antiguos: ${indexNames.join(', ')}...`);
        // Borramos todos menos el _id por defecto
        await collection.dropIndexes(); 
        console.log('✨ Colección limpia de índices custom.');
      }
    } catch (e) {
      console.log('ℹ️ La colección parece nueva o no tenía índices.');
    }

    // --- PASO B: CREAR ÍNDICE DE TEXTO (SEARCH) ---
    console.log('⚙️ Creando índice de Texto (Smart Search)...');
    await collection.createIndex(
      { 
        title: "text", 
        searchableText: "text" 
      },
      { 
        weights: { title: 10, searchableText: 1 }, // Título vale 10x más
        name: "NewsTextIndex",
        default_language: "spanish"
      }
    );

    // --- PASO C: CREAR ÍNDICE COMPUESTO (FILTROS) ---
    console.log('⚙️ Creando índice Compuesto (Fecha + Categoría)...');
    await collection.createIndex(
      { pubDate: -1, category: 1 },
      { name: "DateCategoryIndex" }
    );

    // --- PASO D: CREAR ÍNDICE ÚNICO (INTEGRIDAD) ---
    // Para que el ingest-service sea rápido al hacer upsert por link
    console.log('⚙️ Creando índice Único para Links...');
    await collection.createIndex(
      { link: 1 },
      { unique: true, name: "UniqueLinkIndex" }
    );

    console.log('🚀 ¡Misión cumplida! Índices optimizados correctamente.');

  } catch (error) {
    console.error('❌ Error fatal:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Desconectado.');
  }
}

run();