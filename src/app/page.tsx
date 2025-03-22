"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useWeather } from "@/hooks/useWeather";
import { Navbar } from "@/components/Navbar";
import { Loader, Text } from "@mantine/core";
import WeatherCard from "@/components/WeatherCard";
import { useEffect } from "react";
import CityForm from "@/components/CityForm";
import CityList from "@/components/CityList";

export default function Home() {
  const cities = useSelector((state: RootState) => state.weather.cities);
  const lastCity = cities.length > 0 ? cities[cities.length - 1] : "Dewas";

  const { weather, loading, getWeather } = useWeather("Dewas");
  useEffect(() => {
    console.log("Fetching weather for:", lastCity);
    getWeather(lastCity);
  }, [lastCity]);
  return (
    <div className="App" style={{
      backgroundColor: "lightgray",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <Navbar onCitySelect={getWeather} />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <Loader size="xl" />
        ) : weather ? (
          <WeatherCard weather={weather} />
        ) : (
          <Text size="xl" color="white">City not found!</Text>
        )}
      </div>
      <CityForm />

      <footer
        style={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          padding: "10px",
        }}
      >
        © 2025 Weather App
      </footer>
    </div>
  );
}
