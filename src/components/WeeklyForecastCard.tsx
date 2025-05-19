import type { WeeklyForecast } from "../types/weather";

export default function WeeklyForecastCard(props: WeeklyForecast) {
  const { date, weekday, am, pm } = props;

  return (
    <div className="flex flex-col items-center text-center  shrink-0">
      <div className="flex flex-row justify-center gap-4">
        {/* AM */}
        <div className="flex flex-col items-center py-2 gap-3  max-w-[60px]">
          <img src={am.icon} alt="오전 아이콘" className="w-[60px] h-[60px]" />
          {am.rainRate !== undefined && (
            <div className="text-[20px] font-bold text-[#CCE8FF]">
              {am.rainRate}%
            </div>
          )}
          <span className="text-[16px] font-bold text-[#292E2E]">오전</span>
          <span className="text-[16px] font-bold text-[#32A1FF]">
            {am.temp}°
          </span>
        </div>

        {/* PM */}
        <div className="flex flex-col items-center py-2 gap-3">
          <img src={pm.icon} alt="오후 아이콘" className="w-[60px] h-[60px]" />
          {pm.rainRate !== undefined && (
            <div className="text-[20px] font-bold text-[#CCE8FF]">
              {pm.rainRate}%
            </div>
          )}
          <span className="text-[16px] font-bold text-[#292E2E]">오후</span>
          <span className="text-[16px] font-bold text-red-500">{pm.temp}°</span>
        </div>
      </div>

      <div className="text-[16px] font-medium text-[#292E2E] leading-tight">
        {weekday}
        <br />
        {date}
      </div>
    </div>
  );
}
