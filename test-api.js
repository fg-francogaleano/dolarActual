// test-api.js
// Ejecutar con: node test-api.js

const BASE_URL = 'http://localhost:3000/api/news';

// Colores para la consola (para que sea legible)
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m'
};

async function checkEndpoint(endpoint, name) {
    console.log(`\n${colors.yellow}--- Testeando: ${name} ---${colors.reset}`);
    const url = `${BASE_URL}/${endpoint}`;
    
    try {
        const start = performance.now();
        const response = await fetch(url);
        const duration = (performance.now() - start).toFixed(2);

        if (!response.ok) {
            throw new Error(`Status ${response.status}`);
        }

        const json = await response.json();
        
        // Dependiendo de cómo devolviste el JSON en el route.ts (array directo o objeto wrapper)
        // En mi propuesta anterior usamos { count: ..., data: [...] } para /all
        // Si decidiste devolver array directo, ajusta aquí.
        const newsList = json.data || json; 

        console.log(`${colors.green}✅ Status 200 OK (${duration}ms)${colors.reset}`);
        console.log(`📊 Cantidad de noticias: ${newsList.length}`);

        if (newsList.length > 0) {
            // Validamos el primer elemento
            const item = newsList[0];
            console.log(`🔍 Inspección del primer elemento:`);
            console.log(JSON.stringify(item, null, 2));

            // Chequeo de campos obligatorios
            const missingFields = [];
            ['title', 'link', 'pubDate', 'description', 'creator'].forEach(field => {
                if (!item.hasOwnProperty(field)) missingFields.push(field);
            });

            if (missingFields.length > 0) {
                console.log(`${colors.red}❌ Faltan campos obligatorios: ${missingFields.join(', ')}${colors.reset}`);
            } else {
                console.log(`${colors.green}✅ Estructura de datos correcta.${colors.reset}`);
            }

            // Chequeo específico de fuentes difíciles
            const creators = [...new Set(newsList.map(n => n.creator))];
            console.log(`\n📰 Medios detectados en este endpoint: ${creators.join(', ')}`);
        } else {
            console.log(`${colors.red}⚠️  El array de noticias está vacío. Revisa los filtros o la conexión.${colors.reset}`);
        }

    } catch (error) {
        console.log(`${colors.red}❌ Error fatal conectando a ${url}: ${error.message}${colors.reset}`);
    }
}

async function runTests() {
    // 1. Probar todas las noticias
    await checkEndpoint('all', 'TODAS LAS NOTICIAS');

    // 2. Probar filtro de categoría (Ej: Economia)
    await checkEndpoint('economia', 'FILTRO CATEGORIA: ECONOMIA');
}

runTests();