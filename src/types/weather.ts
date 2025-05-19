export type WeatherInfo = {
  label: string;
  value: string;
  colorClass: string;
  valueTextClass: string;
};

export type WeatherMainCard = {
  temperature: number;
  location: string;
  date: string;
};

export type HourlyForecast = {
  time: string;
  icon: string;
  temperature: string;
};

export type ForecastItem = {
  icon: string;
  temp: number;
  rainRate?: number;
};

export type WeeklyForecast = {
  date: string;
  weekday: string;
  am: ForecastItem;
  pm: ForecastItem;
};
