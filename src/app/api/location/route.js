import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://airbnbclone:airbnbclone@cluster.7xjgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
const client = new MongoClient(uri);

// app/api/location/route.js

export async function GET() {
    try {
      await client.connect();
      const db = client.db("airbnbclone");
      const locations = await db.collection("locations").find().toArray();
      return new Response(JSON.stringify(locations), { status: 200 });
    } catch (error) {
      console.error("Erreur lors de la récupération des logements:", error); // Ajoutez un log ici
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
      if (!body.title || !body.image || !body.room || !body.people || !body.type || !body.price || !body.description) {
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
      };
  
      const result = await db.collection("locations").insertOne(newLocation);
  
      // Renvoyer le message avec l'ID généré
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
  
      // Supprime tous les documents de la collection "locations"
      await db.collection("locations").deleteMany({});
  
      return new Response(JSON.stringify({ message: "Tous les logements ont été supprimés." }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Erreur lors de la suppression des logements" }), { status: 500 });
    } finally {
      await client.close();
    }
  }

  

// export async function GET() {
// const location = [
//     {id: 0, title: "Les Roses", image: "https://www.dropbox.com/scl/fi/33vrsw6lbandb2klq553v/appartement-1.png?rlkey=f9bxpzlsbgsp6ac8a77uk4ft2&st=e9fsox29&raw=1", room: 3, people: 4, type: "Appartement", rating: 4.7, price: 127},
//     {id: 1, title: "Villa Cassiopé", image: "https://www.dropbox.com/scl/fi/2udush8wvq83pxgk70ybq/villa-2.png?rlkey=i8vlnunzikxjklofclc76jlf5&st=2008ng8b&raw=1", room: 4, people: 6, type: "Villa", rating: 4.2, price: 250},
//     {id: 2, title: "Villa Penista", image: "https://www.dropbox.com/scl/fi/5j6m0ihcfbv8bp777hrcp/villa-1.png?rlkey=lcpeejb3z4os7wu3zuuizcjb8&st=2c4kts6r&raw=1", room: 6, people: 8, type: "Villa", rating: 4.5, price: 349},
//     {id: 3, title: "Chambre les Montilles", image: "https://www.dropbox.com/scl/fi/gjr04f4eymz1h66mg3ule/appartement-2.png?rlkey=0esgqi0s7k0h5yywm6cvkuyvc&st=u9ism741&raw=1", room: 3, people: 4, type: "Hébergement", rating: 4.9, price: 49},
//     {id: 4, title: "Châteaux Coulioude", image: "https://www.dropbox.com/scl/fi/ro2pkhndq6w4mq61bng9x/chateaux-1.jpg?rlkey=tvigtr3d8cpp8o4q39o9t4ewz&st=e37x5cxz&raw=1", room: 6, people: 8, type: "Châteaux", rating: 5, price: 699},
//     {id: 5, title: "Santa Ruise", image: "https://www.dropbox.com/scl/fi/me7xuoh4eb09sspjik6fl/bateau-1.png?rlkey=hktncj7aiqp33r962hq5bp0ul&st=uul22irs&raw=1", room: 1, people: 2, type: "Bateaux", rating: 4.7, price: 195}
// ]
// return Response.json(location);
// }
