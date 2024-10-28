import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface WeatherData {
  hourly: {
    temperature_2m: number[];
  };
}

export const fetchWeather = async (latitude: number, longitude: number) => {
  const response = await axios.get<WeatherData>(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude,
        longitude,
        hourly: ["temperature_2m", "rain"],
      },
    }
  );
  return response.data;
};

const queryClient = new QueryClient();

function CurrentWeather() {
  const [latitude, setlatitude] = useState<number>(52.4069);
  const [longitude, setLongitude] = useState<number>(16.9299);
  const [city, setCity] = useState<string>("Poznań");
  const currentHour = new Date().getHours();
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);

    switch (selectedCity) {
      case "Poznań":
        setlatitude(52.4069);
        setLongitude(16.9299);
        break;
      case "Wrocław":
        setlatitude(51.1079);
        setLongitude(17.0385);
        break;
      case "Warszawa":
        setlatitude(52.2297);
        setLongitude(21.0122);
        break;
      default:
        break;
    }
  };
  const { data, error, isLoading } = useQuery<WeatherData, Error>({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => fetchWeather(latitude, longitude),
    refetchInterval: 1000,
  });
  if (isLoading) return <p>Ładowanie danych</p>;
  if (error) return <p>Błąd: {error.message}</p>;
  const currentTemperature = data?.hourly.temperature_2m[currentHour];

  return (
    <>
      {" "}
      <div className="p-8 bg-gray-200 basis-1/4 shadow-xl rounded-lg flex flex-col items-center">
        <h2 className="text-xl font-bold">Wybierz miasto:</h2>
        <select value={city} onChange={handleCityChange}>
          <option value="Poznań">Poznań</option>
          <option value="Wrocław">Wrocław</option>
          <option value="Warszawa">Warszawa</option>
        </select>
      </div>{" "}
      <div className="p-8 bg-gray-200 basis-1/4 shadow-xl rounded-lg flex flex-col items-center">
        <h2 className="text-xl font-bold">
          Aktualna prognoza pogody dla {city}
        </h2>
        <div className="text-4xl my-4">
          {currentTemperature !== undefined
            ? `${currentTemperature}°C`
            : "Brak danych"}
        </div>
      </div>
    </>
  );
}

const Weather: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrentWeather />
    </QueryClientProvider>
  );
};

export default Weather;
