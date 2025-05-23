import { useState } from "react";
import Sidebar from "./components/Sidebar";
import WeatherMainCard from "./components/WeatherMainCard";
import HourlyForecastSection from "./components/HourlyForecastSection";
import WeeklyForecastSection from "./components/WeeklyForecastSection";
import NoLocationSelected from "./components/NoLocationSelected";
import type { LocationItem } from "./types/location";

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(
    null
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar onSelectLocation={setSelectedLocation} />

      <main className="flex flex-1 px-[296px] py-[75.5px] flex-col gap-[24px] items-center justify-center">
        {selectedLocation ? (
          <>
            <WeatherMainCard location={selectedLocation} />
            <HourlyForecastSection locationId={selectedLocation.id} />
            <WeeklyForecastSection locationId={selectedLocation.id} />
          </>
        ) : (
          <NoLocationSelected />
        )}
      </main>
    </div>
  );
}
