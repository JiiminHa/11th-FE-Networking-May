import Sidebar from "./components/Sidebar";
import WeatherMainCard from "./components/WeatherMainCard";
import HourlyForecastSection from "./components/HourlyForecastSection";
import WeeklyForecastSection from "./components/WeeklyForecastSection";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex flex-1 px-[296px] py-[75.5px] flex-col gap-[24px] items-center justify-center ">
        <WeatherMainCard />
        <HourlyForecastSection />
        <WeeklyForecastSection />
      </main>
    </div>
  );
}

export default App;
