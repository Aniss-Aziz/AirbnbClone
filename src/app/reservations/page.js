// pages/reservations.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import "@/app/globals.css";

export default function ReservationsPage() {
  const [userData, setUserData] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Récupérer l'ID de l'utilisateur connecté (peut être récupéré depuis un contexte, cookie, ou une session)
  const userId = "679e10dcf318c285f1097337"; // A remplacer dynamiquement, ici un ID statique d'exemple

  useEffect(() => {
    // Fonction pour récupérer les réservations depuis l'API
    const fetchReservations = async () => {
      try {
        const response = await fetch(`/api/reservation?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          setReservations(data);
        } else {
          console.error("Erreur:", data.error);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des réservations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();


    const storedData = localStorage.getItem("user");
    if (storedData) {
      setUserData(JSON.parse(storedData));
      console.log(storedData);
    }

  }, [userId]);

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
                  <a className="nav-link nav-items-font active" href="add_location">
                    Ajouter un logement
                  </a>
                </li>
                <hr />
                <li className="nav-item">
                  <a className="nav-link nav-items-font active" href="add_location">
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
                  >
                    
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
                        <a
                          className="dropdown-item"
                          onClick={handleLogout}
                          
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
        </header>


        <div className="container mt-4">
        <h2>Mes Réservations</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : reservations.length === 0 ? (
          <p>Aucune réservation trouvée.</p>
        ) : (
          <div className="row mt-5 ">
            {reservations.map((reservation) => (
              <div key={reservation._id} className="col-md-4 personalise-form reservation-box-shadow mb-4">
                <div className="card border-0 ">
                  <div className="card-body">
                    <h5 className="card-title mb-3">{reservation.location.title}</h5>
                    <img
                        src={reservation.location.image}
                        className="logo"
                        alt="Logo"
                        width="100%"
                        height="100%"
                      />
                    <p className="mt-3"><strong>Prix total :</strong> {reservation.totalPrice}€</p>
                    <p><strong>Personnes :</strong> {reservation.numOfGuests}</p>
                    
                    
                    {reservation.location ? (
                      <>
                        
                        <p><strong> Périodes : </strong>{reservation.startDate} au {reservation.endDate}</p>
                        <p><strong>Ville :</strong> {reservation.location.city}</p>
                        <p><strong>{reservation.location.price}€</strong>/ par nuit</p>
                      </>
                    ) : (
                      <p>Informations de logement non disponibles.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
