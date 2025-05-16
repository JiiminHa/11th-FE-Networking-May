type Props = {
  label: string;
  value: string;
  colorClass: string;
  valueTextClass: string;
};

export default function WeatherInfoCard({
  label,
  value,
  colorClass,
  valueTextClass,
}: Props) {
  return (
    <div
      className={`flex flex-col items-center gap-[10px] w-[120px] px-[24px] py-[12px] rounded-[12px] ${colorClass}`}
    >
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-base font-semibold ${valueTextClass}`}>{value}</p>
    </div>
  );
}
