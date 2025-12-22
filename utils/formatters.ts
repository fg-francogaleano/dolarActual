export const formatCurrency = (
  value: number | null | undefined,
  currency: string = "ARS"
): string => {
  if (value === null || value === undefined) return "-";

  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};

export const formatNumber = (
  value: number | null | undefined,
  decimals: number = 2
): string => {
  if (value === null || value === undefined) return "-";

  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatVariation = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "-";

  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "-"; // protección extra

  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatDateShort = (
  dateString: string, 
  isMobile: boolean = false,
  language: "es" | "en" = "es"
): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));

  // Diccionario de textos
  const t = {
    es: {
      nowMobile: "Recién",
      nowDesktop: "Actualizado recién",
      agoMinMobile: (m: number) => `Hace ${m} min`,
      agoMinDesktop: (m: number) => `Actualizado hace ${m} minuto${m !== 1 ? "s" : ""}`,
      agoHourMobile: (h: number) => `Hace ${h} h`,
      agoHourDesktop: (h: number) => `Actualizado hace ${h} hora${h !== 1 ? "s" : ""}`,
      dateDesktopPrefix: "Actualizado el ",
      at: " a las "
    },
    en: {
      nowMobile: "Just now",
      nowDesktop: "Updated just now",
      agoMinMobile: (m: number) => `${m} min ago`,
      agoMinDesktop: (m: number) => `Updated ${m} minute${m !== 1 ? "s" : ""} ago`,
      agoHourMobile: (h: number) => `${h}h ago`,
      agoHourDesktop: (h: number) => `Updated ${h} hour${h !== 1 ? "s" : ""} ago`,
      dateDesktopPrefix: "Updated on ",
      at: " at "
    }
  };

  const texts = t[language];

  // --- RANGO: 0 a 59 segundos ---
  if (seconds < 60) {
    return isMobile ? texts.nowMobile : texts.nowDesktop;
  }

  // --- RANGO: 1 a 59 minutos ---
  if (minutes < 60) {
    if (isMobile) {
      return texts.agoMinMobile(minutes);
    } else {
      return texts.agoMinDesktop(minutes);
    }
  }

  // --- RANGO: 1 a 23 horas ---
  if (hours < 24) {
    if (isMobile) {
      return texts.agoHourMobile(hours);
    } else {
      return texts.agoHourDesktop(hours);
    }
  }

  // --- RANGO: >= 24 horas (Fecha completa) ---
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hh = date.getHours().toString().padStart(2, "0");
  const mm = date.getMinutes().toString().padStart(2, "0");

  if (isMobile) {
    // Formato corto móvil: 16/12 20:57 (Igual para ambos idiomas, universal)
    return `${day}/${month} ${hh}:${mm}`;
  } else {
    // Formato largo desktop
    return `${texts.dateDesktopPrefix}${day}/${month}/${year}${texts.at}${hh}:${mm}`;
  }
};

export const getArgentinaDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' });
};