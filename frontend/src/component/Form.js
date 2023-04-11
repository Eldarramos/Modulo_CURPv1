import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Link, useNavigate} from 'react-router-dom'
import './Form.css';

const URI = 'http://localhost:8000/forms/'


const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [genero, setGenero] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [telefono, setTelefono] = useState('');
  const [celular, setCelular] = useState('');
  const [escuela, setEscuela] = useState('');
  const [trabajo, setTrabajo] = useState('');
  const [pais, setPais] = useState('');
  const [estado, setestado] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [correo, setCorreo] = useState('');
  const [curp, setCurp] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const navigate = useNavigate();

  /*const handleFechaChange = date => {
    setFecha(date);
  };*/

  const guardarDatos = async (e) =>{
    e.preventDefault()
    await axios.post(URI, {nombre: nombre, apellidoP: apellidoP, apellidoM: apellidoM, genero:genero,
         fecha: fecha, telefono:telefono, celular:celular,  escuela:escuela, trabajo:trabajo, 
        pais:pais, estado:estado, ciudad:ciudad , correo:correo,  curp:curp
     
       })
    navigate('/Home')
  }
 

  // Función para validar datos
const validarDatos = (nombre, apellidoP, apellidoM, genero, estado, fecha) => {
  // Función para procesar cadenas de texto
  const procesarCadena = (cadena) => {
    const porExcluir = ['DA', 'DAS', 'DE', 'DEL', 'DER', 'DI', 'DIE', 'DD', 'EL', 'LA', 'LOS', 'LAS', 'LE', 'LES', 'MAC', 'MC', 'VAN', 'VON', 'Y', 'MA', 'J'];
    const altis = ["BACA", "BAKA", "BUEI", "BUEY", "CACA", "CACO", "CAGA", "CAGO", "CAKA", "CAKO", "COGE", "COGI", "COJA", "COJE", "COJI", "COJO", "COLA", "CULO", "FALO", "FETO", "GETA", "GUEI", "GUEY", "JETA", "JOTO", "KACA", "KACO", "KAGA", "KAGO", "KAKA", "KAKO", "KOGE", "KOGI", "KOJA", "KOJE", "KOJI", "KOJO", "KOLA", "KULO", "LILO", "LOCA", "LOCO", "LOKA", "LOKO", "MAME", "MAMO", "MEAR", "MEAS", "MEON", "MIAR", "MION", "MOCO", "MOKO", "MULA", "MULO", "NACA", "NACO", "PEDA", "Pestado", "PENE", "PIPI", "PITO", "POPO", "PUTA", "PUTO", "QULO", "RATA", "ROBA", "ROBE", "ROBO", "RUIN", "SENO", "TETA", "VACA", "VAGA", "VAGO", "VAKA", "VUEI", "VUEY", "WUEI", "WUEY"];
    let cadenaProcesada = cadena.toUpperCase();
    cadenaProcesada = cadenaProcesada.replace(/Ñ/g, 'X');
    cadenaProcesada = cadenaProcesada.replace(/[^A-Z]/g, '');
    cadenaProcesada = altis.reduce((cadena, excluir) => cadena.replace(excluir, ''), cadenaProcesada);
    cadenaProcesada = porExcluir.reduce((cadena, excluir) => cadena.replace(excluir, ''), cadenaProcesada);
    return cadenaProcesada;
  };

  const seg_cons = (nombre) => {
  
    let caracteres = nombre.split("");
    caracteres.shift();
    let vocales = ["A","E","I","O","U"];
    caracteres = caracteres.filter(function(x){
      return vocales.indexOf(x) < 0;
    });
    if (caracteres.length > 0)
      return caracteres[0];
    else
      return "X"
  };

  const voc_int = (nombre) => {
    
    let caracteres = nombre.split("");
    caracteres.shift();
    let vocales = ["A","E","I","O","U"];
    caracteres = caracteres.filter(function(x){
      return vocales.indexOf(x) >= 0;
    });
    if (caracteres.length > 0)
      return caracteres[0];
    else
      return "X"
  }

  
  // Validar fecha de nacimiento
  const fechaDate = new Date(fecha);
  if (isNaN(fechaDate.getTime())) {
    return ;
  }

  const penultimo = (fechaDate) =>{
    let penult = fechaDate.charAt(fechaDate.length - 2);
    let sep_siglo = "";
  
    // Definimos los posibles valores para el penúltimo dígito según el siglo de la fecha
    let siglo19 = ["0","1","2","3","4","5","6","7","8","9"];
    let siglo20 = ["A","B","C","D","E","F","G","H","I","J"];
  
    // Verificamos si el primer dígito de la fecha es válido
    
  
    // Verificamos si el penúltimo dígito ya se conoce
    if (penult !== ""){
      // Si la fecha es del siglo XIX y el penúltimo dígito es un dígito, entonces es válido
      if (fechaDate.slice(0,1) === "1" && siglo19[fechaDate.charAt(0)].indexOf(penult) >= 0)
        sep_siglo = penult;
      // Si la fecha es del siglo XX y el penúltimo dígito es una letra, entonces es válido
      if (fechaDate.slice(0,1) === "2" && siglo20[fechaDate.charAt(0)].indexOf(penult) >= 0)
        sep_siglo = penult;
    }
  
    // Si el penúltimo dígito sigue sin definirse, se establece el valor por defecto según el siglo
    if (sep_siglo === ""){
      if (fechaDate.slice(0,1) ==="1")
        sep_siglo = "0";
      else
        sep_siglo = "A";
    }
    return sep_siglo;
  }
  
  
   // Función para obtener la homoclave
   const obtener_ultimo = (curpF) => {
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
      suma = suma + (18 - i) * list_cods.indexOf(curpF[i]);
    }
    let ult = Math.abs(suma % 10 - 10);
    if (ult === 10) ult = 0;
    return ult;
  };


  
  
  // Validar género
  if (genero !== 'H' && genero !== 'M') {
    return ;
  }
  
  // Validar estado
  const estados = ['AS', 'BC', 'BS', 'CC', 'CS', 'CH', 'CL', 'CM', 'DF', 'DG', 'GT', 'GR', 'HG', 'JC', 'MC', 'MN', 'MS', 'NT', 'NL', 'OC', 'PL', 'QT', 'QR', 'SP', 'SL', 'SR', 'TC', 'TS', 'TL', 'VZ', 'YN', 'ZS'];
  if (!estados.includes(estado.toUpperCase())) {
    return ;
  }

 const primerLetraapellidoM = procesarCadena(apellidoM).charAt(0);
  const primerasDosLetrasapellidoP = procesarCadena(apellidoP).slice(0, 2);
  //const primerasDosLetrasNombre = `${seg_cons(procesarCadena(nombre))}${voc_int(procesarCadena(nombre))}`;
  const primerasDosLetrasNombre = (nombre).slice(0,1);// tambien 2
  const fechaStr = `${fechaDate.getFullYear().toString().substr(-2)}${(fechaDate.getMonth() + 1).toString().padStart(2, '0')}${fechaDate.getDate().toString().padStart(2, '0')}`;
  const consonanteApellidoP = seg_cons(apellidoP);
  const consonanteApellidoM = seg_cons(apellidoM);
  const consonanteNombre = seg_cons(nombre);
  const vocalNombre = voc_int(procesarCadena(nombre))
  const penult = penultimo(`${primerasDosLetrasapellidoP}${primerLetraapellidoM}${primerasDosLetrasNombre}${fechaStr}${genero.toUpperCase()}${estado.toUpperCase()}${consonanteApellidoP}${consonanteApellidoM}${consonanteNombre}${vocalNombre}`);
  const homoclave = obtener_ultimo(`${primerasDosLetrasapellidoP}${primerLetraapellidoM}${primerasDosLetrasNombre}${fechaStr}${genero.toUpperCase()}${estado.toUpperCase()}${consonanteApellidoP}${consonanteApellidoM}${consonanteNombre}${vocalNombre}${penult}`);

  // Armar la CURP
  const curpF = `${primerasDosLetrasapellidoP}${primerLetraapellidoM}${primerasDosLetrasNombre}${fechaStr}${genero.toUpperCase()}${estado.toUpperCase()}${consonanteApellidoP}${consonanteApellidoM}${consonanteNombre}${penult}${homoclave}`;
  
  return curpF;
};


