import type { WeatherInfo } from "../types/weather";

export default function WeatherInfoCard(props: WeatherInfo) {
  const { label, value, colorClass, valueTextClass } = props;

  return (
    <div
      className={`flex flex-col items-center gap-[10px] w-[120px] px-[24px] py-[12px] rounded-[12px] ${colorClass}`}
    >
      <p className="text-[12px] text-[#292E2E] font-medium">{label}</p>
      <p className={`text-base font-bold ${valueTextClass}`}>{value}</p>
    </div>
  );
}
