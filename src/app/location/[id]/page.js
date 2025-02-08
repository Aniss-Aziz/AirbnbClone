"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
export default function LocationDetails({ params }) {
  const equipmentIcons = {
    "wi-fi": "/image/wifi.png",
    piscine: "/image/piscine.png",
    cuisine: "/image/ustensiles.png",
    "sèche-cheveux": "/image/seche-cheveux.png",
    télévision: "/image/video.png",
    climatisation: "/image/flocon-de-neige.png",
    parking: "/image/voiture-garee.png",
    "équipements de base": "/image/tiroir.png",
    serviettes: "/image/serviette-de-bain.png",
    "papier toilette": "/image/papier-toilette.png",
  };
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [location, setLocation] = useState(null);

  const handleReservation = (e) => {
    e.preventDefault();
    router.push(`/reservation/${location.id}`);
  };

  useEffect(() => {
    async function fetchParams() {
      const { id } = await params; // Déstructurer `params` avec `await`

      if (id) {
        fetch(`/api/details/${id}`) // Inclure l'ID dans l'URL
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => setLocation(data))
          .catch((error) =>
            console.error("Erreur lors de la récupération du logement:", error)
          );
      }
    }

    const storedData = localStorage.getItem("user");
    if (storedData) {
      setUserData(JSON.parse(storedData));
      console.log(storedData);
    }

    fetchParams();
  }, [params]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserData(null);
  };

  if (!location) {
    return <div>Chargement...</div>;
  }

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
            {userData ? (
              <>
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
                <li className="nav-item">
                  <a
                    className="nav-link nav-items-font active"
                    href="http://localhost:3000/add_location"
                  >
                    Ajouter un logement
                  </a>
                </li>
                <hr />
              </>
            ) : (
              <>
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
                <li className="nav-item">
                  <a className="nav-link nav-items-font active" href="#">
                    Logements
                  </a>
                </li>
                <hr />
              </>
            )}
            <div className="mt-5 d-flex align-items-center justify-content-center">
              {userData ? (
                <>
                  {/* L'utilisateur est connecté */}

                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-primary btn-bg-color p-3 pt-2 pb-2 text-white btn-rounded btn-box-shadow nav-items-font d-flex align-items-center active"
                      onClick={handleLogout}
                    >
                      Déconnexion
                      <Image
                        src="/image/utilisateur.png"
                        className="logo invert-color ms-2"
                        alt="Déconnexion"
                        width={20}
                        height={20}
                      />
                    </button>
                  </li>
                </>
              ) : (
                <>
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

                  <li className="nav-item ms-5">
                    <a
                      className="nav-link btn btn-primary btn-bg-color p-3 pt-2 pb-2 text-white btn-rounded btn-box-shadow nav-items-font d-flex align-items-center active"
                      href="/register"
                    >
                      Inscription
                      <Image
                        src="/image/examen.png"
                        className="logo invert-color ms-2"
                        alt="Logo"
                        width={20}
                        height={20}
                      />
                    </a>
                  </li>
                </>
              )}
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
                    href="http://localhost:3000/"
                  >
                    Accueil
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav-items-font active" href="http://localhost:3000/add_location">
                    Ajouter un logement
                  </a>
                </li>
              </ul>
              <div className="d-flex align-items-center me-3">
                {userData ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-primary btn-bg-color border-0 p-3 pt-2 pb-2 text-white btn-rounded btn-box-shadow dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userData.firstName}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Mes réservations
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="http://localhost:3000/add_location">
                          Ajouter un logement
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={handleLogout}
                          href="#"
                        >
                          Déconnexion
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <a
                      className="nav-link nav-items-font btn btn-primary btn-bg-color p-3 pt-2 pb-2 text-white btn-rounded btn-box-shadow d-flex align-items-center justify-content-center"
                      href="http://localhost:3000/login"
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
                    <a
                      className="nav-link nav-items-font btn btn-primary btn-bg-color p-3 pt-2 pb-2 text-white btn-rounded btn-box-shadow nav-items-font d-flex align-items-center ms-4 justify-content-center"
                      href="http://localhost:3000/register"
                    >
                      Inscription
                      <Image
                        src="/image/examen.png"
                        className="logo invert-color ms-2"
                        alt="Logo"
                        width={23}
                        height={23}
                      />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="d-lg-flex align-items-lg-start justify-content-lg-around">
            <div className="col-lg-7 col-md-12 d-flex flex-column align-items-start">
              <h1 className="fs-2 mb-3">{location.title}</h1>
              <img
                className="logo position-relative"
                src={location.image}
                alt={location.title}
                width="100%"
                height="100%"
              />
            </div>
            <div className="col-lg-4 col-md-12 mt-5 personalise-form reservation-box-shadow ms-lg-4 ms-0">
              <form
                action=""
                className="input-form position-relative d-flex flex-column align-items-center p-4 pb-0 w-100 h-100"
              >
                <p className="card-text text-start fs-5 fw-bold">
                  {location.price} € <span className="fw-normal fs-6">par nuit</span>
                </p>{" "}
                {/* <p className="nav-items-font fs-4">Indiquez vos dates</p> */}
                <div className="col-12">
                  <label htmlFor="start-date" className="form-label">
                    Départ
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="date"
                      className="form-control"
                      id="start-date"
                      name="start-date"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <label htmlFor="final-date" className="form-label">
                    Retour
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="date"
                      className="form-control"
                      id="final-date"
                      name="final-date"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <label htmlFor="final-date" className="form-label">
                    Voyageur
                  </label>
                  <div className="input-group has-validation">
                    <input
                      placeholder="1 voyageur"
                      type="number"
                      className="form-control"
                      id="final-date"
                      name="final-date"
                      max={location.people}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn col-12 mt-5 btn-primary border-0 btn-bg-color p-3 pt-2 pb-2 mb-5 text-white btn-rounded btn-box-shadow nav-items-font"
                  onClick={handleReservation}
                >
                  Réserver
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-7 pt-5">
            <p className="fs-4 nav-items-font fw-bold mb-0">
              {" "}
              Logement Entier : {location.type} - {location.city},{" "}
              {location.country}
            </p>
            <span className="nav-items-font">
              {location.people} voyageurs - {location.room} Chambres
            </span>

            <p className="mt-3 nav-items-font f-border pt-4">
              {location.description}
            </p>
            <div className="mt-4 f-border pt-4">
              <p className="mt-1 fs-5 fw-bold">Ce que propose ce logement</p>
              <div className="d-flex flex-wrap">
                {location.equipements.map((equipement, index) => {
                  const equipementKey = equipement.toLowerCase();
                  return (
                    <div
                      key={index}
                      className="d-flex align-items-center w-50 mb-3"
                    >
                      {equipmentIcons[equipementKey] ? (
                        <Image
                          src={equipmentIcons[equipementKey]}
                          alt={equipement}
                          width={30}
                          height={30}
                          className="me-2"
                        />
                      ) : (
                        <span className="me-2">🔹</span>
                      )}
                      <span>{equipement}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 f-border pt-4">
              <span className="fs-5 fw-bold">Où se situe le logement ?</span>
              <br />
              <span className="fs-6">
                {location.city}, {location.country}
              </span>
            </div>
            <div className="w-100 col-md-12 mt-4">
              <div className="w-100 col-md-12">
                <iframe
                  className="position-relative w-100"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    `${location.address}, ${location.city}, ${location.country}`
                  )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="f-border mt-5">
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
