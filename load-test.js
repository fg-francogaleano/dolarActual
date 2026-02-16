// Asegúrate de haber ejecutado: npm install --save-dev autocannon
const autocannon = require('autocannon');

// Obtener URL desde argumentos de consola o usar localhost por defecto
const targetUrl = process.argv[2] || 'http://localhost:3000/api/quotes'; 

console.log(`🚀 Iniciando prueba de carga contra: ${targetUrl}`);
console.log('⏳ Duración: 10s | 👥 Conexiones: 50\n');

const instance = autocannon({
  url: targetUrl,
  connections: 50, // Simula 50 usuarios concurrentes
  duration: 10,    // Duración en segundos
  pipelining: 1,   // 1 petición por conexión a la vez (realista para navegadores)
}, finishedBench);

autocannon.track(instance, { renderProgressBar: true });

function finishedBench(err, res) {
  if (err) {
    console.error('❌ Error ejecutando el benchmark:', err);
    return;
  }
  
  console.log('\n✅ Prueba finalizada. Resultados:');
  console.log('------------------------------------------------');
  console.log(`Objetivo:          ${targetUrl}`);
  console.log(`Total Requests:    ${res.requests.total}`);
  console.log(`Total Errors:      ${res.errors}`);
  console.log(`Latencia Promedio: ${res.latency.average} ms`);
  console.log(`Rendimiento:       ${(res.throughput.average / 1024).toFixed(2)} KB/s`);
  console.log('------------------------------------------------');

  if (res.errors > 0 || res.timeouts > 0) {
    console.warn('⚠️  ¡ALERTA! Se detectaron errores o timeouts. La base de datos podría estar saturada.');
  } else {
    console.log('🌟 Sistema estable bajo carga simulada.');
  }
}