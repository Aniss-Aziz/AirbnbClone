import { MongoClient, ObjectId } from "mongodb";

const uri = 'mongodb+srv://airbnbclone:airbnbclone@cluster.7xjgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
const client = new MongoClient(uri);

export async function GET(request, { params }) {
  try {
    await client.connect();
    const db = client.db("airbnbclone");
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "ID invalide" }), { status: 400 });
    }

    const location = await db.collection("locations").findOne({ _id: new ObjectId(id) });

    if (!location) {
      return new Response(JSON.stringify({ error: "Logement non trouvé" }), { status: 404 });
    }

    return new Response(JSON.stringify(location), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération du logement:", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  } finally {
    await client.close();
  }
}
