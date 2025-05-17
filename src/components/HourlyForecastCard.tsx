type Props = {
  time: string;
  icon: string;
  temperature: string;
};

export default function HourlyForecastCard({ time, icon, temperature }: Props) {
  return (
    <div className="flex flex-col items-center w-[48px] gap-2">
      <img src={icon} alt="weather icon" className="w-10 h-10" />
      <span className="text-sm text-gray-500">{time}</span>
      <span className="text-sm">{temperature}</span>
    </div>
  );
}
