import { useState, useCallback } from "react";
import axios, { HttpStatusCode } from "axios";

export function useWeather(initialCity: string) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const getWeather = useCallback(async (city: string) => {
        setLoading(true);
        try {
            console.log("Fetching weather for:", city);
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=186316716709c31e9f17840d653a9eba&units=metric`);
            if (response.status == HttpStatusCode.Ok) {
                setWeather(response.data);
            } else {
                console.log(response);
                setWeather(null);
            }
        } catch (error) {
            console.error("Error fetching weather:", error);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    }, []);

    return { weather, loading, getWeather };
}
