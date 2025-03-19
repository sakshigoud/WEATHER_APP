"use client";
import { IconSearch } from "@tabler/icons-react";
import { Autocomplete, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { Button } from "@mantine/core";
import classes from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addCity } from "@/redux/slices/weatherSlice";
import { useState } from "react";

type NavbarProps = {
    onCitySelect: (city: string) => void;
};

export function Navbar({ onCitySelect }: NavbarProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const [city, setCity] = useState(""); // Use local state to store city input
    const dispatch = useDispatch();
    const cities = useSelector((state: RootState) => state.weather.cities); // Redux State

    const handleSearch = (city: string) => {
        if (city.trim()) {
            console.log(city);
            dispatch(addCity(city)); // Add city to Redux state
            onCitySelect(city); // Fetch Weather
        }
    };

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                    <TiWeatherPartlySunny size={50} />
                    <h2>Weather</h2>
                </Group>
                <Group>
                    <Autocomplete
                        className={classes.search}
                        placeholder="Search City"
                        leftSection={<IconSearch size={16} stroke={1.5} />}
                        value={city} // Bind the input value to the state
                        onChange={(value) => setCity(value)} // Update state on input change
                        onOptionSubmit={() => handleSearch(city)} // Trigger search with entered city
                        data={cities} // Use Redux State for Suggestions
                        visibleFrom="xs"
                    />
                    <Button onClick={() => handleSearch(city)}>Search</Button> {/* Pass entered city */}
                </Group>
            </div>
        </header>
    );
}
