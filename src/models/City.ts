import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true }
});

export default mongoose.models.City || mongoose.model("City", CitySchema);
