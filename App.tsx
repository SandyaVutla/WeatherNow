import React, { useState, useEffect, useCallback } from 'react';
import { WeatherData, WeatherCondition } from './types';
import { getWeather } from './services/weatherService';
import { LAST_CITY_KEY, THEME_KEY } from './constants';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ThemeToggle from './components/ThemeToggle';
import { SunIcon, MoonIcon } from './components/Icons';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [bgImage, setBgImage] = useState<string>('https://picsum.photos/seed/welcome/1920/1080');

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  
  const fetchWeatherData = useCallback(async (city: string) => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await getWeather(city);
      setWeatherData(data);
      localStorage.setItem(LAST_CITY_KEY, data.city);
      const conditionSeed = data.condition.toLowerCase() || 'weather';
      setBgImage(`https://picsum.photos/seed/${conditionSeed}/1920/1080`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setBgImage(`https://picsum.photos/seed/error/1920/1080`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const lastCity = localStorage.getItem(LAST_CITY_KEY);
    if (lastCity) {
      fetchWeatherData(lastCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchWeatherData]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div 
      className="min-h-screen w-full font-sans text-gray-800 dark:text-gray-200 bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen w-full bg-black/30 dark:bg-black/50 flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        <main className="w-full max-w-md mx-auto">
          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 transition-all duration-300">
            <SearchBar onSearch={fetchWeatherData} isLoading={loading} />
            
            <div className="mt-6 min-h-[280px]">
              {loading && (
                <div className="flex flex-col items-center justify-center text-white h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/80"></div>
                  <p className="mt-4 text-lg">Fetching weather...</p>
                </div>
              )}
              {error && (
                 <div className="text-center text-red-300 bg-red-900/50 p-4 rounded-lg animate-fade-in">
                   <h3 className="font-bold text-lg">Error</h3>
                   <p>{error}</p>
                 </div>
              )}
              {weatherData && !loading && (
                <WeatherDisplay data={weatherData} />
              )}
              {!weatherData && !loading && !error && (
                <div className="text-center text-white animate-fade-in">
                  <SunIcon className="w-24 h-24 mx-auto opacity-80" />
                  <h2 className="text-2xl font-semibold mt-4">Welcome to Weather Now</h2>
                  <p className="mt-2 opacity-80">Enter a city to get the latest forecast.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;