import { useState } from "react";
import axios from "axios";

const CityForm = () => {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !country) {
            setError("City name and country are required");
            return;
        }

        try {
            const response = await axios.post("/api/cities", { name, country });
            console.log("City added:", response.data);
            setName("");
            setCountry("");
            setError("");
        } catch (err) {
            setError("Error adding city");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-md">
            <h2 className="text-lg font-bold mb-3">Add City</h2>

            {error && <p className="text-red-500">{error}</p>}

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="City Name"
                className="border p-2 mb-2 w-full"
            />

            <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="border p-2 mb-2 w-full"
            />

            <button type="submit" className="bg-blue-500 text-white p-2 w-full">
                Add City
            </button>
        </form>
    );
};

export default CityForm;
