"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    room: "",
    people: "",
    type: "",
    price: "",
    description: "",
    equipements: [],
  });

  const equipementsOptions = [
    "Piscine",
    "Wi-Fi",
    "Sèche-cheveux",
    "Cuisine",
    "Climatisation",
    "Télévision",
    "Lave-linge",
    "Animaux acceptés",
    "Parking",
    "Eau chaude",
    "Produits ménagers",
    "Équipements de base",
    "Serviettes",
    "Draps",
    "Savon",
    "Papier toilette",
  ];

  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [equipementInput, setEquipementInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const forms = document.querySelectorAll(".needs-validation");
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.title || !formData.image || !formData.room || !formData.people || !formData.type || !formData.price || !formData.description) {
      setMessage("Veuillez remplir tous les champs.");
      setAlertType("danger");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          room: parseInt(formData.room),
          people: parseInt(formData.people),
          price: parseFloat(formData.price),
        }),
      });

      const result = await response.json();

      if (response.status === 201) {
        setMessage("Logement ajouté avec succès !");
        setAlertType("success");
        setTimeout(() => {
          router.push("/");
        }, 2500);
      } else {
        setMessage(result.error || "Erreur lors de l'ajout du logement.");
        setAlertType("danger");
      }
    } catch (error) {
      setMessage("Une erreur est survenue.");
      setAlertType("danger");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEquipementsChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      equipements: selectedOptions,
    }));
  };

  const removeEquipement = (equipement) => {
    setFormData((prevData) => ({
      ...prevData,
      equipements: prevData.equipements.filter((e) => e !== equipement),
    }));
  };

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="container-fluid register-register d-flex justify-content-center align-items-center pt-5">
        <div className="row d-flex m-2 justify-content-center align-items-center mb-5">
          <div className="col-md-7 btn-rounded p-5 bg-white">
            <h1 className="text-center fs-3">Ajouter un logement</h1>

            {message && (
              <div className={`alert alert-${alertType} p-2 m-0 mb-3 text-center`} role="alert">
                {message}
              </div>
            )}

            <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="col-md-12">
                <label className="form-label">Titre</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                <div className="invalid-feedback">Veuillez saisir un titre.</div>
              </div>

              <div className="col-md-12">
                <label className="form-label">Image (URL)</label>
                <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} required />
                <div className="invalid-feedback">Veuillez fournir une URL d'image.</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Nombre de chambres</label>
                <input type="number" className="form-control" name="room" value={formData.room} onChange={handleChange} required />
                <div className="invalid-feedback">Veuillez indiquer le nombre de chambres.</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Nombre de personnes</label>
                <input type="number" className="form-control" name="people" value={formData.people} onChange={handleChange} required />
                <div className="invalid-feedback">Veuillez indiquer la capacité d'accueil.</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Type de logement</label>
                <select className="form-select" name="type" value={formData.type} onChange={handleChange} required>
                  <option value="">Sélectionner...</option>
                  <option value="Appartement">Appartement</option>
                  <option value="Villa">Villa</option>
                  <option value="Hébergement">Hébergement</option>
                  <option value="Châteaux">Châteaux</option>
                  <option value="Bateaux">Bateaux</option>
                </select>
                <div className="invalid-feedback">Veuillez choisir un type de logement.</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Prix par nuit (€)</label>
                <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                <div className="invalid-feedback">Veuillez indiquer un prix valide.</div>
              </div>

              <div className="col-md-12">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleChange} required></textarea>
                <div className="invalid-feedback">Veuillez ajouter une description.</div>
              </div>

              <div className="col-md-12">
  <label className="form-label">Équipements</label>
  <select
    className="form-select"
    multiple
    name="equipements"
    value={formData.equipements}
    onChange={handleEquipementsChange}
    required
    size="8" // Ajuste cette taille pour permettre à l'utilisateur de voir plusieurs options d'un coup
  >
    {equipementsOptions.map((equipement, index) => (
      <option key={index} value={equipement}>
        {equipement}
      </option>
    ))}
  </select>

  <div className="mt-2">
    {formData.equipements.map((equipement, index) => (
      <span key={index} className="badge bg-secondary me-2">
        {equipement}{" "}
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={() => removeEquipement(equipement)}
        ></button>
      </span>
    ))}
  </div>
</div>

              <div className="col-12 mt-5 d-flex justify-content-center align-items-center">
                <button className="btn btn-primary border-0 btn-box-shadow btn-bg-color" type="submit" disabled={isLoading}>
                  {isLoading ? "Ajout en cours..." : "Ajouter le logement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
