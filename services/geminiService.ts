
import { GoogleGenAI, Type } from "@google/genai";
import { WeatherData, WeatherCondition } from '../types';
import { AI_MODEL_NAME } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const weatherSchema = {
  type: Type.OBJECT,
  properties: {
    city: {
      type: Type.STRING,
      description: 'The name of the city, correctly capitalized.'
    },
    temperatureCelsius: {
      type: Type.NUMBER,
      description: 'The current temperature in Celsius, as a whole number.'
    },
    description: {
      type: Type.STRING,
      description: 'A brief, 2-3 word description of the weather (e.g., "Sunny with clouds", "Light drizzle").'
    },
    condition: {
      type: Type.STRING,
      description: 'A single-word enum representing the primary weather condition. Must be one of: SUNNY, CLOUDY, RAIN, SNOW, STORM, FOG.',
      enum: Object.values(WeatherCondition).filter(c => c !== WeatherCondition.UNKNOWN),
    },
    tip: {
      type: Type.STRING,
      description: 'A short, useful, or fun tip related to the current weather (e.g., "Perfect day for a walk!", "Don\'t forget your umbrella!").'
    }
  },
  required: ['city', 'temperatureCelsius', 'description', 'condition', 'tip']
};

export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    const prompt = `Provide the current weather for the city: ${city}.`;
    
    const response = await ai.models.generateContent({
      model: AI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: weatherSchema,
        temperature: 0.2,
      },
    });

    const parsedJson = JSON.parse(response.text);

    // Validate the condition enum
    const conditionStr = parsedJson.condition?.toUpperCase();
    const condition = Object.values(WeatherCondition).includes(conditionStr) 
      ? conditionStr as WeatherCondition 
      : WeatherCondition.UNKNOWN;

    return { ...parsedJson, condition };
  } catch (error) {
    console.error("Error fetching weather from AI API:", error);
    if (error instanceof Error && error.message.includes('429')) {
       throw new Error("API limit reached. Please try again later.");
    }
    throw new Error(`Could not fetch weather data for ${city}. The city may not exist or the API is unavailable.`);
  }
};