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
      case "Berlin":
        setlatitude(52.52);
        setLongitude(13.405);
        break;
      case "Warsaw":
        setlatitude(52.2297);
        setLongitude(21.0122);
        break;
      case "Paris":
        setlatitude(48.8566);
        setLongitude(2.3522);
        break;
      case "London":
        setlatitude(51.5074);
        setLongitude(-0.1278);
        break;
      case "Madrid":
        setlatitude(40.4168);
        setLongitude(-3.7038);
        break;
      case "Rome":
        setlatitude(41.9028);
        setLongitude(12.4964);
        break;
      case "Vienna":
        setlatitude(48.2082);
        setLongitude(16.3738);
        break;
      case "Amsterdam":
        setlatitude(52.3676);
        setLongitude(4.9041);
        break;
      case "Prague":
        setlatitude(50.0755);
        setLongitude(14.4378);
        break;
      case "Budapest":
        setlatitude(47.4979);
        setLongitude(19.0402);
        break;
      case "Lisbon":
        setlatitude(38.7169);
        setLongitude(-9.1399);
        break;
      case "Athens":
        setlatitude(37.9838);
        setLongitude(23.7275);
        break;
      case "Brussels":
        setlatitude(50.8503);
        setLongitude(4.3517);
        break;
      case "Copenhagen":
        setlatitude(55.6761);
        setLongitude(12.5683);
        break;
      case "Dublin":
        setlatitude(53.3498);
        setLongitude(-6.2603);
        break;
      case "Oslo":
        setlatitude(59.9139);
        setLongitude(10.7522);
        break;
      case "Stockholm":
        setlatitude(59.3293);
        setLongitude(18.0686);
        break;
      case "Helsinki":
        setlatitude(60.1699);
        setLongitude(24.9384);
        break;
      case "Zurich":
        setlatitude(47.3769);
        setLongitude(8.5417);
        break;
      case "Moscow":
        setlatitude(55.7558);
        setLongitude(37.6176);
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
        <div className="p-4 flex-initial w-1/5">
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
        <div className="p-4 flex-1  w-3/5">
          <h2 className="text-xl font-bold text-center">Wybierz miasto:</h2>
          <select
            value={city}
            onChange={handleCityChange}
            className="p-2 border rounded mt-2 w-auto text-center mx-auto"
          >
            <option value="Poznań">Poznań</option>
            <option value="Wrocław">Wrocław</option>
            <option value="Poznań">Poznań</option>
            <option value="Berlin">Berlin</option>
            <option value="Warsaw">Warsaw</option>
            <option value="Paris">Paris</option>
            <option value="London">London</option>
            <option value="Madrid">Madrid</option>
            <option value="Rome">Rome</option>
            <option value="Vienna">Vienna</option>
            <option value="Amsterdam">Amsterdam</option>
            <option value="Prague">Prague</option>
            <option value="Budapest">Budapest</option>
            <option value="Lisbon">Lisbon</option>
            <option value="Athens">Athens</option>
            <option value="Brussels">Brussels</option>
            <option value="Copenhagen">Copenhagen</option>
            <option value="Dublin">Dublin</option>
            <option value="Oslo">Oslo</option>
            <option value="Stockholm">Stockholm</option>
            <option value="Helsinki">Helsinki</option>
            <option value="Zurich">Zurich</option>
            <option value="Moscow">Moscow</option>
          </select>
        </div>
        <div className="p-4 flex-initial">
          <h3 className="text-lg font-bold">Aktualna godzina:</h3>
          <p className="text-black bg-gray-300 p-2 rounded w-1/5">
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
