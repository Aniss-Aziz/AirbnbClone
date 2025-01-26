import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://airbnbclone:airbnbclone@cluster.7xjgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
const client = new MongoClient(uri);


export async function POST(req) {
  try {
    const data = await req.json(); 
    const { email, password } = data;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Missing email or password" }),
        { status: 400 }
      );
    }

    console.log("Connecting to database...");
    await client.connect();
    
    const db = client.db("airbnbclone");
    const collection = db.collection("users");

    const user = await collection.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return new Response(
        JSON.stringify({ message: "Invalid password" }),
        { status: 401 }
      );
    }

    console.log("User logged in successfully");
    
    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          city: user.city,
          country: user.country,
          role: user.role,
          createdAt: user.createdAt
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(
      JSON.stringify({ message: "Error logging in", error: error.message }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
