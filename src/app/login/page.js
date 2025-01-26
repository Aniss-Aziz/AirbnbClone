"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [alertType, setAlertType] = useState("");

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
    if (!formData.email || !formData.password) {
      setMessage("Veuillez remplir tous les champs.");
      setAlertType("danger"); 
      return;
    }

    setIsLoading(true);
    setMessage(""); 

    try {

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 200) {
        if (result.user) {
          
          localStorage.setItem("user", JSON.stringify(result.user));
          setMessage("Connexion réussie !");
          setAlertType("success"); 
          setTimeout(() => {
            setMessage("");
            router.push('/'); 
          }, 2500);
        }
      } else {
        setMessage(result.message || "Erreur de connexion.");
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
      </Head>

      <div className="container-fluid register-register d-flex justify-content-center align-items-center pt-5">
        <div className="row d-flex m-2 justify-content-center align-items-center mb-5">
          <div className="col-md-7 p-5 btn-rounded bg-white">
            <div className="row pt-3 pb-3">
              <h1 className="text-center fs-3">Se connecter</h1>
            </div>

           
            {message && (
              <div
                className={`alert alert-${alertType} p-2 m-0 mb-3 text-center`}
                role="alert"
              >
                {message}
              </div>
            )}

            <form
              className="row g-3 needs-validation"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="col-md-12">
                <label htmlFor="validationCustomEmail" className="form-label">
                  Email
                </label>
                <div className="input-group has-validation">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Veuillez choisir votre adresse email.
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <label htmlFor="validationCustomPassword" className="form-label">
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
                    required
                  />
                  <div className="invalid-feedback">
                    Veuillez choisir un mot de passe.
                  </div>
                </div>
              </div>

              <div className="col-12 mt-5 d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-primary border-0 btn-box-shadow btn-bg-color"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion..." : "Se connecter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
