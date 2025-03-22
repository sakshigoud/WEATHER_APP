"use client";
import { IconSearch } from "@tabler/icons-react";
import { Autocomplete, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { Button } from "@mantine/core";
import classes from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { addCity } from "@/redux/slices/weatherSlice";
import { useEffect, useState } from "react";
import axios from "axios";
type NavbarProps = {
    onCitySelect: (city: string) => void;
};

export function Navbar({ onCitySelect }: NavbarProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const [city, setCity] = useState("");
    const dispatch = useDispatch();
    const [favoriteCities, setFavoriteCities] = useState<string[]>([]);

    const handleSearch = (city: string) => {
        if (city.trim()) {
            console.log(city);
            dispatch(addCity(city));
            onCitySelect(city);
        }
    };

    const fetchFavoriteCities = async () => {
        try {
            const response = await axios.get("/api/cities");
            const fetchedCities = response.data.map((city: { name: string }) => city.name);
            setFavoriteCities(fetchedCities);
        } catch (error) {
            console.error("Error fetching favorite cities:", error);
        }
    };


    useEffect(() => {
        fetchFavoriteCities();
    }, []);

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
                        value={city}
                        onChange={(value) => setCity(value)}
                        onOptionSubmit={() => handleSearch(city)}
                        data={favoriteCities}
                        visibleFrom="xs"
                    />

                    <Button onClick={() => handleSearch(city)}>Search</Button>

                </Group>
            </div>
        </header>
    );
}
