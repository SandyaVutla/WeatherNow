
export enum WeatherCondition {
  SUNNY = 'SUNNY',
  CLOUDY = 'CLOUDY',
  RAIN = 'RAIN',
  SNOW = 'SNOW',
  STORM = 'STORM',
  FOG = 'FOG',
  UNKNOWN = 'UNKNOWN',
}

export interface WeatherData {
  city: string;
  temperatureCelsius: number;
  description: string;
  condition: WeatherCondition;
  tip: string;
}
