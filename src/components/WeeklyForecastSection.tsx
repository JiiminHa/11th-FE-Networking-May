import WeeklyForecastCard from "../components/WeeklyForecastCard";
import type { WeeklyForecast } from "../types/weather";

const weeklyData: WeeklyForecast[] = [
  {
    date: "4.26",
    weekday: "오늘",
    am: { icon: "/icons/Sun.png", temp: 10, rainRate: 10 },
    pm: { icon: "/icons/Clouds.png", temp: 17, rainRate: 20 },
  },
  {
    date: "4.27",
    weekday: "토",
    am: { icon: "/icons/Snow.png", temp: 4, rainRate: 40 },
    pm: { icon: "/icons/Sun.png", temp: 13, rainRate: 10 },
  },
  {
    date: "4.28",
    weekday: "일",

    am: { icon: "/icons/Sun.png", temp: 6, rainRate: 0 },
    pm: { icon: "/icons/Rain.png", temp: 16, rainRate: 30 },
  },
  {
    date: "4.29",
    weekday: "월",

    am: { icon: "/icons/Sun.png", temp: 6, rainRate: 0 },
    pm: { icon: "/icons/Rain.png", temp: 16, rainRate: 30 },
  },
];

export default function WeeklyForecastSection() {
  return (
    <section className="w-full max-w-[1328px] bg-white rounded-[16px] border-[2px] border-[#F2F2F2] shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-6">
      <h3 className="text-[20px] font-bold">주간 예보</h3>

      <div className="overflow-x-auto px-[24px] py-3">
        <div className="flex w-full justify-between">
          {weeklyData.map((day) => (
            <WeeklyForecastCard key={day.date} {...day} />
          ))}
        </div>
      </div>
    </section>
  );
}
