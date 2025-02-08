export async function POST(request) {
    try {
      await client.connect();
      const db = client.db("airbnbclone");
  
      // Récupérer le corps de la requête
      const body = await request.json();
  
      const { locationId, userId, checkIn, checkOut, price } = body;
  
      // Vérifier la validité de l'ID du logement
      if (!ObjectId.isValid(locationId)) {
        return new Response(JSON.stringify({ error: "ID de logement invalide" }), { status: 400 });
      }
  
      // Vérifier que le logement existe
      const location = await db.collection("locations").findOne({ _id: new ObjectId(locationId) });
  
      if (!location) {
        return new Response(JSON.stringify({ error: "Logement non trouvé" }), { status: 404 });
      }
  
      // Créer la réservation
      const newReservation = {
        userId: new ObjectId(userId),
        locationId: new ObjectId(locationId),
        checkIn,
        checkOut,
        price,
        status: "confirmed",  // Par défaut, la réservation est confirmée
      };
  
      const result = await db.collection("reservations").insertOne(newReservation);
  
      // Retourner l'ID de la réservation créée
      return new Response(JSON.stringify({ message: "Réservation effectuée avec succès", id: result.insertedId }), { status: 201 });
  
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réservation:", error);
      return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
    } finally {
      await client.close();
    }
  }