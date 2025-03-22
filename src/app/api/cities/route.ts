import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"
import City from "@/models/City";
console.log(" API Route Hit: /api/cities");

export async function GET() {
    console.log("Inside GET Method");
    try {
        await connectToDatabase();
        const cities = await City.find({});
        console.log(" Fetched Cities:", cities);
        return NextResponse.json(cities);
    } catch (error) {
        console.error("❌ Error Fetching Cities:", error);

        return NextResponse.json({ message: "Failed to fetch cities" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    console.log("Inside POST Method");
    try {
        await connectToDatabase();
        const { name } = await req.json();
        if (!name) {
            console.error("Validation Error: Missing name");

            return NextResponse.json({ message: "City name  are required" }, { status: 400 });
        }

        const newCity = new City({ name });
        console.log(`new city name = ${newCity.name}`);
        await newCity.save();

        return NextResponse.json(newCity, { status: 201 });
    } catch (error) {
        console.log(" Error Adding City:", error);

        return NextResponse.json({ message: "Error adding city" }, { status: 500 });
    }
}