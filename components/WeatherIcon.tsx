
import React from 'react';
import { WeatherCondition } from '../types';
import { SunIcon, CloudIcon, RainIcon, SnowIcon, StormIcon, FogIcon } from './Icons';

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className }) => {
  const iconProps = {
    className: `drop-shadow-lg ${className || 'w-16 h-16'}`,
  };

  switch (condition) {
    case WeatherCondition.SUNNY:
      return <SunIcon {...iconProps} />;
    case WeatherCondition.CLOUDY:
      return <CloudIcon {...iconProps} />;
    case WeatherCondition.RAIN:
      return <RainIcon {...iconProps} />;
    case WeatherCondition.SNOW:
      return <SnowIcon {...iconProps} />;
    case WeatherCondition.STORM:
      return <StormIcon {...iconProps} />;
    case WeatherCondition.FOG:
      return <FogIcon {...iconProps} />;
    default:
      return <SunIcon {...iconProps} />;
  }
};

export default WeatherIcon;
