import WeeklyForecastCard from "../components/WeeklyForecastCard";
import type { WeeklyForecast } from "../types/weather";

const weeklyData: WeeklyForecast[] = [
  {
    date: "5.23",
    weekday: "오늘",
    am: { icon: "/icons/Sun.svg", temp: 10, rainRate: 10 },
    pm: { icon: "/icons/Clouds.svg", temp: 17, rainRate: 20 },
  },
  {
    date: "5.24",
    weekday: "토",
    am: { icon: "/icons/Snow.svg", temp: 4, rainRate: 40 },
    pm: { icon: "/icons/Sun.svg", temp: 13, rainRate: 10 },
  },
  {
    date: "5.25",
    weekday: "일",

    am: { icon: "/icons/Sun.svg", temp: 6, rainRate: 0 },
    pm: { icon: "/icons/Rain.svg", temp: 16, rainRate: 30 },
  },
  {
    date: "5.26",
    weekday: "월",

    am: { icon: "/icons/Sun.svg", temp: 6, rainRate: 0 },
    pm: { icon: "/icons/Rain.svg", temp: 16, rainRate: 30 },
  },
  {
    date: "5.27",
    weekday: "화",

    am: { icon: "/icons/Sun.svg", temp: 6, rainRate: 0 },
    pm: { icon: "/icons/Rain.svg", temp: 16, rainRate: 30 },
  },
];

export default function WeeklyForecastSection() {
  return (
    <section className="w-[1062px] max-w-[1328px] bg-white rounded-[16px] border-[1px] border-[#F2F2F2] shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-6">
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
