import type { HourlyForecast } from "../types/weather";

export default function HourlyForecastCard(props: HourlyForecast) {
  const { hour, condition, temperature } = props;

  return (
    <div className="flex flex-col items-center w-[48px] gap-2">
      <img src={condition} alt="weather condition" className="w-10 h-10" />
      <span className="text-[12px] text-[#A4A4A4]">{hour}</span>
      <span className="text-[12px] text-[#292E2E] ">{temperature}</span>
    </div>
  );
}
