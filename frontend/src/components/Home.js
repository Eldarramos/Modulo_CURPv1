import React, { useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Añadir from "../img/Añadir.png";
import Entrar from "../img/Entrar.png";
import Navbar from "./navbar";

function Home() {
  const [correoColab, setCorreoColab] = useState("");
  const navigate = useNavigate();

  const handleVerClick = () => {
    //Guardar el correoColab en el localStorage
    localStorage.setItem("correoColab", correoColab);
    
    // Redireccionar a CompBlogs
    navigate("/CompBlogs");
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="container land pt-4 pb-4  d-flex" id="landing-p">
        <div className="row w-100">
          <div className="col-12 mt-2 mb-md-3 mb-sm-0">
            <h1 className="bienvenidoText">Bienvenido &nbsp;</h1>
          </div>

          <div className="col-12 mt-4 p-0">
            <div
              className="container-fluid mt-2 mb-4 p-5"
              id="contenedor-land"
            >
              <div className="row">
                <div className="col-12">
                  <h2 className="tituloLand">¿Qué deseas hacer?</h2>
                </div>
              </div>
              <div className="row pt-md-5 mt-md-4 pb-md-4 mb-md-3">
                <div className="col-md-12">
                  <div className="row no-padding">
                    <div className="col-12">
                      <h4 className="subTituloLand">Prospecto</h4>
                    </div>
                    <div className="col-12">
                      <div className="row no-padding pt-5 pl-0 pr-0">
                        <div className="col-md-6 ">
                          <Link to="/formulario" className="no-decoration">
                            <img src={Añadir} alt="Boton-Agregar"></img>
                            <p className="placeBtn">Agregar</p>
                          </Link>
                        </div>
                        <div className="col-md-6">
                          <Link
                            to="/CompBlogs"
                            className="no-decoration"
                            onClick={handleVerClick}
                          >
                            <img src={Entrar} alt="Boton-Agregar"></img>
                            <p className="placeBtn">Ver</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
