import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import "@/app/globals.css";

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/location', { cache: 'no-store' });
  const LOCATION = await res.json();
  return (
    <>
      <Head>
        {/* Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <link src="../public/css/style.css" />
        {/* Bootstrap JavaScript */}
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
            <li className="nav-item">
              <a className="nav-link nav-items-font active" href="#">
                Logements
              </a>
            </li>
            <hr />
            <div className="mt-5 d-flex align-items-center justify-content-center">
              <li className="nav-item">
                <a
                  className="nav-link btn btn-primary btn-bg-color p-3 pt-2 pb-2 text-white btn-rounded btn-box-shadow nav-items-font nav-items-font d-flex align-items-center active"
                  href="#"
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
                  className="nav-link btn btn-primary btn-bg-color p-3 pt-2 pb-2 text-white btn-rounded btn-box-shadow nav-items-font d-flex align-items-center nav-items-font active"
                  type="button"
                  href="#"
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
                    Accueil
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav-items-font active" href="#">
                    Logements
                  </a>
                </li>
              </ul>
              <div className="d-flex align-items-center me-3">
                <a
                  className="nav-link nav-items-font btn btn-primary btn-bg-color p-3 pt-2 pb-2 text-white btn-rounded btn-box-shadow d-flex align-items-center justify-content-center"
                  href="#"
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
                  href="#"
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
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="d-flex justify-content-center align-items-center flex-wrap p-0">
            {LOCATION.map((location) => (
              <div key={location.id} className="card border-0 col-md-3 m-3">
                <div className="position-relative" style={{ width: '100%', height: '200px' }}>
                  <Image
                    src={location.image}
                    alt="..."
                    className="card-img-top"
                    fill // Dynamically fills the parent container
                    style={{ objectFit: "cover", borderRadius: "5px !important" }} // Ensures the image maintains its aspect ratio
                  />
                </div>
                <div className="card-body ps-0">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title"> {location.title} </h5>
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
                  <li className="card-text mb-0">{location.room} Chambres - {location.people} Personnes</li>
                  <div className="d-flex align-items-baseline mt-2">
                    <p className="card-text ">{location.type}</p>
                    <Image
                      src="/image/maison.png"
                      className="logo ms-1 "
                      alt="Logo"
                      width={15}
                      height={15}
                    />
                  </div>
                  <p className="card-text fw-bold">{location.price} € <span className="fw-normal">par nuit</span></p>
                  <a href="#" className="btn btn-primary border-0 btn-bg-color">Voir les détails</a>
                </div>
              </div>
            ))}




          </div>
        </div>
      </div>

      <footer>
        
      </footer>
    </>

  );
}
