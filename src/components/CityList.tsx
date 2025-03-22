"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Text, Group } from "@mantine/core";

interface City {
    _id: string;
    name: string;
}

export default function CityList() {
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("/api/cities");
                setCities(response.data);
            }
            catch (error) {
                console.error("error fetching cities:", error);
            }

        };
        fetchCities();
    }, []);

    return (
        <div>
            <h2>Saved Cities</h2>
            {cities.length === 0 ? <p>No cities found.</p> : (
                cities.map((city) => (
                    <Card key={city._id} shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between">
                            <Text>{city.name}</Text>
                        </Group>
                    </Card>
                ))
            )}
        </div>
    );
}
