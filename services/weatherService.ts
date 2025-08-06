import { WeatherData, WeatherCondition } from '../types';

// NOTE: For a real production app, it's better to store this key in an environment variable.
const API_KEY = 'f931e50ccfbc722308ffd468e2e5ed91';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const mapCondition = (main: string): WeatherCondition => {
  const condition = main.toUpperCase();
  switch (condition) {
    case 'CLEAR':
      return WeatherCondition.SUNNY;
    case 'CLOUDS':
      return WeatherCondition.CLOUDY;
    case 'RAIN':
    case 'DRIZZLE':
      return WeatherCondition.RAIN;
    case 'SNOW':
      return WeatherCondition.SNOW;
    case 'THUNDERSTORM':
      return WeatherCondition.STORM;
    case 'MIST':
    case 'SMOKE':
    case 'HAZE':
    case 'DUST':
    case 'FOG':
    case 'SAND':
    case 'ASH':
    case 'SQUALL':
    case 'TORNADO':
      return WeatherCondition.FOG;
    default:
      return WeatherCondition.UNKNOWN;
  }
};

const generateTip = (condition: WeatherCondition): string => {
    switch (condition) {
      case WeatherCondition.SUNNY:
        return "Great day for sunglasses and a walk!";
      case WeatherCondition.CLOUDY:
        return "A bit gloomy, but still a good day.";
      case WeatherCondition.RAIN:
        return "Don't forget your umbrella!";
      case WeatherCondition.SNOW:
        return "Stay warm and enjoy the winter wonderland!";
      case WeatherCondition.STORM:
        return "Stay indoors and be safe!";
      case WeatherCondition.FOG:
        return "Drive carefully, visibility is low.";
      default:
        return "Check the weather details before heading out.";
    }
  };


export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`Could not find weather data for "${city}". Please check the spelling.`);
        }
        throw new Error(`Failed to fetch weather. Status: ${response.status}`);
    }

    const data = await response.json();
    
    const condition = mapCondition(data.weather[0].main);
    const tip = generateTip(condition);

    return {
      city: data.name,
      temperatureCelsius: data.main.temp,
      description: data.weather[0].description,
      condition: condition,
      tip: tip,
    };

  } catch (error) {
    console.error("Error fetching weather from OpenWeatherMap:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unknown error occurred while fetching weather data.');
  }
};