const validarCurp = (curp) => {
  if (curp.length !== 18) {
    setMensajeError('La CURP debe incluir 18 caracteres.');
    return false;
  } else if (!/^[A-ZÑ&]{4}\d{6}[HM]{1}[A-Z]{5}[A-Z\d]{2}$/.test(curp)) {
    setMensajeError('La CURP debe incluir letras mayúsculas y números en el formato correcto.');
    return false;
  } else {
    setMensajeError('');
    return true;
  }

};



 
  return (
    <div className='container'>

    <div class="input-container">
      <label className='label'>Nombre:</label>
      <input className='input' value={nombre} onChange={(e) => setNombre(e.target.value.toUpperCase())} type= 'text'/>
     </div>

     <div class="input-container">
      <label className='label'>Apellido Paterno:</label>
      <input className='input' value={apellidoP} onChange={(e) => setApellidoP(e.target.value.toUpperCase())} type= 'text'/>
      </div>
      <div class="input-container">
      <label className='label'>Apellido Materno:</label>
      <input className='input' value={apellidoM} onChange={(e) => setApellidoM(e.target.value.toUpperCase())} type= 'text'/>
      </div>

  

      <div className="input-container">
      <label className="label">Género:</label>
      <select className="select" value={genero} onChange={(e) => setGenero(e.target.value)}>
      <option value="">--Selecciona una opción--</option>
      <option value="M">Femenino</option>
      <option value="H">Masculino</option>
      </select>
      </div>


      <div class= "input-container">
      <label className='label'>Fecha de nacimiento:</label>
      <DatePicker 
       selected={fecha} 
       onChange={(date) => setFecha(date)} 
       showYearDropdown={true}
       dateFormat="dd/MM/yyyy"
      />
     </div>


      <div class="input-container">
      <label className='label'>Teléfono:</label>
      <input className='input' value={telefono} onChange={(e) => setTelefono(e.target.value)} type= 'number'/>
       </div>

      <div class="input-container">
      <label className='label'>Celular:</label>
      <input className='input' value={celular} onChange={(e) => setCelular(e.target.value)} type= 'number'/>
      </div>

      <div class="input-container">
      <label className='label'>Escuela:</label>
      <input className='input' value={escuela} onChange={(e) => setEscuela(e.target.value)} type= 'text'/>
      </div>

      <div class="input-container">
      <label className='label'>Trabajo:</label>
      <input className='input' value={trabajo} onChange={(e) => setTrabajo(e.target.value)} type= 'text'/>
      </div>

      <div class="input-container">
      <label className='label'>Pais:</label>
      <input className='input' value={pais} onChange={(e) => setPais(e.target.value)} type= 'text'/>
      </div>
      
      <div class="input-container">
      <label for="estado">Estado:</label>
     <select className='select' value={estado} onChange={(e) => setestado(e.target.value)} type= 'text'>
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

    
      <label className='label'>Ciudad:</label>
      <input className='input' value={ciudad} onChange={(e) => setCiudad(e.target.value)} type= 'text'/>
      </div>

     <div class="input-container">
      <label className='label'>Correo:</label>
      <input className='input' value={correo} onChange={(e) => setCorreo(e.target.value)} type= 'text'/>
     
      
    
      <label className='label'>CURP:</label>
      <input
        className='input'
        value={curp}
        onChange={(e) => {
          setCurp(e.target.value.toUpperCase());
          validarCurp(e.target.value.toUpperCase());
        }}/>
         <label className='label'>Verificacion:</label>
      <input
        className='input'
        value={curp}
        onChange={(e) => {
          setCurp(e.target.value.toUpperCase());
          validarCurp(e.target.value.toUpperCase());
        }}/>
      {mensajeError ? <p className='error'>{mensajeError}</p> : null} 
      </div>

      <div className='button-container'>
      <Link to ="/Home">
       <button className='button' onClick={guardarDatos}>Guardar</button>
      </Link>
      <button onClick={() => {
         const curpF = validarDatos(nombre, apellidoP, apellidoM, genero, estado, fecha);
            if (curpF) {
              setCurp(curpF);
                  validarCurp(curpF);
                         }
             }}>Validar datos</button>

      </div>

    </div>
    
  );
};

export default Formulario;
/*<label className='label'>estado:</label>
      <input className='input' value={estado} onChange={(e) => setestado(e.target.value)} type= 'text'/>*/