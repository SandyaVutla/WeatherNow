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
  const [loading, setLoading] = useState<boolean>(false); // Start with loading: false to show welcome message
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

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
    if (!city) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await getWeather(city);
      setWeatherData(data);
      localStorage.setItem(LAST_CITY_KEY, data.city);
      
      const conditionSeed = data.condition.toLowerCase() || 'weather';
      const newBgUrl = `https://picsum.photos/seed/${conditionSeed}/1920/1080`;
      
      const img = new Image();
      img.src = newBgUrl;
      img.onload = () => {
        document.body.style.backgroundImage = `url(${newBgUrl})`;
      };

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      
      const errorBgUrl = `https://picsum.photos/seed/error/1920/1080`;
      const img = new Image();
      img.src = errorBgUrl;
      img.onload = () => {
        document.body.style.backgroundImage = `url(${errorBgUrl})`;
      };

    } finally {
      setLoading(false);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    // If we're on the welcome screen, reset the background to let the CSS take over.
    if (!weatherData) {
      document.body.style.backgroundImage = '';
    }
  };

  return (
    <div 
      className="min-h-screen w-full font-sans text-gray-200"
    >
      <div className="min-h-screen w-full bg-black/30 dark:bg-black/50 flex flex-col items-center justify-center p-4 transition-colors duration-500">
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