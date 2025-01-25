import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://airbnbclone:airbnbclone@cluster.7xjgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const data = await req.json(); // Cette méthode permet d'obtenir le body de la requête dans Next.js 13+
    console.log("Received request:", data); // Log de la requête reçue
    
    const { firstName, lastName, email, password, phone, city, country, role } = data;

    // Validation des données
    if (!email || !password || !firstName || !lastName || !role) {
      console.log("Missing required fields.");
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    console.log("Connecting to database...");
    await client.connect(); // Connexion à la base de données
    
    const db = client.db("airbnbclone"); // Nom de votre base de données
    const collection = db.collection("users");

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      console.log("User already exists.");
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 409 }
      );
    }

    // Ajouter l'utilisateur à la collection
    const result = await collection.insertOne({
      firstName,
      lastName,
      email,
      password, // ⚠️ Hashage du mot de passe nécessaire pour la production
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
    console.error("Error during registration:", error); // Log de l'erreur
    return new Response(
      JSON.stringify({ message: "Error registering user", error: error.message }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
