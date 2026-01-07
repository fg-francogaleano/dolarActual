import { NewsItem } from "@/lib/rss-config"; // Asegúrate de tener este tipo definido o impórtalo de rss-config

export class NewsDistributor {
  private allNews: NewsItem[];
  private globalUsedIds: Set<string>; // Para evitar duplicados entre componentes (GridA vs GridB)

  constructor(allNews: NewsItem[]) {
    this.allNews = allNews;
    this.globalUsedIds = new Set<string>();
  }

  /**
   * Obtiene una selección de noticias garantizando diversidad de medios
   * y deduplicación global.
   * * @param category Categoría a filtrar ('economia', 'politica', etc. o 'all')
   * @param count Cantidad de noticias requeridas
   * @returns Array de noticias seleccionadas
   */
  public getSelection(category: string, count: number): NewsItem[] {
    // 1. Filtrar candidatos iniciales (por categoría y no usados previamente)
    // Ordenamos por fecha para priorizar lo nuevo
    let candidates = this.allNews.filter(
      (n) => 
        (category === 'all' || n.category === category) && 
        !this.globalUsedIds.has(n.link)
    );

    // 2. Agrupar candidatos por Medio (Source)
    // Estructura: { "Clarin": [News1, News2], "Infobae": [News3] }
    const newsBySource: Record<string, NewsItem[]> = {};
    candidates.forEach((n) => {
      if (!newsBySource[n.source]) {
        newsBySource[n.source] = [];
      }
      newsBySource[n.source].push(n);
    });

    // 3. Obtener lista de medios disponibles para rotar
    let availableSources = Object.keys(newsBySource);
    
    // Opcional: Mezclar los medios para que no siempre empiece el mismo (ej: siempre Clarin primero)
    // availableSources = availableSources.sort(() => Math.random() - 0.5);

    const selection: NewsItem[] = [];
    let sourceIndex = 0;

    // 4. Algoritmo Round Robin (Turnos)
    // Mientras necesitemos noticias y queden medios con noticias...
    while (selection.length < count && availableSources.length > 0) {
      // Obtener el medio actual en la rotación
      const currentSource = availableSources[sourceIndex];
      const sourceNewsList = newsBySource[currentSource];

      if (sourceNewsList && sourceNewsList.length > 0) {
        // Tomar la primera noticia disponible de este medio
        const selectedNews = sourceNewsList.shift()!; // .shift() extrae el primer elemento
        
        selection.push(selectedNews);
        this.globalUsedIds.add(selectedNews.link); // MARCAR COMO USADA GLOBALMENTE
      } else {
        // Si este medio se quedó sin noticias, lo sacamos de la rotación para este request
        availableSources.splice(sourceIndex, 1);
        // Ajustamos el índice porque el array se encogió
        sourceIndex--; 
      }

      // Avanzar al siguiente medio (cíclico)
      sourceIndex++;
      if (sourceIndex >= availableSources.length) {
        sourceIndex = 0; // Volver al primer medio
      }
    }

    return selection;
  }
}