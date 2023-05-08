import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate, useParams, Link} from 'react-router-dom'
import Navbar from "./navbar";

import Flecha from "../img/Flecha.png";



const URI  = 'http://localhost:8000/Inscripciones/'
const URI2 = 'http://localhost:8000/states/'

const CompEditBlog = () => {

  const [nombre, setNombre] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState(''); 
  const [pais, setPais] = useState('');
  const [idstate, setIdstate] = useState('');
  const [idcity, setIdcity] = useState('');
  const [idcolony, setIdColony] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [telefono, setTelefono] = useState('');
  const [celular, setCelular] = useState('');
  const [escuela, setEscuela] = useState('');
  const [trabajo, setTrabajo] = useState('');
  const [correo, setCorreo] = useState('');
  const [curp, setCurp] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [colonies, setColonies] = useState([]);
  const [codigospostales, setCodigospostales] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams()


    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI+id,{telefono: telefono, celular: celular, 
            correo: correo, trabajo: trabajo, idstate:idstate, idcity:idcity, idcolony:idcolony, calle:calle, 
            numero:numero,postal_code:postal_code})
        navigate('/Home')
    }

    useEffect(() => {
      axios.get(URI2)
        .then(response => {
          setStates(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    useEffect(() => {
   
      axios.get(`http://localhost:8000/cities/${idstate}`)
        .then(response => {
          console.log(response.data);
          setCities(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, [idstate]);
  
    useEffect(() => {
     
      axios.get(`http://localhost:8000/colonies/${idcity}`)
        .then(response => {
          setColonies(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, [idcity]);
  
    useEffect(() => {
     
      axios.get(`http://localhost:8000/colonies/${idcolony}/postal_code`)
        .then(response => {
          setCodigospostales(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, [idcolony]);

    const handleStateChange = e => {
      setIdstate(e.target.value);
      setIdcity('');
      setIdColony('');
    };
  
    const handleCityChange = e => {
      setIdcity(e.target.value);
      setIdColony('');
      
      
    };
  
    const handleColonyChange = e => {
      setIdColony(e.target.value);
      
    };
  
    const handleCodigoChange = e => {
      setPostal_code(e.target.value);
    };
  
    useEffect( () => {
      getBlogById()
    }, [])

    const getBlogById = async () =>{
        const res = await axios.get(URI+id)
        setTelefono(res.data.telefono)
        setCelular(res.data.celular)
        setCorreo(res.data.correo)
        setTrabajo(res.data.trabajo)
        setIdstate(res.data.states)
        setIdcity(res.data.cities)
        setIdColony(res.data.colonies)
        setPostal_code(res.data.postal_code)
        setCurp(res.data.curp)
        setNombre(res.data.nombre)
        setApellidoP(res.data.apellidoP)
        setApellidoM(res.data.apellidoM)
        setEscuela(res.data.escuela)


    }

    return(
      <div>
          <Navbar></Navbar> 
          <Link to="/CompBlogs">
        <img className="Regreso" alt="Flecha" src={Flecha}></img>
        <p className="textoRegreso">Inicio</p>
      </Link>
        <div className='container'>
       
      <div class="input-container">
      <label className='label'>Nombre:</label>
      <input className='input' value={nombre} readOnly/>
     </div>

     <div class="input-container">
      <label className='label'>Apellido Paterno:</label>
      <input className='input' value={apellidoP} readOnly/>
      </div>
      <div class="input-container">
      <label className='label'>Apellido Materno:</label>
      <input className='input' value={apellidoM} readOnly/>
      </div>

      <div class="input-container">
      <label className='label'>CURP:</label>
      <input className='input'value={curp} readOnly/>
      </div>



      <div class="input-container">
      <label className='label'>Teléfono:</label>
      <input className='input' value={telefono} onChange={(e) => setTelefono(e.target.value)} type= 'number'/>
       </div>

      <div class="input-container">
      <label className='label'>Celular:</label>
      <input className='input' value={celular} onChange={(e) => setCelular(e.target.value)} type= 'number'/>
      </div>

      <div className="input-container">
      <label className='label'>Pais:</label>
      <input className='input' value={pais} onChange={(e) => setPais(e.target.value)} type= 'text'/>
      </div>
     

      <div className="input-container">
      <label className='label'>Estado:</label>
        <select  value={idstate}  onChange={handleStateChange}>
          <option value="">Seleccione un estado</option>
          {states.map(state => (
            <option key={state.idstate} value={state.idstate}>{state.state}</option>
          ))}
        </select>
        </div>
     
         <div className="input-container">
        <label className='label'>Ciudad:</label>
        <select  value={idcity} onChange={handleCityChange}>
          <option value="">Seleccione una ciudad</option>
          {cities.length > 0 &&cities.map(city => (
            <option key={`${city.idcity}-${city.city}`} value={city.idcity}>{city.city}</option>
          ))}
        </select>
        </div>

         <div className="input-container">
          <label className='label'>Colonia:</label>
           <select  value={idcolony} onChange={handleColonyChange}>
          <option value="">Seleccione una colonia</option>
          {colonies.length > 0 &&colonies.map(colony => (
             <option key={`${colony.idcolony}-${colony.colony}`} value={colony.idcolony}>{colony.colony}</option>
              ))}
           </select>
          </div>

      <div className="input-container">
         <label className='label'>Calle:</label>
         <input className='input' value={calle} onChange={(e) => setCalle(e.target.value)} type= 'text'/>
      </div>

      <div className="input-container">
         <label className='label'>Numero:</label>
         <input className='input' value={numero} onChange={(e) => setNumero(e.target.value)} type= 'text'/>
      </div>

      <div className="input-container">
          <label className='label'>Codigo Postal:</label>
          <select value={postal_code} onChange={handleCodigoChange}>
              <option value="">Seleccione un Código Postal</option>
                   { codigospostales.map(cp => (
                <option key={cp.postal_code} value={cp.postal_code}>{cp.postal_code}</option>
                   ))}
          </select>

          </div>
  

      <div class="input-container">
      <label className='label'>Escuela:</label>
      <input className='input' value={escuela}/>
      </div>

      <div class="input-container">
      <label className='label'>Trabajo:</label>
      <input className='input' value={trabajo} onChange={(e) => setTrabajo(e.target.value)} type= 'text'/>
      </div>

  
      <div class="input-container">
      <label className='label'>Correo:</label>
      <input className='input' value={correo} onChange={(e) => setCorreo(e.target.value)} type= 'text'/>
      </div>
      
      
      <button className='button' onClick={update}>Guardar</button>
    </div>
    </div>
    

    )

}

export default CompEditBlog