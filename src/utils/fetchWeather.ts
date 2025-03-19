import axios from "axios";
import { WeatherData } from "@/types/weatherTypes";
import { env } from "process";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city: string): Promise<WeatherData | null> => {
    try {
        const response = await axios.get<WeatherData>(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
            },

        });
        console.log("Weather Data:", response.data);

        return response.data;
    } catch (error: any) {
        console.error("Error fetching weather data:", error.response?.data || error.message);
        return null;
    }
};
