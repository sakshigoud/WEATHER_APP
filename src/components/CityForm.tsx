import { useState } from "react";
import { TextInput, Button, Paper, Text } from "@mantine/core";
import axios from "axios";

const CityForm = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            setError("City name are required");
            return;
        }

        try {
            const response = await axios.post("/api/cities", { name });
            console.log("City added:", response.data);
            setName("");
            setError("");
        } catch (err) {
            setError("Error adding city");
        }
    };

    return (
        <div className="city-form" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30px" }}>
            <Text size={"xl"} w={700} fw={700} mt={50}>You can add favorite cities from here!!!</Text>
            <Paper shadow="sm" p="sm" radius="md" withBorder mt={30}>
                <Text size="lg" w={700} mb="md" >Add City</Text>
                {error && <Text color="red" mb="sm">{error}</Text>}
                <form onSubmit={handleSubmit} >
                    <TextInput
                        label="City Name"
                        placeholder="Enter city name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        mb="sm"
                    />

                    <Button type="submit" ml={300}>
                        Add City
                    </Button>
                </form>
            </Paper>
        </div >
    );
};

export default CityForm;