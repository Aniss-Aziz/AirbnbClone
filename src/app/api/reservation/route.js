import { MongoClient, ObjectId } from "mongodb";

const uri = 'mongodb+srv://airbnbclone:airbnbclone@cluster.7xjgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const data = await req.json(); 

    const { startDate, endDate, numOfGuests, totalPrice, locationId, userId } = data;


    if (!startDate || !endDate || !numOfGuests || !totalPrice || !locationId || !userId) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }


    await client.connect();
    const db = client.db("airbnbclone");
    const collection = db.collection("reservations");

   
    const reservation = await collection.insertOne({
      startDate,
      endDate,
      numOfGuests,
      totalPrice,
      locationId,
      userId,
      status: 'pending',
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: 'Réservation créée avec succès', reservation }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur serveur:', error);
    return new Response(
      JSON.stringify({ message: 'Erreur interne du serveur' }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function GET(req) {
  try {
    console.log("Tentative de connexion à la base de données...");
    await client.connect();
    const db = client.db("airbnbclone");
    const reservationsCollection = db.collection("reservations");
    const locationsCollection = db.collection("locations");


    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      console.error("userId est requis !");
      return new Response(
        JSON.stringify({ error: "userId est requis" }),
        { status: 400 }
      );
    }

    console.log(`Recherche des réservations pour l'utilisateur ${userId}`);

    const reservations = await reservationsCollection.find({ userId }).toArray();
    

    if (reservations.length === 0) {
      console.log("Aucune réservation trouvée pour cet utilisateur.");
    }

    console.log(`Réservations trouvées: ${reservations.length}`);


    const reservationsWithLocation = await Promise.all(
      reservations.map(async (reservation) => {
        if (reservation.locationId) {
          try {
            console.log(`Recherche de la location pour locationId: ${reservation.locationId}`);


            console.log(`LocationId (string): ${reservation.locationId}`);
            
 
            const location = await locationsCollection.findOne({ _id: new ObjectId(reservation.locationId) });

       
            console.log("Location trouvée:", location);

            if (location) {
              return { ...reservation, location };
            } else {
              console.log(`Location non trouvée pour locationId: ${reservation.locationId}`);
              return { ...reservation, location: null };
            }
          } catch (err) {
            console.error("Erreur lors de la recherche de la location:", err);
            return { ...reservation, location: null };
          }
        }
        return { ...reservation, location: null };
      })
    );

    console.log("Réponse des réservations avec informations de logement:", reservationsWithLocation);

    return new Response(JSON.stringify(reservationsWithLocation), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de la récupération des réservations" }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}



    export async function DELETE() {
      try {
        await client.connect();
        const db = client.db("airbnbclone");
    
        // Supprime tous les documents de la collection "locations"
        await db.collection("reservations").deleteMany({});
    
        return new Response(JSON.stringify({ message: "Tous les réservations ont été supprimés." }), { status: 200 });
      } catch (error) {
        return new Response(JSON.stringify({ error: "Erreur lors de la suppression des réservations" }), { status: 500 });
      } finally {
        await client.close();
      }
    }

// export async function GET() {
//   if (req.method === 'GET') {
//     // Code pour la méthode GET (Récupérer les réservations d'un utilisateur)
//     try {
//       const { userId } = req.query; // Récupère le userId depuis les paramètres de la requête (query params)

//       // Vérifie si le userId est fourni
//       if (!userId) {
//         return res.status(400).json({ message: "UserId est requis" });
//       }

//       // Connexion à MongoDB
//       await client.connect();
//       const db = client.db("airbnbclone");
//       const collection = db.collection("reservations");

//       // Recherche des réservations de l'utilisateur
//       const reservations = await collection.find({ userId }).toArray();

//       // Vérifie si des réservations sont trouvées
//       if (reservations.length === 0) {
//         return res.status(404).json({ message: "Aucune réservation trouvée pour cet utilisateur" });
//       }

//       return res.status(200).json({ message: 'Réservations récupérées avec succès', reservations });
//     } catch (error) {
//       console.error('Erreur serveur:', error);
//       return res.status(500).json({ message: 'Erreur interne du serveur' });
//     } finally {
//       await client.close();
//     }
//   } else {
//     // Si la méthode n'est pas POST ni GET, retourne une erreur 405
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }
