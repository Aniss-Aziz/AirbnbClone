"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Image from "next/image";

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
  const [alertType, setAlertType] = useState(""); 

  const handleChange = (event) => {
    const { id, value } = event.target; 
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, 
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage("Veuillez remplir tous les champs.");
      setAlertType("danger"); 
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
          router.push("/");
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
        <link src="../public/css/style.css" />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-3ln9Qnv8AL7+6ZsWssNO4YlNRo6MDIVUWaDmeFRppS0P/6N6fF+CDa6pZfN8UJ0Z"
          crossOrigin="anonymous"
          defer
        ></script>
        <script
          src="https://kit.fontawesome.com/2c9331011a.js"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <Image
            src="https://www.dropbox.com/scl/fi/lhmbodih2sd2j0j5gjkz4/Air-removebg-preview.png?rlkey=10sv5av2dgh3cauv08ca5fd3l&st=laf0w7b5&raw=1"
            className="logo"
            alt="Logo"
            width={150}
            height={50}
          />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item nav-items-font">
              <a
                className="nav-link nav-items-font active"
                aria-current="page"
                href="/"
              >
                Accueil
              </a>
            </li>
            <hr />

            <div className="mt-5 d-flex align-items-center justify-content-center">
              {/* L'utilisateur n'est pas connecté */}
              <li className="nav-item">
                <a
                  className="nav-link btn btn-primary btn-bg-color p-3 pt-2 pb-2 text-white btn-rounded btn-box-shadow nav-items-font d-flex align-items-center active"
                  href="/login"
                >
                  Connexion
                  <Image
                    src="/image/utilisateur.png"
                    className="logo invert-color ms-2"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>

      <header>
        <nav className="navbar nav-items-font nav-box-shadow navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand nav-items-font" href="/">
              <Image
                src="https://www.dropbox.com/scl/fi/lhmbodih2sd2j0j5gjkz4/Air-removebg-preview.png?rlkey=10sv5av2dgh3cauv08ca5fd3l&st=laf0w7b5&raw=1"
                className="logo"
                alt="Logo"
                width={150}
                height={50}
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon nav-items-font"></span>
            </button>
            <div
              className="collapse navbar-collapse nav-items-font"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item nav-items-font">
                  <a
                    className="nav-link nav-items-font active"
                    aria-current="page"
                    href="/"
                  ></a>
                </li>
              </ul>
              <div className="d-flex align-items-center me-3">
                <a
                  className="nav-link nav-items-font btn btn-primary btn-bg-color p-3 pt-2 pb-2 text-white btn-rounded btn-box-shadow d-flex align-items-center justify-content-center"
                  href="login"
                >
                  Connexion
                  <Image
                    src="/image/utilisateur.png"
                    className="logo invert-color ms-2"
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="container-fluid register-register d-flex justify-content-center align-items-center pt-5">
        <div className="row d-flex m-2 justify-content-center align-items-center mb-5">
          <div className="col-md-8 p-5 btn-rounded bg-white">
            <div className="row pt-3 pb-5">
              <h1 className="text-center fs-3">
                S'Inscrire avec l'adresse e-mail
              </h1>
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
                  id="firstName" 
                  
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
                <button
                  className="btn btn-primary border-0 btn-box-shadow btn-bg-color"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Inscription..." : "S'inscrire"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="f-border ">
        <div className="container-fluid  pb-5 d-flex justify-content-around align-items-center bg-lighter">
          <div className="row pt-2 pb-5 ms-lg-0 ms-5">
            <div className="col-md-4 pt-5 pb-5 d-flex flex-column align-items-left mt-a">
              <strong className="mb-1 fw-bold">Assistance</strong>
              <a>Centre d'aide</a>
              <a>Assistance sécurité</a>
              <a>AirCover</a>
              <a>Lutte contre la discrimination</a>
              <a>Assistance handicap</a>
              <a>Options d'annulation</a>
            </div>
            <div className="col-md-4 pt-5 pb-5 d-flex flex-column align-items-left mt-a">
              <strong className="mb-1 fw-bold">Accueil de voyageurs</strong>
              <a>Mettez votre logement sur Airbnb</a>
              <a>AirCover pour les hôtes</a>
              <a>Ressources pour les hôtes</a>
              <a>Forum de la communauté</a>
              <a>Hébérgement responsable</a>

              <a>Trouvez un co-hôte</a>
            </div>
            <div className="col-md-4 pt-5 pb-5 d-flex flex-column align-items-left mt-a">
              <strong className="mb-1 fw-bold">Airbnb</strong>
              <a>Newsroom</a>
              <a>Nouvelles fonctionnalités</a>
              <a>Carrières</a>
              <a>Investisseurs</a>
              <a>Assistance handicap</a>
              <a>Cartes cadeaux</a>
            </div>
            <div className="row p-0 f-border">
              <div className="col-md-12 d-md-flex flex-md-column p-0">
                <p className="pt-3 pb-3">© 2025 AirbnbClone, Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
