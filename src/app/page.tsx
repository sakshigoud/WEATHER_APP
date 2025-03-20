"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useWeather } from "@/hooks/useWeather";
import { Navbar } from "@/components/Navbar";
import { Loader, Text } from "@mantine/core";
import WeatherCard from "@/components/WeatherCard";  // ✅ Import WeatherCard
import { useEffect } from "react";
import CityForm from "@/components/CityForm";
import CityList from "@/components/CityList";

export default function Home() {
  const cities = useSelector((state: RootState) => state.weather.cities); // Redux State
  const lastCity = cities.length > 0 ? cities[cities.length - 1] : "Dewas";

  const { weather, loading, getWeather } = useWeather("Dewas");
  useEffect(() => {
    console.log("Fetching weather for:", lastCity); // ✅ Debugging
    getWeather(lastCity); // ✅ Fetch the latest city weather
  }, [lastCity]);
  return (
    <div className="App" style={{
      backgroundColor: "lightgray",  // ✅ Background color
      minHeight: "100vh",       // ✅ Full viewport height
      display: "flex",          // ✅ Center content vertically
      flexDirection: "column",  // ✅ Stack items (Navbar + Content)
    }}>
      <Navbar onCitySelect={getWeather} />
      <div
        style={{
          flexGrow: 1,  // ✅ Pushes footer to the bottom
          display: "flex",
          justifyContent: "center", // ✅ Center content horizontally
          alignItems: "center", // ✅ Center content vertically
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
      <CityList />

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
