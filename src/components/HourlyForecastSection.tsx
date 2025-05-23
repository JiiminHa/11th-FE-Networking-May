import { useEffect, useState } from "react";
import api from "../api/axios";
import type { HourlyForecast } from "../types/weather";
import { getWeatherIconPath } from "../utils/weatherIcon";
export default function HourlyForecastSection({
  locationId,
}: {
  locationId: number;
}) {
  const [hourlyData, setHourlyData] = useState<HourlyForecast[]>([]);

  useEffect(() => {
    const fetchHourlyData = async () => {
      try {
        const res = await api.get(
          `/weather/hourly-status?locationId=${locationId}`
        );
        setHourlyData(res.data.results);
      } catch (err) {
        console.error("시간별 날씨 정보 불러오기 실패:", err);
      }
    };

    fetchHourlyData();
  }, [locationId]);

  return (
    <section className="w-full max-w-[1328px] bg-white rounded-[16px] border border-[#F2F2F2] shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-6">
      <h3 className="text-[20px] font-bold">시간별 현황</h3>

      {/* 시간별 카드 리스트 */}
      <div className="relative flex justify-between w-full px-6 py-3">
        {hourlyData.map((item) => (
          <div
            key={item.hour}
            className="flex flex-col items-center gap-2 w-[48px] z-10"
          >
            <div className="w-2 h-2 bg-[#d6d6d6] rounded-full" />
            {/* 선 (가로선) */}
            <div className="absolute top-[16px] left-[24px] right-[22px] h-[2px] bg-[#d6d6d6] z-0" />
            <img
              src={`/icons/${getWeatherIconPath(item.condition, item.hour)}`}
              alt={item.condition}
            />
            <span className="text-xs text-[#A4A4A4]">{item.hour}</span>
            <span className="text-xs text-[#292E2E]">
              {Math.round(item.temperature)}°
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
