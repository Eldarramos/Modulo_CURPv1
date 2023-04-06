import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const URI = "http://localhost:8000/forms/";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [genero, setGenero] = useState("");
  const [telefono, setTelefono] = useState("");
  const [celular, setCelular] = useState("");
  const [escuela, setEscuela] = useState("");
  const [trabajo, setTrabajo] = useState("");
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [correo, setCorreo] = useState("");
  const [curp, setCurp] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate();

  const guardarDatos = async (e) => {
    e.preventDefault();
    await axios.post(URI, {
      nombre: nombre,
      apellidoP: apellidoP,
      apellidoM: apellidoM,
      genero: genero,
      telefono: telefono,
      celular: celular,
      escuela: escuela,
      trabajo: trabajo,
      pais: pais,
      estado: estado,
      ciudad: ciudad,
      correo: correo,
      curp: curp,
    });
    navigate("/");
  };

  /*const guardarDatos = () => {
    if (nombre && telefono && correo && curp) {
      // Creamos un objeto con los datos del usuario
      const usuario = { nombre, telefono, correo, curp };
      // Guardamos los datos en Firebase
      //firebase.database().ref('usuarios/').push(usuario);
      // Reseteamos el formulario
      setNombre('');
      setTelefono('');
      setCorreo('');
      setCurp('');
      setMensajeError('');
    } else {
      setMensajeError('Por favor ingrese su nombre, teléfono, Correo y CURP.');
    }
  };*/

  const validarCurp = (curp) => {
    if (curp.length !== 18) {
      setMensajeError("La CURP debe incluir 18 caracteres.");
      return false;
    } else if (!/^[A-ZÑ&]{4}\d{6}[HM]{1}[A-Z]{5}[A-Z\d]{2}$/.test(curp)) {
      setMensajeError(
        "La CURP debe incluir letras mayúsculas y números en el formato correcto."
      );
      return false;
    } else {
      setMensajeError("");
      return true;
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <label className="label">Nombre:</label>
        <input
          className="input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          type="text"
        />
      </div>

      <div class="input-container">
        <label className="label">Apellido Paterno:</label>
        <input
          className="input"
          value={apellidoP}
          onChange={(e) => setApellidoP(e.target.value)}
          type="text"
        />
      </div>
      <div class="input-container">
        <label className="label">Apellido Materno:</label>
        <input
          className="input"
          value={apellidoM}
          onChange={(e) => setApellidoM(e.target.value)}
          type="text"
        />
      </div>

      <div class="input-container">
        <label className="label">Genero:</label>
        <input
          className="input"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          type="text"
        />
      </div>

      <div class="input-container">
        <label className="label">Teléfono:</label>
        <input
          className="input"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          type="number"
        />
      </div>

      <div class="input-container">
        <label className="label">Celular:</label>
        <input
          className="input"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          type="number"
        />
      </div>

      <div class="input-container">
        <label className="label">Escuela:</label>
        <input
          className="input"
          value={escuela}
          onChange={(e) => setEscuela(e.target.value)}
          type="text"
        />
      </div>

      <div class="input-container">
        <label className="label">Trabajo:</label>
        <input
          className="input"
          value={trabajo}
          onChange={(e) => setTrabajo(e.target.value)}
          type="text"
        />
      </div>

      <div class="input-container">
        <label className="label">Pais:</label>
        <input
          className="input"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          type="text"
        />
      </div>

      <div class="input-container">
        <label className="label">Estado:</label>
        <input
          className="input"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          type="text"
        />
      </div>

      <div class="input-container">
        <label className="label">Ciudad:</label>
        <input
          className="input"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          type="text"
        />

        <label className="label">Correo:</label>
        <input
          className="input"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          type="text"
        />
      </div>

      <div class="input-container">
        <label className="label">CURP:</label>
        <input
          className="input"
          value={curp}
          onChange={(e) => {
            setCurp(e.target.value.toUpperCase());
            validarCurp(e.target.value.toUpperCase());
          }}
        />
        {mensajeError ? <p className="error">{mensajeError}</p> : null}
      </div>
      <button className="button" onClick={guardarDatos}>
        Guardar
      </button>
    </div>
  );
};

export default Formulario;
