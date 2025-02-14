"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import "@/app/globals.css";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [LOCATION, setLOCATION] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/location");
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}`);
        }
        const data = await res.json();
        setLOCATION(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur:", error);
        setLOCATION([]);
        setLoading(false);
      }
    };

    const storedData = localStorage.getItem("user");
    if (storedData) {
      setUserData(JSON.parse(storedData));
      console.log(storedData);
    }

    fetchLocationData();
  }, []);

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const resetFilter = () => {
    setFilter(null);
  };

  const filteredLocations = filter
    ? LOCATION.filter((location) => location.type === filter)
    : LOCATION;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserData(null);
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
                    href="add_location"
                  >
                    Ajouter un logement
                  </a>
                </li>
                <hr />
                <li className="nav-item">
                  <a
                    className="nav-link nav-items-font active"
                    href="reservations"
                  >
                    Réservations
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
                    href="/"
                  ></a>
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
                        <a className="dropdown-item" href="add_location">
                          Ajouter un logements
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/reservations">
                          Mes réservations
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={handleLogout}>
                          Déconnexion
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
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
                    <a
                      className="nav-link nav-items-font btn btn-primary btn-bg-color p-3 pt-2 pb-2 text-white btn-rounded  btn-box-shadow nav-items-font d-flex align-items-center ms-4 justify-content-center"
                      href="register"
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
        <div className="container-fluid">
          <div className="filter-container pb-0 d-flex justify-content-start justify-content-lg-center justify-content-md-center align-items-center">
            <div className="p-3 pr-0">
              <button
                onClick={resetFilter}
                className="d-flex b-right pe-4 bg-white text-black flex-column align-items-center filter-link"
              >
                <Image
                  src="/image/recharger.png"
                  className="logo"
                  alt="Réinitialiser"
                  width={27}
                  height={27}
                />
                <span className="text-center hover-filter-effect fs-filter mt-2">
                  Réinitialiser
                </span>
              </button>
            </div>
            <div className="p-3">
              <button
                onClick={() => handleFilterChange("Châteaux")}
                className="d-flex border-0 bg-white text-black flex-column align-items-center filter-link"
              >
                <Image
                  src="/image/chateaux.png"
                  className="logo"
                  alt="Logo"
                  width={27}
                  height={27}
                />
                <span className="text-center hover-filter-effect fs-filter mt-2">
                  Châteaux
                </span>
              </button>
            </div>
            <div className="p-3">
              <button
                onClick={() => handleFilterChange("Appartement")}
                className="d-flex border-0 bg-white text-black flex-column align-items-center filter-link"
              >
                <Image
                  src="/image/appartements.png"
                  className="logo"
                  alt="Logo"
                  width={27}
                  height={27}
                />
                <span className="text-center hover-filter-effect fs-filter mt-2">
                  Appartement
                </span>
              </button>
            </div>
            <div className="p-3">
              <button
                onClick={() => handleFilterChange("Tendance")}
                className="d-flex border-0 bg-white text-black flex-column align-items-center filter-link"
              >
                <Image
                  src="/image/feu.png"
                  className="logo"
                  alt="Logo"
                  width={27}
                  height={27}
                />
                <span className="text-center hover-filter-effect fs-filter mt-2">
                  Tendance
                </span>
              </button>
            </div>
            <div className="p-3">
              <button
                onClick={() => handleFilterChange("Campagne")}
                className="d-flex border-0 bg-white text-black flex-column align-items-center filter-link"
              >
                <Image
                  src="/image/campagne.png"
                  className="logo"
                  alt="Logo"
                  width={27}
                  height={27}
                />
                <span className="text-center hover-filter-effect fs-filter mt-2">
                  Campagne
                </span>
              </button>
            </div>
            <div className="p-3">
              <button
                onClick={() => handleFilterChange("Hébergement")}
                className="d-flex border-0 bg-white text-black flex-column align-items-center filter-link"
              >
                <Image
                  src="/image/the.png"
                  className="logo"
                  alt="Logo"
                  width={27}
                  height={27}
                />
                <span className="text-center hover-filter-effect fs-filter mt-2">
                  Hébergement
                </span>
              </button>
            </div>
            <div className="p-3">
              <button
                onClick={() => handleFilterChange("Bateaux")}
                className="d-flex border-0 bg-white text-black flex-column align-items-center filter-link"
              >
                <Image
                  src="/image/bateau.png"
                  className="logo"
                  alt="Logo"
                  width={27}
                  height={27}
                />
                <span className="text-center hover-filter-effect fs-filter mt-2">
                  Bateau
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid mb-5">
        <div className="row">
          <h2 className="fw-bold text-center mb-4"></h2>
          <div className="d-flex justify-content-center align-items-center flex-wrap p-0">
            {loading ? (
              <div>Chargement...</div>
            ) : filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <div key={location._id} className="card border-0 col-md-3 m-3">
                  <div
                    className="position-relative"
                    style={{ width: "100%", height: "200px" }}
                  >
                    <Image
                      src={location.image}
                      alt="..."
                      className="card-img-top"
                      fill
                      style={{
                        objectFit: "cover",
                        borderRadius: "5px !important",
                      }}
                    />
                  </div>
                  <div className="card-body ps-0">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{location.title}</h5>
                      <div className="d-flex align-items-center">
                        <Image
                          src="/image/stars.png"
                          className="logo me-1"
                          alt="Logo"
                          width={15}
                          height={15}
                        />
                        <p className="card-text">{location.rating}</p>
                      </div>
                    </div>
                    <li className="card-text mb-0">
                      {location.room} Chambres - {location.people} Personnes
                    </li>
                    <div className="d-flex align-items-baseline mt-2">
                      <p className="card-text">{location.type}</p>
                      <Image
                        src="/image/maison.png"
                        className="logo ms-1 "
                        alt="Logo"
                        width={15}
                        height={15}
                      />
                    </div>
                    <p className="card-text fw-bold">
                      {location.price} €{" "}
                      <span className="fw-normal">par nuit</span>
                    </p>
                    <button
                      onClick={() => router.push(`/location/${location._id}`)}
                      className="btn btn-primary border-0 btn-box-shadow btn-bg-color"
                    >
                      Voir les détails
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucune location disponible</p>
            )}
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
