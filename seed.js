import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://airbnbclone:airbnbclone@cluster.7xjgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';

async function seedDatabase() {
    let client;
    try {
        client = await MongoClient.connect(MONGODB_URI);
        const db = client.db("airbnbclone");

        console.log("Connecté à la base de données MongoDB");

        // Création de la collection(table) Utilisateurs
        const utilisateursResult = await db.collection("Utilisateurs").insertMany([
            {
                nom: "Zak",
                prenom: "Anouar",
                email: "zak@example.com",
                mot_de_passe: "hashedpassword123",
                telephone: "+33612345678",
                adresse: "123 Rue de la Mer",
                ville: "Marseille",
                pays: "France",
                role: "proprietaire", // Valeur unique : "proprietaire" ou "locataire"
                date_inscription: new Date(),
            },
            {
                nom: "Aniss",
                prenom: "Aziz",
                email: "aniss@example.com",
                mot_de_passe: "hashedpassword456",
                telephone: "+33687654321",
                adresse: "45 Boulevard Haussmann",
                ville: "Paris",
                pays: "France",
                role: "locataire",
                date_inscription: new Date(),
            },
        ]);

        console.log("Collection Utilisateurs créée et remplie.");
        const userIds = utilisateursResult.insertedIds;
        console.log("IDs des utilisateurs insérés :", userIds);

        // 2. Création et remplissage de la collection Propriétés
        const proprietesResult = await db.collection("Proprietes").insertMany([
            {
                titre: "Appartement à Paris",
                image: "paris.jpg",
                nombre_chambres: 2,
                capacite_personnes: 4,
                type: "Appartement",
                prix_par_nuit: 120,
                note_moyenne: 4.5,
                id_proprietaire: userIds[0], // ID du premier utilisateur (propriétaire)
            },
            {
                titre: "Villa à Marseille",
                image: "marseille.jpg",
                nombre_chambres: 4,
                capacite_personnes: 8,
                type: "Maison",
                prix_par_nuit: 300,
                note_moyenne: 5.0,
                id_proprietaire: userIds[0], // Même propriétaire
            },
        ]);

        const propertyIds = proprietesResult.insertedIds;
        console.log("Collection Propriétés créée et remplie.");

        // 3. Création et remplissage de la collection Réservations
        const reservationsResult = await db.collection("Reservations").insertMany([
            {
                id_locataire: userIds[1], // ID du deuxième utilisateur (locataire)
                id_propriete: propertyIds[0], // ID de la première propriété
                date_debut: new Date("2024-03-01"),
                date_fin: new Date("2024-03-07"),
                prix_total: 840, // 120 € * 7 jours
            }
        ]);

        const reservationIds = reservationsResult.insertedIds;
        console.log("Collection Réservations créée et remplie.");

        // 4. Création et remplissage de la collection Paiements
        await db.collection("Paiements").insertMany([
            {
                id_reservation: reservationIds[0],
                montant: 840,
                date_paiement: new Date(),
                methode_paiement: "Carte",
                statut: "Réussi",
            }
        ]);

        console.log("Collection Paiements créée et remplie.");

        // 5. Création et remplissage de la collection Avis
        await db.collection("Avis").insertMany([
            {
                id_utilisateur: userIds[1], // Le locataire laisse un avis
                id_propriete: propertyIds[0],
                note: 5,
                commentaire: "Superbe appartement, très propre et bien situé !",
                date_avis: new Date(),
            }
        ]);

        console.log("Collection Avis créée et remplie.");

        // Exemple de requête pour vérifier les relations
        const proprieteAvecAvis = await db.collection("Proprietes")
            .aggregate([
                {
                    $lookup: {
                        from: "Avis",
                        localField: "_id",
                        foreignField: "id_propriete",
                        as: "avis"
                    }
                }
            ]).toArray();

        console.log("Vérification des relations - Propriété avec ses avis :", proprieteAvecAvis);

    } catch (error) {
        console.error("Erreur lors de la création des collections :", error);
        throw error;
    } finally {
        if (client) {
            await client.close();
            console.log("Connexion à la base de données fermée");
        }
    }
}

// Exécution du script
seedDatabase()
    .catch(console.error)
    .finally(() => process.exit());
