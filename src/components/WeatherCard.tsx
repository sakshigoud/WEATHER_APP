"use client";
import { Card, Image, Text, Group, Grid } from "@mantine/core";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import { WeatherData } from "@/types/weatherTypes";

type WeatherCardProps = {
    weather: WeatherData;
};

const WeatherCard = ({ weather }: WeatherCardProps) => {
    return (
        <Card shadow="lg" padding="lg" radius="md" bg="blue.7" withBorder w="100%" maw={500} mih={350} style={{ margin: "auto" }}>
            {/* City & Icon */}
            <Group justify="center">
                <Image
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                    width={100}
                />
                <Text size="xl" fw={700} c="white">
                    {weather.name}, {weather.sys.country}
                </Text>
            </Group>

            {/* Weather Description */}
            <Text size="lg" ta="center" fw={500} c="white">
                {weather.weather[0].description}
            </Text>

            {/* Weather Info - Responsive Grid */}
            <Grid gutter="md" mt="md">
                <Grid.Col span={6}>
                    <Group>
                        <FaTemperatureHigh size={30} color="white" />
                        <Text c="white" size="md">{weather.main.temp}°C</Text>
                    </Group>
                </Grid.Col>

                <Grid.Col span={6}>
                    <Group>
                        <WiHumidity size={30} color="white" />
                        <Text c="white" size="md">{weather.main.humidity}%</Text>
                    </Group>
                </Grid.Col>

                <Grid.Col span={6}>
                    <Group>
                        <WiStrongWind size={30} color="white" />
                        <Text c="white" size="md">{weather.wind.speed} m/s</Text>
                    </Group>
                </Grid.Col>

                <Grid.Col span={6}>
                    <Group>
                        <WiBarometer size={30} color="white" />
                        <Text c="white" size="md">{weather.main.pressure} hPa</Text>
                    </Group>
                </Grid.Col>
            </Grid>
        </Card>
    );
};

export default WeatherCard;
