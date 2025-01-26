"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    country: "",
    role: "",
  });

  
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [alertType, setAlertType] = useState(""); // V

  const handleChange = (event) => {
    const { id, value } = event.target; // Récupérer l'id et la valeur de l'input
    setFormData((prevData) => ({
      ...prevData, // Conserver les autres champs
      [id]: value, // Mettre à jour le champ spécifique
    }));
  };



  useEffect(() => {
    // Gestion des validations Bootstrap
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage("Veuillez remplir tous les champs.");
      setAlertType("danger"); // Type d'alerte pour erreur
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Utilisateur enregistré avec succès !");
        setAlertType("success");
        setTimeout(() => {
          setMessage("");
          router.push('/')
        }, 2500); 
      } else {
        setMessage(data.message || "Erreur lors de l'inscription.");
        setAlertType("danger");
        setTimeout(() => {
          setMessage("");
        }, 2500); 
      }
    } catch (error) {
      setMessage("Erreur : Impossible de soumettre le formulaire.");
      setAlertType("danger");
      setTimeout(() => {
        setMessage("");
      }, 2500); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-3ln9Qnv8AL7+6ZsWssNO4YlNRo6MDIVUWaDmeFRppS0P/6N6fF+CDa6pZfN8UJ0Z"
          crossOrigin="anonymous"
          defer
        ></script>
        <script
          src="https://kit.fontawesome.com/2c9331011a.js"
          crossOrigin="anonymous"
          defer
        ></script>
      </Head>
      <div className="container-fluid register-register d-flex justify-content-center align-items-center pt-5">
        <div className="row d-flex m-2 justify-content-center align-items-center mb-5">
          <div className="col-md-8 p-5 btn-rounded bg-white">
            
            <div className="row pt-3 pb-5">
              <h1 className="text-center fs-3">S'Inscrire avec l'adresse e-mail</h1>
            </div>
            {message && (
              <div
                className={`alert alert-${alertType} p-2 m-0 mb-3 text-center`}
                role="alert"
              >
                {message}
              </div>
            )}
            <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
              <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">
                  Prénom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName" // Bootstrap validation
                       // React state management
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom02" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"   
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>

              <div className="col-md-4">
                <label htmlFor="validationCustomEmail" className="form-label">
                  Email
                </label>
                <div className="input-group has-validation">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"   
                    aria-describedby="inputGroupPrepend"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Veuillez choisir votre adresse email.
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <label
                  htmlFor="validationCustomPassword"
                  className="form-label"
                >
                  Mot de passe
                </label>
                <div className="input-group has-validation">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"   
                    value={formData.password}
                    onChange={handleChange}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <div className="invalid-feedback">
                    Veuillez choisir un mot de passe.
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <label htmlFor="validationCustomPhone" className="form-label">
                  Téléphone
                </label>
                <div className="input-group has-validation">
                  <input
                    type="password"
                    className="form-control"
                    id="phone"
                    name="phone"   
                    value={formData.phone}
                    onChange={handleChange}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <div className="invalid-feedback">
                    Veuillez choisir un numéro de téléphone.
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label">
                  Ville
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"   
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Saisissez votre ville.</div>
              </div>
              
              <div className="col-md-3">
                <label htmlFor="validationCustom05" className="form-label">
                  Pays
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Saisissez votre pays.</div>
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom04" className="form-label">
                  Rôle
                </label>
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Choisir...
                  </option>
                  <option value="Loueur">Loueur</option>
                  <option value="Propriétaire">Propriétaire</option>
                </select>
                <div className="invalid-feedback">
                  Veuillez sélectionnez votre rôle.
                </div>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="invalidCheck"
                    required
                  />
                  <label className="form-check-label" htmlFor="invalidCheck">
                    Agree to terms and conditions
                  </label>
                  <div className="invalid-feedback">
                    You must agree before submitting.
                  </div>
                </div>
              </div>
              <div className="col-12 mt-5 d-flex justify-content-center align-items-center">
                <button className="btn btn-primary border-0 btn-box-shadow btn-bg-color" type="submit" disabled={isLoading}>
                  {isLoading ? "Inscription..." : "S'inscrire"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
