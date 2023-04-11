import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const URI  = 'http://localhost:8000/forms/'

const CompEditBlog = () => {

    const [nombre] = useState('');
  const [apellidoP] = useState('');
  const [apellidoM] = useState('');
  const [genero] = useState('');
  const [telefono, setTelefono] = useState('');
  const [celular, setCelular] = useState('');
  const [escuela] = useState('');
  const [trabajo, setTrabajo] = useState('');
  const [pais] = useState('');
  const [estado] = useState('');
  const [ciudad] = useState('');
  const [correo, setCorreo] = useState('');
  const [curp] = useState('');
    const navigate = useNavigate();
    const {id} = useParams()


    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI+id,{telefono: telefono, celular: celular, 
            correo: correo, trabajo: trabajo})
        navigate('/Home')
    }

    useEffect( () => {
      getBlogById()
    }, [])

    const getBlogById = async () =>{
        const res = await axios.get(URI+id)
        setTelefono(res.data.telefono)
        setCelular(res.data.celular)
        setCorreo(res.data.correo)
        setTrabajo(res.data.trabajo)
    }

    return(
        <div className='container'>

<div class="input-container">
      <label className='label'>Nombre:</label>
      <input className='input' value={nombre}/>
     </div>

     <div class="input-container">
      <label className='label'>Apellido Paterno:</label>
      <input className='input' value={apellidoP} />
      </div>
      <div class="input-container">
      <label className='label'>Apellido Materno:</label>
      <input className='input' value={apellidoM}/>
      </div>

      <div class="input-container">
      <label className='label'>Genero:</label>
      <input  className='input' value={genero} />
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
      <input className='input' value={escuela}/>
      </div>

      <div class="input-container">
      <label className='label'>Trabajo:</label>
      <input className='input' value={trabajo} onChange={(e) => setTrabajo(e.target.value)} type= 'text'/>
      </div>

      <div class="input-container">
      <label className='label'>Pais:</label>
      <input className='input' value={pais}/>
      </div>

      <div class="input-container">
      <label className='label'>Estado:</label>
      <input className='input' value={estado}/>
      </div>

      <div class="input-container">
      <label className='label'>Ciudad:</label>
      <input className='input' value={ciudad}/>
      
      <label className='label'>Correo:</label>
      <input className='input' value={correo} onChange={(e) => setCorreo(e.target.value)} type= 'text'/>
      </div>
      
      <div class="input-container">
      <label className='label'>CURP:</label>
      <input className='input'value={curp}/>
      </div>
      <button className='button' onClick={update}>Guardar</button>
    </div>
    

    )

}

export default CompEditBlog