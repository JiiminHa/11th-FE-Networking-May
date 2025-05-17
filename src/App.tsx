import WeatherMainCard from "./components/WeatherMainCard";
import HourlyForecastCard from "./components/HourlyForecastCard";
import HourlyForecastSection from "./components/HourlyForecastSection";

function App() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-[248px] bg-white shadow-md shrink-0"></aside>

      <main className="flex flex-1 px-[296px] py-[75.5px] flex-col gap-[24px] items-center justify-center ">
        <WeatherMainCard
          temperature={12.2}
          location="롯데월드"
          date="4월 26일"
        />
        <HourlyForecastSection />
      </main>
    </div>
  );
}

export default App;
