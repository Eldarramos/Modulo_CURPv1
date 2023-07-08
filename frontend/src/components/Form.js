import axios from "axios";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import "./Form.css";
import Navbar from "./navbar";
import { Stepper, Step, StepLabel, TextField, Button } from "@material-ui/core";
import { ArrowLeft } from "react-bootstrap-icons";

//29-Abril
import { makeStyles } from "@material-ui/core/styles";
import Flecha from "../img/Flecha.png";

//const URI = 'http://localhost:8000/forms/'
const URI = "http://localhost:8000/Inscripciones/";
const URI2 = "http://localhost:8000/states/";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [genero, setGenero] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [telefono, setTelefono] = useState("");
  const [celular, setCelular] = useState("");
  const [escuela, setEscuela] = useState("");
  const [trabajo, setTrabajo] = useState("");
  const [pais, setPais] = useState("");
  const [estado, setestado] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [correo, setCorreo] = useState("");
  const [curp, setCurp] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [idstate, setIdstate] = useState("");
  const [idcity, setIdcity] = useState("");

  const [colonies, setColonies] = useState([]);
  const [idcolony, setIdColony] = useState("");

  const [codigospostales, setCodigospostales] = useState([]);
  const [postal_code, setPostal_code] = useState("");

  const [activeStep, setActiveStep] = useState(0);

  const [correoValido, setCorreoValido] = useState(true);

  const [correoColab, setCorreoColab] = useState("");
  const [correoColabValido, setCorreoColabValido] = useState(false);

  // estilo stepper
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      color: "#E4897B",
    },
    button: {
      backgroundColor: "#E4897B",
      marginRight: theme.spacing(1),
    },
    backButton: {
      backgroundColor: "#FFFF",
      color: "#E4897B",
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    active: {
      color: "#E4897B",
      fontWeight: "bold",
    },
    completed: {
      color: "#E4897B",
      fontWeight: "bold",
    },
    steps: {
      backgroundColor: "#E4897B",
    },
    btnSig: {
      backgroundColor: "#EE5253",
      color: "#FFFF",
      marginTop: "20px",
      marginBottom: "20px",
      padding: "0 1rem",
      width: "10rem",
      height: "3rem",
      borderRadius: "38.5px",
    },
    btnCancelar: {
      background: "#FFFFFF",
      border: "3px solid #EE5253",
      borderRadius: "38.5px",
      color: "#EE5253",
      padding: "0 1rem",
      width: "10rem",
      height: "3rem",
    },
  }));
  const classes = useStyles();

  //Accion de stepper
  const nextStep = () => {
    if (activeStep < 4) setActiveStep((currentStep) => currentStep + 1);
  };

  const prewStep = () => {
    if (activeStep !== -1) setActiveStep((currentStep) => currentStep - 1);
  };

  const validarCorreo = (correo) => {
    // Expresión regular para validar el correo
    const correoRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (correoRegex.test(correo)) {
      // Si el correo es válido, actualizar el estado
      setCorreoValido(true);
    } else {
      // Si el correo no es válido, actualizar el estado y mostrar una alerta
      setCorreoValido(false);
    }
  };

  //ID_COlaborador 23-may  no funciona
  /*useEffect(() => {
    axios
      .get(`http://localhost:8000/Colaborador/`)
      .then((response) => {
        setCorre(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);*/

  useEffect(() => {
    axios
      .get(URI2)
      .then((response) => {
        setStates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/cities/${idstate}`) // cambie ruta
      .then((response) => {
        console.log(response.data);
        setCities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idstate]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/colonies/${idcity}`) // cambie ruta
      .then((response) => {
        setColonies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idcity]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/colonies/${idcolony}/postal_code`) // cambie ruta
      .then((response) => {
        setCodigospostales(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idcolony]);

  const handleStateChange = (event) => {
    setIdstate(event.target.value);
    setIdcity("");
    setIdColony("");
  };

  const handleCityChange = (event) => {
    setIdcity(event.target.value);
    setIdColony("");
  };

  const handleColonyChange = (event) => {
    setIdColony(event.target.value);
  };

  const handleCodigoChange = (event) => {
    setPostal_code(event.target.value);
  };
  //Funcion para guardar datos todos los input en db
  const guardarDatos = async (e) => {
    e.preventDefault();
    await axios.post(URI, {
      correoColab: correoColab,
      nombre: nombre,
      apellidoP: apellidoP,
      apellidoM: apellidoM,
      genero: genero,
      fecha: fecha,
      telefono: telefono,
      celular: celular,
      escuela: escuela,
      trabajo: trabajo,
      pais: pais,
      estado: estado,
      correo: correo,
      curp: curp,
      idstate: idstate,
      idcity: idcity,
      idcolony: idcolony,
      calle: calle,
      numero: numero,
      postal_code: postal_code,
    });
    navigate("/Home");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCurp(value);
    setIsValid(validarCurp(value));
  };

  //Toma el valor del correo del colaborador para que se agrege a DB
  const handleCorreoChange = (e) => {
    const nuevoCorreo = e.target.value;
    setCorreoColab(nuevoCorreo);
    validarCorreoColab(nuevoCorreo);
  };

  // Función para validar datos
  const validarDatos = (
    nombre,
    apellidoP,
    apellidoM,
    genero,
    estado,
    fecha
  ) => {
    // Función para procesar cadenas de texto
    const procesarCadena = (cadena) => {
      const porExcluir = [
        "DA",
        "DAS",
        "DE",
        "DEL",
        "DER",
        "DI",
        "DIE",
        "DD",
        "EL",
        "LA",
        "LOS",
        "LAS",
        "LE",
        "LES",
        "MAC",
        "MC",
        "VAN",
        "VON",
        "Y",
        "MA",
        "J",
      ];
      const altis = [
        "BACA",
        "BAKA",
        "BUEI",
        "BUEY",
        "CACA",
        "CACO",
        "CAGA",
        "CAGO",
        "CAKA",
        "CAKO",
        "COGE",
        "COGI",
        "COJA",
        "COJE",
        "COJI",
        "COJO",
        "COLA",
        "CULO",
        "FALO",
        "FETO",
        "GETA",
        "GUEI",
        "GUEY",
        "JETA",
        "JOTO",
        "KACA",
        "KACO",
        "KAGA",
        "KAGO",
        "KAKA",
        "KAKO",
        "KOGE",
        "KOGI",
        "KOJA",
        "KOJE",
        "KOJI",
        "KOJO",
        "KOLA",
        "KULO",
        "LILO",
        "LOCA",
        "LOCO",
        "LOKA",
        "LOKO",
        "MAME",
        "MAMO",
        "MEAR",
        "MEAS",
        "MEON",
        "MIAR",
        "MION",
        "MOCO",
        "MOKO",
        "MULA",
        "MULO",
        "NACA",
        "NACO",
        "PEDA",
        "Pestado",
        "PENE",
        "PIPI",
        "PITO",
        "POPO",
        "PUTA",
        "PUTO",
        "QULO",
        "RATA",
        "ROBA",
        "ROBE",
        "ROBO",
        "RUIN",
        "SENO",
        "TETA",
        "VACA",
        "VAGA",
        "VAGO",
        "VAKA",
        "VUEI",
        "VUEY",
        "WUEI",
        "WUEY",
      ];
      let cadenaProcesada = cadena.toUpperCase();
      cadenaProcesada = cadenaProcesada.replace(/Ñ/g, "X");
      cadenaProcesada = cadenaProcesada.replace(/[^A-Z]/g, "");
      cadenaProcesada = altis.reduce(
        (cadena, excluir) => cadena.replace(excluir, ""),
        cadenaProcesada
      );
      cadenaProcesada = porExcluir.reduce(
        (cadena, excluir) => cadena.replace(excluir, ""),
        cadenaProcesada
      );
      return cadenaProcesada;
    };

    const seg_cons = (nombre) => {
      let caracteres = nombre.split("");
      caracteres.shift();
      let vocales = ["A", "E", "I", "O", "U"];
      caracteres = caracteres.filter(function (x) {
        return vocales.indexOf(x) < 0;
      });
      if (caracteres.length > 0) return caracteres[0];
      else return "X";
    };

    const voc_int = (nombre) => {
      let caracteres = nombre.split("");
      caracteres.shift();
      let vocales = ["A", "E", "I", "O", "U"];
      caracteres = caracteres.filter(function (x) {
        return vocales.indexOf(x) >= 0;
      });
      if (caracteres.length > 0) return caracteres[0];
      else return "X";
    };

    // Validar fecha de nacimiento
    const fechaDate = new Date(fecha);
    if (isNaN(fechaDate.getTime())) {
      return;
    }
    const penultimo = (fecha) => {
      let penult = fecha.getFullYear().toString().slice(-2, -1);
      let sep_siglo = "";

      // Definimos los posibles valores para el penúltimo dígito según el siglo de la fecha
      let siglo19 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      let siglo20 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

      // Verificamos si el penúltimo dígito ya se conoce
      if (penult !== "") {
        // Si la fecha es del siglo XIX y el penúltimo dígito es un dígito, entonces es válido
        if (
          fecha.getFullYear().toString().slice(0, 2) === "19" &&
          siglo19.indexOf(penult) >= 0
        ) {
          sep_siglo = penult;
        }
        // Si la fecha es del siglo XX y el penúltimo dígito es una letra, entonces es válido
        if (
          fecha.getFullYear().toString().slice(0, 2) === "20" &&
          siglo20.indexOf(penult) >= 0
        ) {
          sep_siglo = penult;
        }
      }

      // Si el penúltimo dígito sigue sin definirse, se establece el valor por defecto según el siglo
      if (fecha.getFullYear().toString().slice(0, 2) === "20") {
        sep_siglo = "A";
      } else {
        sep_siglo = "0";
      }

      return sep_siglo;
    };

    // Función para obtener la homoclave
    const obtener_ultimo = (curp) => {
      const list_cods = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "Ñ",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      let suma = 0;
      for (var i = 0; i < 17; i++) {
        suma = suma + (18 - i) * list_cods.indexOf(curp[i]);
      }
      let ult = Math.abs((suma % 10) - 10);
      if (ult === 10) ult = 0;
      return ult;
    };

    const calcularPenultimoDigito = (fechaDate) => {
      const year = fechaDate.getFullYear().toString().substr(-2);
      const month = (fechaDate.getMonth() + 1).toString().padStart(2, "0");
      const day = fechaDate.getDate().toString().padStart(2, "0");
      return year + month + day;
    };

    // Validar género
    if (genero !== "H" && genero !== "M") {
      return;
    }

    // Validar estado
    const estados = [
      "AS",
      "BC",
      "BS",
      "CC",
      "CS",
      "CH",
      "CL",
      "CM",
      "DF",
      "DG",
      "GT",
      "GR",
      "HG",
      "JC",
      "MC",
      "MN",
      "MS",
      "NT",
      "NL",
      "OC",
      "PL",
      "QT",
      "QR",
      "SP",
      "SL",
      "SR",
      "TC",
      "TS",
      "TL",
      "VZ",
      "YN",
      "ZS",
    ];
    if (!estados.includes(estado.toUpperCase())) {
      return;
    }

    const primerLetraapellidoM = procesarCadena(apellidoM).charAt(0);
    const primerasDosLetrasapellidoP = procesarCadena(apellidoP).slice(0, 1);
    const primerasVocalapellidoP = voc_int(procesarCadena(apellidoP));
    //const primerasDosLetrasNombre = `${seg_cons(procesarCadena(nombre))}${voc_int(procesarCadena(nombre))}`;
    const primerasDosLetrasNombre = nombre.slice(0, 1); // tambien 2
    const fechaStr = `${fechaDate.getFullYear().toString().slice(-2)}${(
      fechaDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${fechaDate.getDate().toString().padStart(2, "0")}`;
    const consonanteApellidoP = seg_cons(apellidoP);
    const consonanteApellidoM = seg_cons(apellidoM);
    const consonanteNombre = seg_cons(nombre);
    //const vocalNombre = voc_int(procesarCadena(nombre))
    const penultim = penultimo(fecha);
    console.log("Penúltimo dígito: ", penultim);
    console.log("fecha: ", fecha.toString());
    console.log(typeof fecha);

    // Armar la CURP
    const curpI = `${primerasDosLetrasapellidoP}${primerasVocalapellidoP}${primerLetraapellidoM}${primerasDosLetrasNombre}${fechaStr}${genero.toUpperCase()}${estado.toUpperCase()}${consonanteApellidoP}${consonanteApellidoM}${consonanteNombre}${penultim}`;
    const homoclave = obtener_ultimo(curpI);
    console.log("curpI: ", curpI);
    const curpF = `${primerasDosLetrasapellidoP}${primerasVocalapellidoP}${primerLetraapellidoM}${primerasDosLetrasNombre}${fechaStr}${genero.toUpperCase()}${estado.toUpperCase()}${consonanteApellidoP}${consonanteApellidoM}${consonanteNombre}${penultim}${homoclave}`;

    return curpF;
  };

  const validarCurp = (curp) => {
    const curpF = validarDatos(
      nombre,
      apellidoP,
      apellidoM,
      genero,
      estado,
      fecha
    );
    if (curp.length !== 18) {
      setMensajeError("La CURP debe incluir 18 caracteres.");
      return false;
    } else if (!/^[A-ZÑ&]{4}\d{6}[HM]{1}[A-Z]{5}[A-Z\d]{2}$/.test(curp)) {
      setMensajeError(
        "La CURP debe incluir letras mayúsculas y números en el formato correcto."
      );
      return false;
    } else if (curp !== curpF) {
      setMensajeError("La CURP ingresada no es valida.");
      return false;
    } else {
      setMensajeError("");
      return true;
    }
  };

  const validarCurpEnDB = async (curp) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/Inscripciones?curp=${curp}`
      );
      const registro = response.data.find((reg) => reg.curp === curp);
      if (registro) {
        return true; // La CURP existe en la base de datos y es igual a la ingresada
      } else {
        return false; // La CURP no existe en la base de datos o no es igual a la ingresada
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  //Valida correo del colaborador para que se agrege a DB

  const validarCorreoColab = (correoColab) => {
    // Expresión regular para validar el formato del correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      correoColab.trim() === "" ||
      (regexCorreo.test(correoColab) && correoColab.endsWith("@uda.edu.mx"))
    ) {
      setCorreoColabValido(true);
    } else {
      setCorreoColabValido(false);
    }
  };

  //Renderizado
  return (
    <div>
      <Navbar></Navbar>
      <div className={classes.root}>
        <div>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Datos Colaborador:</StepLabel>
            </Step>
            <Step>
              <StepLabel>Validacion de Datos:</StepLabel>
            </Step>
            <Step>
              <StepLabel>Informacion general:</StepLabel>
            </Step>
            <Step>
              <StepLabel>Contacto:</StepLabel>
            </Step>
          </Stepper>
          {activeStep === 0 && (
            <div>
              {/* ...Regresa a Home */}
              <Link to="/home">
                <ArrowLeft className="ml-4 regreso" />
                <span
                  // style={{ marginBottom: "100px", top: "20.3%" }}
                  id="indicador"
                >
                  Menu Cambaceo
                </span>
              </Link>
              {/* ..stepper para correo del colaborador */}
              <div className="input-container center">
                <label className="label col-md-6 px-4 my-2">
                  Porfavor para continuar ingresa tu correo institucional:
                </label>
                <input
                  className="input col-md-6 px-4 my-2"
                  placeholder="ejemplo@uda.edu.mx"
                  value={correoColab}
                  onChange={(e) => {
                    handleCorreoChange(e);
                    validarCorreoColab(e.target.value);
                  }}
                />
                {/* ...Validacion de informacion de correo */}
                {correoColab !== "" && (
                  <span className={correoColabValido ? "valido" : "invalido"}>
                    {correoColabValido ? "Correo válido" : "Correo inválido"}
                  </span>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.btnSig}
                  onClick={nextStep}
                  disabled={!correoColabValido || correoColab.trim() === ""}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className="col-12">
              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Nombre:</label>
                <input
                  className=" col-md-6 px-4 my-2"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value.toUpperCase())}
                  type="text"
                />
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">
                  Apellido Paterno:
                </label>
                <input
                  className=" col-md-6 px-4 my-2"
                  value={apellidoP}
                  onChange={(e) => setApellidoP(e.target.value.toUpperCase())}
                  type="text"
                />
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">
                  Apellido Materno:
                </label>
                <input
                  className="input col-md-6 px-4 my-2"
                  value={apellidoM}
                  onChange={(e) => setApellidoM(e.target.value.toUpperCase())}
                  type="text"
                />
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Género:</label>
                <select
                  className="select col-md-6 px-2 my-1"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value="">--Selecciona una opción--</option>
                  <option value="M">Femenino</option>
                  <option value="H">Masculino</option>
                </select>
              </div>

              <div className=" col-md-12  d-flex">
                <div className="label col-md-6 col-sm-12 my-2 px-4 ">
                  <label style={{ width: "62%" }}>Fecha de nacimiento:</label>
                </div>
                <div className="col-md-6  my-2 px-4 ">
                  <DatePicker
                    selected={fecha}
                    onChange={(date) => setFecha(date)}
                    showYearDropdown={true}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              </div>

              <div className="input-container">
                <label className=" label col-md-6 px-4 my-2">
                  Estado de nacimiento:
                </label>
                <select
                  className="select col-md-6 px-2 my-1"
                  value={estado}
                  onChange={(e) => setestado(e.target.value)}
                  type="text"
                >
                  <option value="">--Selecciona una opción--</option>
                  <option value="AS">Aguascalientes</option>
                  <option value="BC">Baja California</option>
                  <option value="BS">Baja California Sur</option>
                  <option value="CC">Campeche</option>
                  <option value="CS">Chiapas</option>
                  <option value="CH">Chihuahua</option>
                  <option value="CL">Coahuila</option>
                  <option value="CM">Colima</option>
                  <option value="DF">Ciudad de México</option>
                  <option value="DG">Durango</option>
                  <option value="GT">Guanajuato</option>
                  <option value="GR">Guerrero</option>
                  <option value="HG">Hidalgo</option>
                  <option value="JC">Jalisco</option>
                  <option value="MC">Estado de México</option>
                  <option value="MN">Michoacán</option>
                  <option value="MS">Morelos</option>
                  <option value="NT">Nayarit</option>
                  <option value="NL">Nuevo León</option>
                  <option value="OC">Oaxaca</option>
                  <option value="PL">Puebla</option>
                  <option value="QT">Querétaro</option>
                  <option value="QR">Quintana Roo</option>
                  <option value="SP">San Luis Potosí</option>
                  <option value="SL">Sinaloa</option>
                  <option value="SR">Sonora</option>
                  <option value="TC">Tabasco</option>
                  <option value="TS">Tamaulipas</option>
                  <option value="TL">Tlaxcala</option>
                  <option value="VZ">Veracruz</option>
                  <option value="YN">Yucatán</option>
                  <option value="ZS">Zacatecas</option>
                </select>
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">CURP:</label>
                <input
                  className="input col-md-6 px-4 my-2"
                  value={curp}
                  onChange={handleInputChange}
                  style={{
                    border:
                      isValid === true ? "2px solid green" : "2px solid red",
                  }}
                />
                {mensajeError ? <p className="error">{mensajeError}</p> : null}
                {isValid === true && (
                  <p style={{ color: "green" }}>CURP válida</p>
                )}
                {isValid === false && (
                  <p style={{ color: "red" }}>CURP no válida</p>
                )}
              </div>

              <button
                onClick={async () => {
                  const curpF = validarDatos(
                    nombre,
                    apellidoP,
                    apellidoM,
                    genero,
                    estado,
                    fecha
                  );
                  if (curp === curpF) {
                    setCurp(curpF);
                    const existeCurp = await validarCurpEnDB(curp);
                    if (existeCurp) {
                      setMensajeError("La CURP ya existe en la base de datos");
                    } else {
                      // continuar con el proceso de registro
                      setMensajeError(
                        <span className="mensaje-verde">Registro Valido</span>
                      );
                    }
                  } else {
                    setIsValid(false);
                  }
                }}
              >
                Validar datos
              </button>

              <Button
                className={classes.btnSig}
                variant="outlined"
                color="primary"
                onClick={() => nextStep()}
              >
                Siguiente
              </Button>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Pais:</label>
                <select
                  className="select col-md-6 px-2 my-1"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  type="text"
                >
                  <option value="">--Selecciona una opción--</option>
                  <option value="Mexico">México</option>
                  <option value="Estados Unidos">Estados Unidos</option>
                </select>
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Estado:</label>
                <select
                  className="select col-md-6 px-1 my-1"
                  value={idstate}
                  onChange={handleStateChange}
                >
                  <option value="">Seleccione un estado</option>
                  {states.map((state) => (
                    <option key={state.idstate} value={state.idstate}>
                      {state.state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Ciudad:</label>
                <select
                  className="select col-md-6 px-4 my-2"
                  value={idcity}
                  onChange={handleCityChange}
                >
                  <option value="">Seleccione una ciudad</option>
                  {cities.length > 0 &&
                    cities.map((city) => (
                      <option
                        key={`${city.idcity}-${city.city}`}
                        value={city.idcity}
                      >
                        {city.city}
                      </option>
                    ))}
                </select>
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Colonia:</label>
                <select
                  className="select col-md-6 px-4 my-2"
                  value={idcolony}
                  onChange={handleColonyChange}
                >
                  <option value="">Seleccione una colonia</option>
                  {colonies.length > 0 &&
                    colonies.map((colony) => (
                      <option
                        key={`${colony.idcolony}-${colony.colony}`}
                        value={colony.idcolony}
                      >
                        {colony.colony}
                      </option>
                    ))}
                </select>
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Calle:</label>
                <input
                  className="input col-md-6 px-4 my-2"
                  value={calle}
                  onChange={(e) => setCalle(e.target.value)}
                  type="text"
                />
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Numero:</label>
                <input
                  className="input col-md-6 px-4 my-2"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  type="text"
                />
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">
                  Codigo Postal:
                </label>
                <select
                  className="select col-md-6 px-4 my-2"
                  value={postal_code}
                  onChange={handleCodigoChange}
                >
                  <option value="">Seleccione un Código Postal</option>
                  {codigospostales.map((cp) => (
                    <option key={cp.postal_code} value={cp.postal_code}>
                      {cp.postal_code}
                    </option>
                  ))}
                </select>
                <div className="input-container">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => nextStep()}
                    className={classes.btnSig}
                  >
                    Siguiente
                  </Button>
                  <br />
                  <br />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => prewStep()}
                    className={classes.btnCancelar}
                  >
                    Regresar
                  </Button>
                </div>
              </div>
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Teléfono:</label>
                <input
                  className="input col-md-6 px-4 my-2"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  type="text"
                />
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Celular:</label>
                <input
                  className="input col-md-6 px-4 my-2"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  type="text"
                />
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Escuela:</label>
                <input
                  className="input col-md-6 px-4 my-2"
                  value={escuela}
                  onChange={(e) => setEscuela(e.target.value)}
                  type="text"
                />
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Trabajo:</label>
                <input
                  className="input col-md-6 px-4 my-2"
                  value={trabajo}
                  onChange={(e) => setTrabajo(e.target.value)}
                  type="text"
                />
              </div>

              <div className="input-container">
                <label className="label col-md-6 px-4 my-2">Correo:</label>
                <input
                  className="input col-md-6 px-4 my-2"
                  value={correo}
                  onChange={(e) => {
                    setCorreo(e.target.value);
                    validarCorreo(e.target.value);
                  }}
                  type="text"
                />
                {!correoValido && (
                  <p
                    style={{ color: "red", fontSize: "14px", marginTop: "5px" }}
                  >
                    El correo no es válido
                  </p>
                )}
              </div>

              <div className="button-container">
                <Link to="/Home">
                  <button className="button" onClick={guardarDatos}>
                    Guardar
                  </button>
                </Link>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => prewStep()}
                >
                  Regresar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Formulario;
