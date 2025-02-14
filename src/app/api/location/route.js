import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://airbnbclone:airbnbclone@cluster.7xjgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
const client = new MongoClient(uri);



export async function GET() {
    try {
      await client.connect();
      const db = client.db("airbnbclone");
      const locations = await db.collection("locations").find().toArray();
      return new Response(JSON.stringify(locations), { status: 200 });
    } catch (error) {
      console.error("Erreur lors de la récupération des logements:", error); 
      return new Response(JSON.stringify({ error: "Erreur lors de la récupération des logements" }), { status: 500 });
    } finally {
      await client.close();
    }
  }

export async function POST(request) {
    try {
      await client.connect();
      const db = client.db("airbnbclone");
  
      const body = await request.json();
      if (!body.title || !body.image || !body.room || !body.people || !body.type || !body.price || !body.description || !body.address || !body.city || !body.country || !body.equipements) {
        return new Response(JSON.stringify({ error: "Tous les champs sont obligatoires" }), { status: 400 });
      }
  
      const newLocation = {
        title: body.title,
        image: body.image,
        room: body.room,
        people: body.people,
        type: body.type,
        rating: body.rating || 0,
        price: body.price,
        description: body.description,
        equipements: body.equipements || [],
        address: body.address,
        city: body.city,
        country: body.country,
      };
  
      const result = await db.collection("locations").insertOne(newLocation);
  

      return new Response(
        JSON.stringify({ message: "Logement ajouté avec succès !", id: result.insertedId }),
        { status: 201 }
      );
    } catch (error) {
      return new Response(JSON.stringify({ error: "Erreur lors de l'ajout du logement" }), { status: 500 });
    } finally {
      await client.close();
    }
  }

  export async function DELETE() {
    try {
      await client.connect();
      const db = client.db("airbnbclone");
  
    
      await db.collection("locations").deleteMany({});
  
      return new Response(JSON.stringify({ message: "Tous les logements ont été supprimés." }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Erreur lors de la suppression des logements" }), { status: 500 });
    } finally {
      await client.close();
    }
  }

  

