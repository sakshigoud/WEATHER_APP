"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
    cities: string[];
}

const initialState: WeatherState = {
    cities: [],
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        addCity: (state, action: PayloadAction<string>) => {
            if (!state.cities.includes(action.payload)) {
                state.cities.push(action.payload);
            }
        },
        removeCity: (state, action: PayloadAction<string>) => {
            state.cities = state.cities.filter(city => city !== action.payload);
        },
    },
});

export const { addCity, removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
