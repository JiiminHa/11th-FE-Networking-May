export const getWeatherIconPath = (
  condition: string,
  hourStr: string
): string => {
  const hour = parseInt(hourStr.replace("시", ""), 10);
  const isNight = hour < 6 || hour >= 18;

  // 한글 → 코드 매핑
  const conditionMap: Record<string, string> = {
    맑음: "sun",
    "구름 조금": "sun-cloud",
    "구름 많음": "cloud",
    흐림: "cloud",
    비: "rain",
    소나기: "rain",
    눈: "snow",
    이슬비: "rain",
    천둥번개: "rain",
    황사: "cloud",
    연기: "cloud",
    정보없음: "cloud",
  };

  const code = conditionMap[condition] || "cloud";

  const base = isNight ? "Moon" : ""; // 야간이면 Moon 접두사

  switch (code) {
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
