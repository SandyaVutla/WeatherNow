
import React from 'react';
import { WeatherData } from '../types';
import WeatherIcon from './WeatherIcon';

interface WeatherDisplayProps {
  data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  return (
    <div className="text-white text-center animate-fade-in flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">{data.city}</h2>
      <div className="my-4">
        <WeatherIcon condition={data.condition} className="w-32 h-32" />
      </div>
      <p className="text-7xl font-light tracking-tighter">
        {Math.round(data.temperatureCelsius)}&deg;<span className="font-medium">C</span>
      </p>
      <p className="text-xl mt-2 font-medium capitalize">{data.description}</p>
      <div className="mt-6 text-center text-white/90 bg-white/10 dark:bg-black/10 rounded-lg p-3 w-full max-w-xs">
        <p>"{data.tip}"</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
