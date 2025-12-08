export function getArgentinaDate(): string {
  // Retorna YYYY-MM-DD en hora Argentina, sin importar si el server es UTC
  return new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/Argentina/Buenos_Aires'
  });
}