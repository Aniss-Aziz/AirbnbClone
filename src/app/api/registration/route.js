import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://airbnbclone:airbnbclone@cluster.7xjgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
const client = new MongoClient(uri);



export async function POST(req) {
  try {
    const data = await req.json(); 
    console.log("Received request:", data); 
    const { firstName, lastName, email, password, phone, city, country, role } = data;

    if (!email || !password || !firstName || !lastName || !role) {
      console.log("Missing required fields.");
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    console.log("Connecting to database...");
    await client.connect();
    
    const db = client.db("airbnbclone");
    const collection = db.collection("users");

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      console.log("User already exists.");
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 409 }
      );
    }

    const result = await collection.insertOne({
      firstName,
      lastName,
      email,
      password,
      phone,
      city,
      country,
      role,
      createdAt: new Date(),
    });

    console.log("User registered successfully");
    return new Response(
      JSON.stringify({ message: "User registered successfully", userId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error); 
    return new Response(
      JSON.stringify({ message: "Error registering user", error: error.message }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}


export async function GET() {
  try {
    console.log("Connecting to database...");
    await client.connect();
    
    const db = client.db("airbnbclone");
    const collection = db.collection("users");

    const users = await collection.find({}).toArray();

    if (users.length === 0) {
      return new Response(
        JSON.stringify({ message: "No users found" }),
        { status: 404 }
      );
    }

    console.log("Users fetched successfully");
    return new Response(
      JSON.stringify({ users }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching users", error: error.message }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}