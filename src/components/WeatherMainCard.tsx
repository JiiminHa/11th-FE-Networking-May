import WeatherInfoCard from "./WeatherInfoCard";
import type { WeatherMainCard } from "../types/weather";

const weatherMainCardData: WeatherMainCard = {
  temperature: 12.2,
  location: "롯데월드",
  date: "4월 26일",
};

export default function WeatherMainCard() {
  const { temperature, location, date } = weatherMainCardData;

  return (
    <section className="w-full max-w-[1328px] bg-white rounded-[16px] border-[1px] border-[#F2F2F2] shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] p-8 flex flex-col gap-[12px]">
      <div>
        <h2 className="text-xl font-bold text-left">
          {date} {location} 날씨 현황
        </h2>
      </div>

      <div className="flex flex-col items-center gap-2.5 p-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
          <p className="text-[80px] font-bold">{temperature}°</p>
        </div>
        <p className="text-xl font-semibold">야간 / 흐림</p>
        <p className="flex items-center gap-[8px] text-base text-[#A4A4A4] font-medium">
          <span>
            체감<span className="text-[#292E2E]">9.0°</span>
          </span>
          <span className="w-[4px] h-[4px] bg-[#A4A4A4] rounded-full" />
          <span>
            습도<span className="text-[#292E2E]">48%</span>
          </span>
          <span className="w-[4px] h-[4px] bg-[#C6C6C6] rounded-full" />
          <span>
            남동풍 <span className="text-[#292E2E]">0.4m/s</span>
          </span>
        </p>
      </div>

      <div className="flex justify-center gap-4 py-3">
        <WeatherInfoCard
          label="미세먼지"
          value="좋음"
          colorClass="bg-blue-100"
          valueTextClass="text-[#32A1FF]"
        />
        <WeatherInfoCard
          label="초미세먼지"
          value="보통"
          colorClass="bg-green-100"
          valueTextClass="text-[#32FF35]"
        />
        <WeatherInfoCard
          label="자외선"
          value="위험"
          colorClass="bg-red-100"
          valueTextClass="text-[#FF3232]"
        />
        <WeatherInfoCard
          label="일출"
          value="05:44"
          colorClass="bg-yellow-100"
          valueTextClass="text-[#FFC532]"
        />
      </div>
    </section>
  );
}
