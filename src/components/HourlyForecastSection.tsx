import HourlyForecastCard from "./HourlyForecastCard";

const hourlyData = [
  { time: "03시", icon: "/icons/Clouds.png", temperature: "8°" },
  { time: "04시", icon: "/icons/Clouds.png", temperature: "8°" },
  { time: "05시", icon: "/icons/Clouds.png", temperature: "9°" },
  { time: "06시", icon: "/icons/Clouds.png", temperature: "10°" },
  { time: "07시", icon: "/icons/Sun.png", temperature: "11°" },
  { time: "08시", icon: "/icons/Sun.png", temperature: "12°" },
  { time: "09시", icon: "/icons/Sun.png", temperature: "13°" },
  { time: "10시", icon: "/icons/Sun.png", temperature: "14°" },
  { time: "11시", icon: "/icons/Sun.png", temperature: "15°" },
  { time: "12시", icon: "/icons/Sun.png", temperature: "15°" },
  { time: "13시", icon: "/icons/Sun.png", temperature: "15°" },
  { time: "14시", icon: "/icons/Sun.png", temperature: "15°" },
];

export default function HourlyForecastSection() {
  return (
    <section className="w-full max-w-[1328px] bg-white rounded-[16px] border-[2px] border-[#F2F2F2] shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-6">
      <h3 className="text-[20px] font-bold">시간별 현황</h3>
      <div className="flex flex-col gap-2 px-6 py-3">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="relative flex gap-4 w-max">
            <div className="absolute top-1/2 left-[20px] right-[20px] h-[2px] bg-[#d6d6d6] z-0" />
            {hourlyData.map((_, idx) => (
              <div
                key={idx}
                className="w-[48px] flex justify-center z-10 shrink-0"
              >
                <div className="w-2 h-2 bg-[#d6d6d6] rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {hourlyData.map((item) => (
            <HourlyForecastCard
              key={item.time}
              time={item.time}
              icon={item.icon}
              temperature={item.temperature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
