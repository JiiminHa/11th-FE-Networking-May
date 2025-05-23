import { useEffect, useState } from "react";
import WeatherInfoCard from "./WeatherInfoCard";
import type { LocationItem } from "../types/location";
import api from "../api/axios";
import { getWeatherIconPath } from "../utils/weatherIcon";

type WeatherMainCardProps = {
  location: LocationItem;
};

type CurrentWeather = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  condition: string;
  time: string;
  sunrise: string;
  airQuality: {
    pm10: string;
    pm2_5: string;
  };
};

export default function WeatherMainCard({ location }: WeatherMainCardProps) {
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await api.get(`/weather/current?locationId=${location.id}`);
        setWeatherData(res.data.results);
      } catch (error) {
        console.error("날씨 정보 가져오기 실패", error);
      }
    };

    fetchWeather();
  }, [location.id]);

  if (!weatherData) {
    return (
      <section className="text-gray-500 text-center py-8">
        날씨 정보를 불러오는 중...
      </section>
    );
  }

  const {
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    windDirection,
    condition,
    sunrise,
    airQuality,
    time,
  } = weatherData;

  const today = new Date();
  const formatted = `${today.getMonth() + 1}월 ${today.getDate()}일`;
  return (
    <section className="w-full max-w-[1328px] bg-white rounded-[16px] border-[1px] border-[#F2F2F2] shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] p-8 flex flex-col gap-[12px]">
      <div>
        <h2 className="text-xl font-bold text-left">
          {formatted} {location.placeName} 날씨 현황
        </h2>
      </div>

      <div className="flex flex-col items-center gap-2.5 p-2.5">
        <div className="flex items-center gap-2.5">
          <img
            src={`/icons/${getWeatherIconPath(condition, time)}`}
            alt={condition}
            className="w-[160px] h-[160px]"
          />
          <p className="text-[80px] font-bold">{temperature}°</p>
        </div>
        <p className="text-xl font-semibold">{condition}</p>
        <p className="flex items-center gap-[8px] text-base text-[#A4A4A4] font-medium">
          <span>
            체감 <span className="text-[#292E2E]">{feelsLike}°</span>
          </span>
          <span className="w-[4px] h-[4px] bg-[#A4A4A4] rounded-full" />
          <span>
            습도 <span className="text-[#292E2E]">{humidity}%</span>
          </span>
          <span className="w-[4px] h-[4px] bg-[#C6C6C6] rounded-full" />
          <span>
            {windDirection}{" "}
            <span className="text-[#292E2E]">{windSpeed}m/s</span>
          </span>
        </p>
      </div>

      <div className="flex justify-center gap-4 py-3">
        <WeatherInfoCard
          label="미세먼지"
          value={airQuality.pm10}
          colorClass="bg-blue-100"
          valueTextClass="text-[#32A1FF]"
        />
        <WeatherInfoCard
          label="초미세먼지"
          value={airQuality.pm2_5}
          colorClass="bg-green-100"
          valueTextClass="text-[#32FF35]"
        />
        <WeatherInfoCard
          label="자외선"
          value="-"
          colorClass="bg-red-100"
          valueTextClass="text-[#FF3232]"
        />
        <WeatherInfoCard
          label="일출"
          value={sunrise}
          colorClass="bg-yellow-100"
          valueTextClass="text-[#FFC532]"
        />
      </div>
    </section>
  );
}
