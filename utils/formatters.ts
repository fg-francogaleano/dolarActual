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

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";

  // Día
  const day = date.getDate().toString().padStart(2, "0");

  // Mes abreviado
  let month = new Intl.DateTimeFormat("es-AR", {
    month: "short",
  })
    .format(date)
    .replace(".", "");

  month = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

  // Hora HH:mm
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} - ${hours}:${minutes} hs`;
};
