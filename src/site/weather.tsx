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
    rain: number[];
    windspeed_10m: number[];
    visibility: number[];
    pressure_msl: number[];
  };
}

export const fetchWeather = async (latitude: number, longitude: number) => {
  const response = await axios.get<WeatherData>(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude,
        longitude,
        hourly: [
          "temperature_2m",
          "rain",
          "windspeed_10m",
          "visibility",
          "pressure_msl",
        ],
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
  const [showRain, setShowRain] = useState<boolean>(false);
  const [showVisibility, setShowVisibility] = useState<boolean>(false);
  const [showWindSpeed, setShowWindSpeed] = useState<boolean>(false);
  const [showPressure, setShowPressure] = useState<boolean>(false);
  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const currentSeconds = new Date().getSeconds();

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

  if (isLoading) return <p>Ładowanie danych...</p>;
  if (error) return <p>Błąd: {error.message}</p>;

  const currentTemperature = data?.hourly.temperature_2m[currentHour];
  const currentRain = data?.hourly.rain[currentHour];
  const currentWindSpeed = data?.hourly.windspeed_10m[currentHour];
  const currentVisibility = data?.hourly.visibility[currentHour];
  const currentPressure = data?.hourly.pressure_msl[currentHour];

  return (
    <>
      <div className="p-8 bg-gray-200 flex flex-col md:flex-row shadow-xl rounded-lg space-x-4">
        <div className="p-4 flex-1">
          <h3 className="text-lg font-bold">Dodatkowe parametry:</h3>
          <ul className="space-y-2 mt-2">
            <li className="flex items-center">
              <input
                type="checkbox"
                checked={showRain}
                onClick={() => setShowRain(!showRain)}
                className="mr-2"
              />
              Opady
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                checked={showVisibility}
                onClick={() => setShowVisibility(!showVisibility)}
                className="mr-2"
              />
              Widoczność
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                checked={showWindSpeed}
                onClick={() => setShowWindSpeed(!showWindSpeed)}
                className="mr-2"
              />
              Prędkość wiatru
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                checked={showPressure}
                onClick={() => setShowPressure(!showPressure)}
                className="mr-2"
              />
              Ciśnienie
            </li>
          </ul>
        </div>
        <div className="p-4 flex-1">
          <h2 className="text-xl font-bold">Wybierz miasto:</h2>
          <select
            value={city}
            onChange={handleCityChange}
            className="p-2 border rounded mt-2 w-full"
          >
            <option value="Poznań">Poznań</option>
            <option value="Wrocław">Wrocław</option>
            <option value="Warszawa">Warszawa</option>
          </select>
        </div>
        <div className="p-4 flex-1">
          <h3 className="text-lg font-bold">Aktualna godzina:</h3>
          <p className="text-black bg-gray-300 p-2 rounded">
            {currentHour}:{currentMinutes}:{currentSeconds}
          </p>
        </div>
      </div>
      <div className="p-8 bg-gray-200 shadow-xl rounded-lg flex flex-col items-center">
        <h2 className="text-xl font-bold">
          Aktualna prognoza pogody dla {city}
        </h2>
        <div className="text-4xl my-4">
          {currentTemperature !== undefined
            ? `${currentTemperature}°C`
            : "Brak danych"}
        </div>
        {showRain && (
          <div className="text-lg my-2 text-center">
            <h3 className="font-semibold">Opady:</h3>
            <p className="text-black bg-gray-400 p-2 rounded">
              {currentRain !== undefined ? `${currentRain} mm` : "Brak danych"}
            </p>
          </div>
        )}
        {showVisibility && (
          <div className="text-lg my-2 text-center">
            <h3 className="font-semibold">Widoczność:</h3>
            <p className="text-black bg-gray-400 p-2 rounded">
              {currentVisibility !== undefined
                ? `${currentVisibility} m`
                : "Brak danych"}
            </p>
          </div>
        )}
        {showWindSpeed && (
          <div className="text-lg my-2 text-center">
            <h3 className="font-semibold">Prędkość wiatru:</h3>
            <p className="text-black bg-gray-400 p-2 rounded">
              {currentWindSpeed !== undefined
                ? `${currentWindSpeed} m/s`
                : "Brak danych"}
            </p>
          </div>
        )}
        {showPressure && (
          <div className="text-lg my-2 text-center">
            <h3 className="font-semibold">Ciśnienie:</h3>
            <p className="text-black bg-gray-400 p-2 rounded">
              {currentPressure !== undefined
                ? `${currentPressure} hPa`
                : "Brak danych"}
            </p>
          </div>
        )}
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
