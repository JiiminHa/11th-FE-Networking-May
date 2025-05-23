export const getWeatherIconPath = (
  condition: string,
  hourStr: string
): string => {
  const hour = parseInt(hourStr.replace("시", ""), 10);
  const isNight = hour < 6 || hour >= 18;

  const base = isNight ? "Moon" : ""; // 야간이면 Moon 접두사

  switch (condition) {
    case "sun":
      return `${base ? base : "Sun"}.svg`;
    case "sun-cloud":
    case "cloud":
      return `${base}Clouds.svg`;
    case "rain":
      return `${base}Rain.svg`;
    case "snow":
      return `${base}Snow.svg`;
    default:
      return "Clouds.svg"; // fallback
  }
};
